class SealingService {
    sealSecret(requestBody: any) {
        return fetchSealedSecret("/api/seal", requestBody)
    }

    reencryptSecret(requestBody: any) {
        return fetchSealedSecret("/api/reencrypt", requestBody)
    }

    getProjects() {
        return fetchProjects()
    }
}

async function fetchSealedSecret(url: string, requestBody: any) {
    const response = await fetch(url, {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        throw await response.text()
    }

    return response.json()
}

async function fetchProjects() {
    const response = await fetch("/api/projects")

    if (!response.ok) {
        throw await response.text()
    }

    return response.json()
}

export default new SealingService()
