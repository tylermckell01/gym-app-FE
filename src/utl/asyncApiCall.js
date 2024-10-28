export default async function asyncApiCall(
  api_endpoint,
  method = "GET",
  body = {},
  headers = null,
  authToken = null
) {
  const response = await fetch(api_endpoint, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });

  if (response) {
    const responseData = await response.json();
    return responseData;
  }
}
