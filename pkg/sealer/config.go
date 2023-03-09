package sealer

import (
	"flag"
	"gopkg.in/yaml.v3"
	"os"
)

type Configuration struct {
	Frontend struct {
		Directory string `yaml:"directory"`
	} `yaml:"frontend"`
	Server struct {
		Port     string `yaml:"port"`
		Projects []struct {
			Name                string `yaml:"name"`
			ControllerName      string `yaml:"controllerName"`
			ControllerNamespace string `yaml:"controllerNamespace"`
		} `yaml:"projects"`
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

	return nil
}
