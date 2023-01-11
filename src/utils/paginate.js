export function paginate(items, {pageNumber, pageSize} ) {
  const pageOrDefault = pageNumber || 1;
  const sizeOrDefault = pageSize || 10;
  const startIndex = (pageOrDefault - 1) * sizeOrDefault
  const itemsFiltered = [...items].slice(startIndex, startIndex + sizeOrDefault)
  return {
    total: items.length,
    pages: Math.ceil(items.length / sizeOrDefault),
    limit: sizeOrDefault,
    items: itemsFiltered 
  }
}