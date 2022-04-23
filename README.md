# Lego e-commerce website - Application Engineering Project
## Configuration

Before running the application, you must configure the application.
To do so, you must:
- Have Postgres installed on your machine [Postgres Install](https://www.postgresql.org/download/)
- You need to edit one file which is located in `/src/server/db/config/dbConfig.json`
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

  - All documentation is in the 'docs' folder.
  - Auto generated documentation is available in the `/docs/jsdoc` folder.
  - This can be deleted and then re-generated using `npm run docs`.
  - Run `npm run docs` to generate the documentation.
  - See the database documentation [database.md](docs/database.md)
  - See the testing documentation [testing.md](docs/testing.md)
  

## The Design

For the design of the application, I aimed to be as simple as possible. Having a more simplistic design makes the system easy to use for the end user.

The store is separated into 4 main pages with a few sub pages:
- The home page
- The store page
  - The product page
  - The filter/search page
- The basket page
  - The checkout page
- The account page

### Home page

The home page is a simple placeholder welcome page, with a link to the store page. It is simply used to greet the customer to the store and allow them to navigate to whatever page they want.

### Store page

The store page is the primary page of the application. This is where users can add items to their basket, search for products, filter products and enter product pages.

By default, the add to basket button on the main store page will only add 1 item to the basket. This is to make the storefront as simple as possible and therefore easier to use. If you want to add more than one item to the basket, you can click the add to basket button multiple times or visit the product page where you can add multiple items to the basket. Adding items to the basket will also give a visual feedback from adding as the button updates for a period of time saying 'Added x items to basket' and the stock number changes. I made the decision to not include a quantity selection on the storefront page after taking inspiration from the Lego Store (Home | Official LEGO® Shop GB, n.d.). 

The filter/search page acts similarly to the main storefront where on the storefront you can search or filter and then the relevant products will be displayed on the page based on the parameters.

### Basket page

The basket page is where users can view their basket and checkout. For unregistered users (and registered users without an address), will be required to enter their address before checkout, if they do not and try to continue, the website will alert the user to add an address. For registered users with an address, they can proceed to checkout without entering an address, however if they choose to have a different shipping address they can add an address too. The shipping address will not effect the stored user address.

### Account page

The account page is where users can view their account details, update their address and phone number. Passwords are managed by Auth0 (Auth0, n.d.) and therefore the user will need to login to their account relevant account separately (Google, Auth0 etc) to update their password.

## Implementation Rationale

In this coursework, I took my previous knowledge on the Node js (Node.js, n.d.) framework and PostgreSQL (PostgreSQL, 2022) and used it to build a simple e-commerce website. The webserver is built using the Express (Express - Node.Js Web Application Framework, n.d.) framework. This is a web server framework which allows the Node js application to run on a webserver. The webserver is running on port 8080 and is listening on http://localhost:8080. 

I used Auth0 (Auth0, n.d.) to manage the user authentication and authorization. This was done to make the application secure and to allow the user to login to their account. The user will be able to login to their account using their Google account, Discord account, Github account or their Auth0 account. Using Auth0 proved to be the best way to manage the user authentication and authorization due to the high security as my application doesn't handle password storage itself and it also allows users to log in with accounts they already have without sign up.

Adding items to basket will update the stock live. My thoughts using this implementation was to implement a system which auto removes items from the users basket after a certain period of time and therefore add back to stock. It would essentially act as a reserve period for items added to basket until they are then removed. The user can currently manually remove x items from their basket and the system will remove the items from the basket and add the items back to the stock. 

All orders, vital user details, products and basket items are stored in the database. I have chosen PostgreSQL (PostgreSQL, 2022) as the database as it is a very popular database and used at an industry level. To link the Node js (Node.js, n.d.) application to the database, I used the Node Postgres Package (node-postgres., n.d.) which allows the Node js application to connect to the database. This package is used to connect to the database and perform CRUD operations on the database. These CRUD REST operations can be seen in the [api.md](docs/api.md) file.

All products (images and names) were sourced from the Brickset Database (Brickset Home Page, n.d.) and the Lego Shop (Home | Official LEGO® Shop GB, n.d.). The Brickset Database is a database of lego sets and the Lego Shop is a website where users can buy lego sets.

The whole store will adjust to the screen size of the device and therefore the application will be responsive. This is done using simple SCSS (Sass: Syntactically Awesome Style Sheets, n.d.) Media Queries. The Media Queries are used to adjust the layout of the application to the screen size of the device. Making the application responsive to the screen size of the device is important for usability as this will allow the application to be used on any device including mobile devices e.g. phones and tablets.


## Known Issues

If ticked, fixed.

- [x] User deletion not functioning correctly

- [ ] Filter does work but... You cannot select 2 types e.g. 2x2 and 2x1. As the operation that is run is an AND operation rather than OR. OR is used to select products that are colour OR colour. You can also select Color AND Type. Not all combinations currently work.

- [ ] Search does check for the similar match of the search term. For example, if you search '2 x 2' it will not return blocks with '2x2' type because of spaces etc. 

## Features to be implemented

If ticked, done.

- [ ] Timer for removing items from basket

- [ ] Store owner view

- [ ] Syncing unregistered basket over to registered upon login

- [ ] View order history

- [ ] View previous order details

# Bibliography

- Auth0: Secure access for everyone. But not just anyone. (n.d.). Auth0. Retrieved 23 April 2022, from https://auth0.com/

- Brickset home page. (n.d.). Brickset.Com. Retrieved 23 April 2022, from https://brickset.com/Default.aspx

- Example of Authentication with Auth0. (2021). [JavaScript]. University of Portsmouth, School of Computing. https://github.com/portsoc/auth0-example/blob/95dd25f867e4f35d9cd93728353b35b5b0997b39/stages/6/ (Original work published 2021)

- Express—Node.js web application framework. (n.d.). Retrieved April 12, 2022, from https://expressjs.com/

- Home | Official LEGO® Shop GB. (n.d.). Retrieved 23 April 2022, from https://www.lego.com/en-gb

- Jest · 🃏 Delightful JavaScript Testing. (n.d.). Retrieved April 12, 2022, from https://jestjs.io/

- Node.js. (n.d.). Node.js. Node.Js. Retrieved 23 April 2022, from https://nodejs.org/en/

- node-postgres. (n.d.). Retrieved April 12, 2022, from https://node-postgres.com/

- PostgreSQL, P. G. D. (2022, April 23). PostgreSQL. PostgreSQL. https://www.postgresql.org/

- Run Jest—GitHub Marketplace. (n.d.). GitHub. Retrieved 31 March 2022, from https://github.com/marketplace/actions/run-jest

- Sass: Syntactically Awesome Style Sheets. (n.d.). Retrieved 23 April 2022, from https://sass-lang.com/

- Use JSDoc: Index. (n.d.). Retrieved 9 April 2022, from https://jsdoc.app/
