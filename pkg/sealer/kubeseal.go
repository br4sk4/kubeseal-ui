package sealer

import (
	"bytes"
	"context"
	"github.com/bitnami-labs/sealed-secrets/pkg/apis/sealedsecrets/v1alpha1"
	"github.com/bitnami-labs/sealed-secrets/pkg/kubeseal"
	"k8s.io/client-go/kubernetes/scheme"
)

func Seal(cluster *Cluster, controllerNamespace, controllerName string, secret []byte) ([]byte, error) {
	var result bytes.Buffer

	certReader, err := kubeseal.OpenCert(context.TODO(), *cluster.Config, controllerNamespace, controllerName, "")
	if err != nil {
		return nil, err
	}
	defer func() { _ = certReader.Close() }()
	publicKey, err := kubeseal.ParseKey(certReader)
	if err != nil {
		return nil, err
	}

	err = kubeseal.Seal(
		*cluster.Config,
		"yaml",
		bytes.NewReader(secret),
		&result,
		scheme.Codecs,
		publicKey,
		v1alpha1.StrictScope,
		false,
		"",
		"",
	)

	if err != nil {
		return nil, err
	}

	return result.Bytes(), nil
}
