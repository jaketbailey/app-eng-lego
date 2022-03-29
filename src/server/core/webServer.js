// Imports the express.js api and sets the port to 8080 as specified in the coursework spec
import auth0 from './authentication.js';
import express from 'express';
import * as Logger from '../logger.js';
import bodyParser from 'body-parser';

const port = 8080;
export const app = express();

/*  Function initWebServer is ran from index.js when the program is initially loaded
this starts the webserver using express and  statically serves the directory for the
web application  */
export default function () {
  const jsonParser = bodyParser.json();
  app.use(express.static('../app/'));

  app.post('/block/api/error/', jsonParser, (req, res) => {
    const { message, stack } = req.body;
    Logger.Error(`Message: ${message}, Stack: ${stack}`);
    res.status(201).send(req.body);
  });

  auth0(app);

  app.listen(port, err => {
    if (err) {
      return err;
    } else {
      Logger.Express(`Server listening on port: ${port}`);
    }
  });
}
