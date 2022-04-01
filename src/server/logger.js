/**
 * @file logger.js
 * @author UP2002753
 * @description Basic console logger set up for the Block Shop store.
 */
const colors = require('colors');

/** Function getDate to return the current date and time on execution */
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

/**
 * @type {Object}
 * @description The colour theme object.
 * @property {string} Info - The colour theme for info messages.
 * @property {string} Warn - The colour theme for warning messages.
 * @property {string} Error - The colour theme for error messages.
 * @property {string} Database - The colour theme for database messages.
 * @property {string} Express - The colour theme for express messages.
 * @property {string} Request - The colour theme for express request messages.
 */
colors.setTheme({
  Info: 'green',
  Warn: 'yellow',
  Error: 'red',
  Database: 'cyan',
  Express: 'magenta',
  Request: 'blue',
});

/**
 * @function Info
 * @param  {...any} args - The arguments to be logged.
 */
const Info = (...args) => {
  console.log(`[${getDate()}] ${'[INFO]'.Info} ${args}`);
};

/**
 * @function Warn
 * @param  {...any} args - The arguments to be logged.
 */
const Warn = (...args) => {
  console.log(`[${getDate()}] ${'[WARN]'.Warn} ${args}`);
};

/**
 * @function Error
 * @param  {...any} args - The arguments to be logged.
 */
const Error = (...args) => {
  console.log(`[${getDate()}] ${'[ERROR]'.Error} ${args}`);
};

/**
 * @function Database
 * @param  {...any} args - The arguments to be logged.
 */
const Database = (...args) => {
  console.log(`[${getDate()}] ${'[DATABASE]'.Database} ${args}`);
};

/**
 * @function Express
 * @param  {...any} args - The arguments to be logged.
 */
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
