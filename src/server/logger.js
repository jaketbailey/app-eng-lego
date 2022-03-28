import colors from 'colors';

colors.setTheme({
  Info: 'green',
  Warn: 'yellow',
  Error: 'red',
  Database: 'cyan',
  Express: 'magenta',
});

export const Info = (...args) => {
  console.log(`${'[INFO]'.Info} ${args}`);
};

export const Warn = (...args) => {
  console.log(`${'[WARN]'.Warn} ${args}`);
};

export const Error = (...args) => {
  console.log(`${'[ERROR]'.Error} ${args}`);
};

export const Database = (...args) => {
  console.log(`${'[DATABASE]'.Database} ${args}`);
};

export const Express = (...args) => {
  console.log(`${'[EXPRESS]'.Express} ${args}`);
};
