export function paginate(items, {pageNumber, pageSize} ) {
  const pageOrDefault = Number(pageNumber || 1);
  const sizeOrDefault = Number(pageSize || 10);
  
  if (pageSize === -1) return {total: items.length, pages: 1, limit: items.length, items}
  const startIndex = (pageOrDefault - 1) * sizeOrDefault
  const itemsFiltered = [...items].slice(startIndex, startIndex + sizeOrDefault)
  return {
    total: items.length,
    pages: Math.ceil(items.length / sizeOrDefault),
    limit: sizeOrDefault,
    items: itemsFiltered 
  }
}