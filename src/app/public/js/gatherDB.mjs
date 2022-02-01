const getData = async (input) => {
  let actualInput = input.split('/');
  console.log(actualInput);
  const page = actualInput[2];
  console.log(actualInput);
  const finalOutput = [];
  for (let i = 0; i < actualInput.length; i++) {
    let res
    if (page === 'all') {
      res = await fetch(`/shop/${page}`);
    } else {
      actualInput = actualInput[3];
      actualInput = actualInput.split(',');
      console.log(`/shop/${page}/${actualInput[i]}`);
      res = await fetch(`/shop/${page}/${actualInput[i]}`);
    }
    const data = await res.json();
    finalOutput.push(data);
  }
  console.log(finalOutput);
  return finalOutput;
};

export default getData;
