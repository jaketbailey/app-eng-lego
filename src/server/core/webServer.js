// Imports the express.js api and sets the port to 8080 as specified in the coursework spec
import auth0 from './authentication.js';
import express from 'express';
import colors from 'colors';
const port = 8080;
export const app = express();
colors.setTheme({
  boot: 'cyan',
  error: ['red', 'bold'],
  warn: 'yellow',
  info: 'green',
});
/*  Function initWebServer is ran from index.js when the program is initially loaded
this starts the webserver using express and  statically serves the directory for the
web application  */
export default function () {
  app.use(express.static('../app/'));
  auth0(app);

  app.listen(port, err => {
    if (err) {
      return err;
    } else {
      console.log(`[BOOT] Server running on port: ${port}`.boot);
    }
  });
}
