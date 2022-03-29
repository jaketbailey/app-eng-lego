import errorCheck from './error.mjs';

export async function filter(filter) {
  try {
    const response = await fetch(`/block/api/type-filters/${filter.join('_')}/`);
    const result = await response.json();
    return result;
  } catch (err) {
    errorCheck(err);
  }
}

export async function search(search) {
  try {
    const response = await fetch(`/block/api/search-product/${search}`);
    const result = await response.json();
    return result;
  } catch (err) {
    errorCheck(err);
  }
}
