export const getRoutes = (
  endpoint: string,
  params: { [key: string]: string | number } = {}
): string => {
  let path = endpoint
  Object.keys(params).forEach(key => {
    path = path.replace(`:${key}`, params[key]?.toString())
  })

  return path
}
