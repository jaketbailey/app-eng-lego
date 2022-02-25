# Lego e-commerce website - Application Engineering Project
## Configuration

Before running the application, you must configure the application.
To do so, you must:
- Have Postgres installed on your machine [Postgres Install](https://www.postgresql.org/download/)
- Run `npm run config` to generate the configuration.
- This will prompt you for postgres details.
- You must enter the following details:
  - Database User
  - Database Password
  - Database Host
  - Database Port

The database will then be generated ready for the application to run.

## Running the application

- To start the application simply run `npm start`.
- This will start up the webserver and will listen on port 8080
- The application will then run on http://localhost:8080.