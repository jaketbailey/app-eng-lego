// Imports the express.js api and sets the port to 8080 as specified in the coursework spec
const express = require('express');
const port = 8080;
/*  Function initWebServer is ran from index.js when the program is initially loaded
this starts the webserver using express and  statically serves the directory for the
web application  */
function init() {
  const app = express();
  app.use(express.static('src/app/'));
  app.get('localhost/university', (req, res) => {
    res.redirect('/come-back-soon');
    console.log('test');
  });
  // Listens to port 80, and if an error occurs, logs it to console
  app.listen(port, err => {
    if (err) {
      return err;
    } else {
      console.log('Server running on port:', port);
    }
  });
}

module.exports = {
  init: init,
};
