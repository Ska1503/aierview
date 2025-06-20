export const mapToOptions = (items: any[]) =>
  items.map(item => ({ value: item.id, label: item?.name || item?.title }))
