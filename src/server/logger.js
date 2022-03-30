const colors = require('colors');

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

const Info = (...args) => {
  console.log(`[${getDate()}] ${'[INFO]'.Info} ${args}`);
};

const Warn = (...args) => {
  console.log(`[${getDate()}] ${'[WARN]'.Warn} ${args}`);
};

const Error = (...args) => {
  console.log(`[${getDate()}] ${'[ERROR]'.Error} ${args}`);
};

const Database = (...args) => {
  console.log(`[${getDate()}] ${'[DATABASE]'.Database} ${args}`);
};

const Express = (...args) => {
  if (args[1]) {
    console.log(`[${getDate()}] ${'[EXPRESS]'.Express} ${`[${args[1]}]`.Request} ${args[0]}`);
  } else {
    console.log(`[${getDate()}] ${'[EXPRESS]'.Express} ${args[0]}`);
  }
};

module.exports = {
  Info,
  Warn,
  Error,
  Database,
  Express,
};
