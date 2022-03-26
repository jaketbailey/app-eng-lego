export async function filter(filter) {
  const response = await fetch(`/block/api/type-filters/${filter.join('_')}/`);
  const result = await response.json();
  return result;
}

export async function search(search) {
  const response = await fetch(`/block/api/search-product/${search}`);
  const result = await response.json();
  return result;
}
