export const getIdFromSlug = (slug: string) => {
  return slug.split('-').at(-1) as string
}
