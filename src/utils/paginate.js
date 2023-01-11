export function paginate(items, {pageNumber, pageSize} ) {
  const pageOrDefault = Number(pageNumber || 1);
  const sizeOrDefault = Number(pageSize || 10);

  // If limit eq -1, then return all items
  if (sizeOrDefault === -1) return {total: items.length, pages: 1, limit: sizeOrDefault, items}

  // Return paginated items
  const startIndex = (pageOrDefault - 1) * sizeOrDefault
  const itemsFiltered = [...items].slice(startIndex, startIndex + sizeOrDefault)
  return {
    total: items.length,
    pages: Math.ceil(items.length / sizeOrDefault),
    limit: sizeOrDefault,
    items: itemsFiltered 
  }
}