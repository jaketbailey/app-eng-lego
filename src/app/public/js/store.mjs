
export async function getData(input) {
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
  } else {
    actualInput = actualInput[3];
    actualInput = actualInput.split(',');
    for (let i = 0; i < actualInput.length; i++) {
      console.log(actualInput.length);
      console.log(`/shop/${page}/${actualInput[i]}`);
      console.log(page);
      console.log(actualInput[i]);
      res = await fetch(`/shop/${page}/${actualInput[i]}`);
      const data = await res.json();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        finalOutput.push(data[i]);
      }
    }
    console.log(finalOutput);
  }
  return finalOutput;
}

export function appendElem(parent, type, id, className, text, src, value) {
  const elem = document.createElement(type);
  if (id !== null) elem.id = id;
  if (className !== null) elem.classList.add(className);
  if (text !== null) elem.textContent = `${text}`;
  if (type === 'img') {
    elem.src = src;
    elem.alt = value;
  }
  if (type === 'a') elem.href = src;
  if (value !== null) elem.value = `${value}`;
  console.log(text);
  parent.appendChild(elem);
  return elem;
}
