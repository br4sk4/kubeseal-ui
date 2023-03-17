package sealer

import (
	"context"
	"flag"
	"gopkg.in/yaml.v3"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
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
		Projects                []Project `yaml:"projects"`
		DynamicProjectDiscovery struct {
			Enabled bool   `yaml:"enabled"`
			Period  string `yaml:"period"`
		} `yaml:"dynamicProjectDiscovery"`
	}
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

type Project struct {
	Name                string `yaml:"name"`
	ControllerName      string `yaml:"controllerName"`
	ControllerNamespace string `yaml:"controllerNamespace"`
}

func (c *Configuration) DiscoverProjects() {
	loadingRules := clientcmd.NewDefaultClientConfigLoadingRules()
	clientConfig := clientcmd.NewInteractiveDeferredLoadingClientConfig(loadingRules, nil, os.Stdout)

	restConfig, _ := clientConfig.ClientConfig()
	clientset, _ := kubernetes.NewForConfig(restConfig)

	namespaces, _ := clientset.CoreV1().Namespaces().List(context.TODO(), v1.ListOptions{
		LabelSelector: "kubeseal-ui=sealed-secrets",
	})

	projects := make([]Project, 0)

	for _, project := range staticProjects {
		projects = append(projects, project)
	}

	c.Server.Projects = projects

	for _, namespace := range namespaces.Items {
		if ifProjectNotLoaded(namespace.Annotations["kubeseal-ui/projectName"]) {
			config.Server.Projects = append(config.Server.Projects, Project{
				Name:                namespace.Annotations["kubeseal-ui/projectName"],
				ControllerName:      namespace.Annotations["kubeseal-ui/controllerName"],
				ControllerNamespace: namespace.Name,
			})
		}
	}
}

func ifProjectNotLoaded(projectName string) bool {
	for _, project := range config.Server.Projects {
		if project.Name == projectName {
			return false
		}
	}
	return true
}
