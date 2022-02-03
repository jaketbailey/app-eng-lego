import { addToBasket } from './basket.mjs';

const getData = async (input) => {
  let actualInput = input.split('/');
  console.log(actualInput);
  const page = actualInput[2];
  console.log(actualInput);
  const finalOutput = [];
  let res;
  if (page === 'all') {
    actualInput = actualInput[2];
    res = await fetch(`/shop/${page}`);
    const data = await res.json();
    for (let i = 0; i < data.length; i++) {
      finalOutput.push(data[i]);
    }
  } else if (page === 'add') {
    actualInput = actualInput[3];
    await addToBasket(actualInput);
  } else {
    actualInput = actualInput[3];
    actualInput = actualInput.split(',');
    for (let i = 0; i < actualInput.length; i++) {
      console.log(actualInput.length);
      console.log(`/shop/${page}/${actualInput[i]}`);
      res = await fetch(`/shop/${page}/${actualInput[i]}`);
      const data = await res.json();
      for (let i = 0; i < data.length; i++) {
        finalOutput.push(data[i]);
      }
    }
    console.log(finalOutput);
  }
  return finalOutput;
};

export default getData;
