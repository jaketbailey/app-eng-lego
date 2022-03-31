import errorCheck from './error.mjs';

export async function getData(input) {
  let actualInput = input.split('/');
  const page = actualInput[2];
  const finalOutput = [];
  let res;
  try {
    if (page === 'all') {
      actualInput = actualInput[2];
      res = await fetch(`/block/api/shop/${page}`);
      const data = await res.json();
      for (let i = 0; i < data.length; i++) {
        finalOutput.push(data[i]);
      }
    } else {
      actualInput = actualInput[3];
      actualInput = actualInput.split(',');
      for (let i = 0; i < actualInput.length; i++) {
        res = await fetch(`/block/api/shop/${page}/${actualInput[i]}`);
        const data = await res.json();
        for (let i = 0; i < data.length; i++) {
          finalOutput.push(data[i]);
        }
      }
    }
    return finalOutput;
  } catch (err) {
    errorCheck(err);
  }
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
  parent.appendChild(elem);
  return elem;
}
