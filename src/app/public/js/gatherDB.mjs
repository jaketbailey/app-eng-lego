
const getData = async (x) => {
  const response = await fetch(x);
  const data = await response.json();
  return data;
};

export default getData;
