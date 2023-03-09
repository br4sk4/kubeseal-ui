package sealer

import (
	"io"
	"os/exec"
)

func Seal(controllerNamespace, controllerName string, secret []byte) ([]byte, error) {
	cmd := exec.Command("kubeseal", "--controller-namespace", controllerNamespace, "--controller-name", controllerName, "-o", "yaml")
	stdin, err := cmd.StdinPipe()
	if err != nil {
		return nil, err
	}

	go func() {
		defer stdin.Close()
		io.WriteString(stdin, string(secret))
	}()

	return cmd.CombinedOutput()
}
