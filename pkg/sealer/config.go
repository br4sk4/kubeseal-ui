package sealer

import (
	"context"
	"crypto/sha1"
	"flag"
	"fmt"
	"gopkg.in/yaml.v3"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"log"
	"os"
)

var (
	staticProjects = make([]Project, 0)
)

type Configuration struct {
	Frontend struct {
		Directory string `yaml:"directory"`
	} `yaml:"frontend"`
	Server struct {
		Port                    string    `yaml:"port"`
		ClusterName             string    `yaml:"clusterName"`
		Namespace               string    `yaml:"namespace"`
		Projects                []Project `yaml:"projects"`
		DynamicProjectDiscovery struct {
			Enabled bool   `yaml:"enabled"`
			Period  string `yaml:"period"`
		} `yaml:"dynamicProjectDiscovery"`
	} `yaml:"server"`
}

func (c *Configuration) Get() error {
	var configFile string
	flag.StringVar(&configFile, "config", "./.conf/config.dev.yaml", "path to config file")
	flag.Parse()

	configData, err := os.ReadFile(configFile)
	if err != nil {
		return err
	}

	if err := yaml.Unmarshal(configData, c); err != nil {
		return err
	}

	if len(c.Server.Projects) > 0 {
		for _, project := range c.Server.Projects {
			staticProjects = append(staticProjects, project)
		}
	}

	return nil
}

type Cluster struct {
	Name   string
	Client *kubernetes.Clientset
	Config *clientcmd.ClientConfig
}

type Project struct {
	ClusterName         string `yaml:"clusterName"`
	ProjectName         string `yaml:"projectName"`
	ControllerName      string `yaml:"controllerName"`
	ControllerNamespace string `yaml:"controllerNamespace"`
	Cluster             *Cluster
}

func (p Project) Hash() string {
	return fmt.Sprintf("%x", sha1.Sum([]byte(p.ClusterName+"."+p.ProjectName)))
}

func (c *Configuration) DiscoverClusters() []*Cluster {
	clusters := make([]*Cluster, 0)

	loadingRules := clientcmd.NewDefaultClientConfigLoadingRules()
	clientConfig := clientcmd.NewInteractiveDeferredLoadingClientConfig(loadingRules, nil, os.Stdout)

	restConfig, err := clientConfig.ClientConfig()
	clientset, err := kubernetes.NewForConfig(restConfig)

	clusters = append(clusters, &Cluster{
		Name:   c.Server.ClusterName,
		Client: clientset,
		Config: &clientConfig,
	})

	secrets, err := clientset.CoreV1().Secrets(config.Server.Namespace).List(context.TODO(), v1.ListOptions{
		LabelSelector: "kubeseal-ui/secret-type=cluster",
	})
	if err != nil {
		log.Fatalf("%s", err)
	}

	for _, secret := range secrets.Items {
		externalClientConfig, _ := clientcmd.NewClientConfigFromBytes(secret.Data["config"])
		externalRestConfig, _ := externalClientConfig.ClientConfig()
		externalClientset, _ := kubernetes.NewForConfig(externalRestConfig)

		clusters = append(clusters, &Cluster{
			Name:   secret.Labels["kubeseal-ui/cluster-name"],
			Client: externalClientset,
			Config: &externalClientConfig,
		})
	}

	return clusters
}

func (c Configuration) DiscoverProjects() {
	clusters := c.DiscoverClusters()
	for _, cluster := range clusters {
		c.discoverClusterProjects(cluster)
	}
}

func (c *Configuration) discoverClusterProjects(cluster *Cluster) {
	log.Default().Print("discovering projects ...")

	namespaces, err := cluster.Client.CoreV1().Namespaces().List(context.TODO(), v1.ListOptions{
		LabelSelector: "kubeseal-ui=sealed-secrets",
	})
	if err != nil {
		log.Fatalf("%s", err)
	}

	oldProjects := config.Server.Projects

	projects := make([]Project, 0)

	for _, project := range staticProjects {
		projects = append(projects, project)
	}

	config.Server.Projects = projects

	for _, namespace := range namespaces.Items {
		if !containsProject(&oldProjects, cluster.Name, namespace.Annotations["kubeseal-ui/projectName"]) {
			log.Default().Printf("discovered project: %s (%s)\n", namespace.Annotations["kubeseal-ui/projectName"], cluster.Name)
		}

		if !containsProject(&config.Server.Projects, cluster.Name, namespace.Annotations["kubeseal-ui/projectName"]) {
			config.Server.Projects = append(config.Server.Projects, Project{
				ClusterName:         cluster.Name,
				ProjectName:         namespace.Annotations["kubeseal-ui/projectName"],
				ControllerName:      namespace.Annotations["kubeseal-ui/controllerName"],
				ControllerNamespace: namespace.Annotations["kubeseal-ui/controllerNamespace"],
				Cluster:             cluster,
			})
		}
	}
}

func containsProject(projects *[]Project, clusterName, projectName string) bool {
	for _, project := range *projects {
		if clusterName == project.ClusterName && projectName == project.ProjectName {
			return true
		}
	}
	return false
}
