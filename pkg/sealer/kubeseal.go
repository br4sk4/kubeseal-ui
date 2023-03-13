package sealer

import (
	"bytes"
	"context"
	"os"

	"github.com/bitnami-labs/sealed-secrets/pkg/apis/sealedsecrets/v1alpha1"
	"github.com/bitnami-labs/sealed-secrets/pkg/kubeseal"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/tools/clientcmd"
)

func Seal(controllerNamespace, controllerName string, secret []byte) ([]byte, error) {
	var result bytes.Buffer

	loadingRules := clientcmd.NewDefaultClientConfigLoadingRules()
	clientConfig := clientcmd.NewInteractiveDeferredLoadingClientConfig(loadingRules, nil, os.Stdout)

	certReader, err := kubeseal.OpenCert(context.TODO(), clientConfig, controllerNamespace, controllerName, "")
	if err != nil {
		return nil, err
	}
	defer func() { _ = certReader.Close() }()
	publicKey, err := kubeseal.ParseKey(certReader)
	if err != nil {
		return nil, err
	}

	err = kubeseal.Seal(
		clientConfig,
		"yaml",
		bytes.NewReader(secret),
		&result,
		scheme.Codecs,
		publicKey,
		v1alpha1.DefaultScope,
		false,
		"",
		"",
	)

	if err != nil {
		return nil, err
	}

	return result.Bytes(), nil
}
