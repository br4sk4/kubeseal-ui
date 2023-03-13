class SealingService {
    sealSecret(requestBody) {
        return fetchSealedSecret("/api/seal", requestBody)
    }

    reencryptSecret(requestBody) {
        return fetchSealedSecret("/api/reencrypt", requestBody)
    }

    getProjects() {
        return fetchProjects()
    }
}

async function fetchSealedSecret(url, requestBody) {
    const response = await fetch(url, {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        const error = await response.text()
        throw error
    }

    return response.json()
}

async function fetchProjects() {
    const response = await fetch("/api/projects")

    if (!response.ok) {
        const error = await response.text()
        throw error
    }

    return response.json()
}

export default new SealingService()
