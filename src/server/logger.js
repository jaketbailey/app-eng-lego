import colors from 'colors';

function getDate() {
  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const second = dateObj.getSeconds();
  const full = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  return full;
}

colors.setTheme({
  Info: 'green',
  Warn: 'yellow',
  Error: 'red',
  Database: 'cyan',
  Express: 'magenta',
  Request: 'blue',
});

export const Info = (...args) => {
  console.log(`[${getDate()}] ${'[INFO]'.Info} ${args}`);
};

export const Warn = (...args) => {
  console.log(`[${getDate()}] ${'[WARN]'.Warn} ${args}`);
};

export const Error = (...args) => {
  console.log(`[${getDate()}] ${'[ERROR]'.Error} ${args}`);
};

export const Database = (...args) => {
  console.log(`[${getDate()}] ${'[DATABASE]'.Database} ${args}`);
};

export const Express = (...args) => {
  if (args[1]) {
    console.log(`[${getDate()}] ${'[EXPRESS]'.Express} ${`[${args[1]}]`.Request} ${args[0]}`);
  } else {
    console.log(`[${getDate()}] ${'[EXPRESS]'.Express} ${args[0]}`);
  }
};
