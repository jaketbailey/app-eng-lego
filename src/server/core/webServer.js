/**
 * @file webServer.js
 * @author UP2002753
 * @description Express.js webserver to host the Block Shop store.
 */

// Imports the express.js api and sets the port to 8080 as specified in the coursework spec
const auth0 = require('./authentication.js');
const express = require('express');
const Logger = require('../logger.js');
const bodyParser = require('body-parser');

const port = 8080;
const app = express();

/*  Function Init is ran from index.js when the program is initially loaded
this starts the webserver using express and statically serves the directory for the
web application  */
function Init() {
  const jsonParser = bodyParser.json();
  app.use(express.static('../app/'));

  /** Post request used to log client-side errors on the server's console. */
  app.post('/block/api/error/', jsonParser, (req, res) => {
    /**
     * @type{Object}
     *  @property {string} message - The error message.
     *  @property {string} stack - The error stack.
     */
    const { message, stack } = req.body;
    Logger.Error(`Message: ${message}, Stack: ${stack}`);
    res.status(201).send(req.body);
  });

  /** Initialises Auth0 to use secure login and account management */
  auth0(app);

  /** Listens on port 8080, hosting the webpage at http://localhost:8080/ */
  app.listen(port, err => {
    if (err) {
      return err;
    } else {
      Logger.Express(`Server listening on port: ${port}`);
    }
  });
}


module.exports = {
  Init,
  App: app,
};
