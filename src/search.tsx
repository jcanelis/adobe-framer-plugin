import AdobeStock from "./adobestock"
import { Props } from "./props"

export default async function Search(query: Props): Promise<any> {
  try {
    // Clean up values for orientation
    let newOrientation = query.orientation.toLowerCase()
    let newAge = ""

    // Clean up values for age
    if (query.age == "All") {
      newAge = "all"
    } else if (query.age == "1 month") {
      newAge = "1m"
    } else if (query.age == "6 months") {
      newAge = "6m"
    } else if (query.age == "1 year") {
      newAge = "1y"
    } else if (query.age == "2 years") {
      newAge = "2y"
    }

    let params = {
      "search_parameters[words]": query.value ? query.value : "",
      "search_parameters[limit]": 80,
      "search_parameters[filters][content_type:all]": 0,
      "search_parameters[filters][content_type:photo]": query.illustrations
        ? 0
        : 1,
      "search_parameters[filters][content_type:illustration]":
        query.illustrations ? 1 : 0,
      "search_parameters[filters][has_releases]": query.people
        ? "true"
        : "false",
      "search_parameters[filters][orientation]": newOrientation
        ? newOrientation
        : "",
      "search_parameters[filters][age]": newAge ? newAge : "all",
      "search_parameters[filters][premium]": query.premium ? "true" : "false",
    }

    let finalQuery: string = ""

    for (var key in params) {
      finalQuery +=
        encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&"
    }

    const baseURL: string =
      "https://stock.adobe.io/Rest/Media/1/Search/Files?locale=en-US&"

    const configURL: string =
      "result_columns%5B%5D=thumbnail_240_url&result_columns%5B%5D=details_url&result_columns%5B%5D=id&result_columns%5B%5D=thumbnail_500_url"

    const theURL: string = baseURL + finalQuery + configURL
    const stockResults = await AdobeStock(theURL)
    const randomNumber: number = Math.floor(
      Math.random() * stockResults.files.length
    )
    const finalImageURL: string =
      stockResults.files[randomNumber].thumbnail_500_url

    return finalImageURL
  } catch (error) {
    console.log(error)
  }
}
