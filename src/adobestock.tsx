const AdobeStock = async (url: string): Promise<any> => {
  try {
    const response: Response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "X-Product": "{ Your Name }",
        "x-api-key": "{ Adobe Stock API Key }",
      },
    })
    const responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    console.log(error)
  }
}

export default AdobeStock
