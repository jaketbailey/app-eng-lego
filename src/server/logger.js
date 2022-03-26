import colors from 'colors';

colors.setTheme({
  Info: 'green',
  Warn: 'yellow',
  Error: 'red',
  Database: 'cyan',
  Express: 'magenta',
});

export const Info = (...args) => {
  console.log(`[INFO] ${args}`.Info);
};

export const Warn = (...args) => {
  console.log(`[WARN] ${args}`.Warn);
};

export const Error = (...args) => {
  console.log(`[ERROR] ${args}`.Error);
};

export const Database = (...args) => {
  console.log(`[DATABASE] ${args}`.Database);
};

export const Express = (...args) => {
  console.log(`[EXPRESS] ${args}`.Express);
};
