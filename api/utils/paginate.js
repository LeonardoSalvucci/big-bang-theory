export function paginate (items, { pageNumber, pageSize, exclude = [] }) {
  let filteredItems = [...items]
  exclude.forEach((key) => {
    filteredItems = filteredItems.map((item) => {
      delete item[key]
      return item
    })
  })
  const pageOrDefault = Number(pageNumber || 1)
  const sizeOrDefault = Number(pageSize || 10)

  // If limit eq -1, then return all items
  if (sizeOrDefault === -1) return { total: items.length, pages: 1, limit: sizeOrDefault, items }

  // Return paginated items
  const startIndex = (pageOrDefault - 1) * sizeOrDefault
  const itemsFiltered = filteredItems.slice(startIndex, startIndex + sizeOrDefault)
  return {
    total: items.length,
    pages: Math.ceil(items.length / sizeOrDefault),
    limit: sizeOrDefault,
    items: itemsFiltered
  }
}
