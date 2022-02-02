const handleResponse = (statusMessage, code, data) => {
  const response = {
    status: statusMessage,
    statusCode: code,
    results: data
  }
  return response
}
export { handleResponse }