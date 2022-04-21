# Lego e-commerce website - Application Engineering Project
## Configuration

Before running the application, you must configure the application.
To do so, you must:
- Have Postgres installed on your machine [Postgres Install](https://www.postgresql.org/download/)
- You need to edit one file which is located in `/src/server/db/dbConfig.json`
- You need to provide the following:
  - PostgreSQL user name
  - PostgreSQL user password
  - PostgreSQL host address e.g. localhost
  - PostgreSQL port

Proceed to run `npm run setup` to configure the application.

The database will then be generated ready for the application to run.

## Running the application

- To start the application simply run `npm start`.
- This will start up the express webserver (Express - Node.Js Web Application Framework, n.d.) and will listen on port 8080
- The application will then run on http://localhost:8080.

## Testing the application

  - To test the application, run `npm test`.
  - This will run the tests using Jest (Jest · 🃏 Delightful JavaScript Testing, n.d.) and will report the results.
  - The tests will run using jest with default configuration.

## Documentation

  - Run `npm run docs` to generate the documentation.
  - This will generate the documentation in the `jsdoc` folder.
  - Other documentation (non jsdoc) will be in the `docs` folder.
  - See the database documentation [database.md](docs/database.md)
  - See the testing documentation [testing.md](docs/testing.md)
  
## References

- See citations throughout the code.
- See the [bibliography.md](bibliography.md) for more information.