
export default async function filter(filter) {
  const response = await fetch(`/type-filters/${filter.join('_')}/`);
  const result = await response.json();
  return result;
}

export async function sizeFilters() {

}
