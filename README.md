# Lego e-commerce website - Application Engineering Project
## Configuration

Before running the application, you must configure the application.
To do so, you must:
- Have Postgres installed on your machine [Postgres Install](https://www.postgresql.org/download/)
- You need to edit one file which is located in `/src/server/db/dbConfig.js`
- You need to provide the following:
  - PostgreSQL user name
  - PostgreSQL user password
  - PostgreSQL host address e.g. localhost
  - PostgreSQL port

Proceed to run `npm run setup` to configure the application.

The database will then be generated ready for the application to run.

## Running the application

- To start the application simply run `npm start`.
- This will start up the webserver and will listen on port 8080
- The application will then run on http://localhost:8080.