// Imports the express.js api and sets the port to 8080 as specified in the coursework spec
const express = require('express');
const port = 8080;
const auth = require('./authentication');
const colors = require('colors');
const app = express();
colors.setTheme({
  boot: 'cyan',
  error: ['red', 'bold'],
  warn: 'yellow',
  info: 'green',
});
/*  Function initWebServer is ran from index.js when the program is initially loaded
this starts the webserver using express and  statically serves the directory for the
web application  */
function init() {
  app.use(express.static('../app/'));
  auth.auth0(app);
  app.listen(port, err => {
    if (err) {
      return err;
    } else {
      console.log(`[BOOT] Server running on port: ${port}`.boot);
    }
  });
}

module.exports = {
  init: init,
  app: app,
};
