
# CRUD Rest API Documentation

## GET requests

GET requests are used to read/get data from the PostgreSQL database.

| Request | Path | Description |
| - | ---- | ---- |
| GET | `/shop/all` | Queries the database to select all products currently in stock in the store |
| GET | `/shop/item/:id` | Queries the database to select a specific product based on its unique id. This is used for generating a page for each individual product. |
| GET | `/get-user/:id` | Queries the database to select specific user information based on their unique user id. This can be used for the account page and checkout to get user name and address. |
| GET | `/get-previous-order` | Queries the database to select the id of the most recent order stored on the database, this allows for the id to be incremented to generate the next orderid. |
| GET | `/check-exists/:id` | Queries the database to select details of a user's basket/order. This is required to determine whether a new order needs to be generated e.g. if a user has completed an order in the past and needs a new order/basket. |
| GET | `/get-basket-items/:id` | Queries the database to select all products from the order_details table based on order id. This is used to display the user's current basket/cart and complete checkout. |
| GET | `/get-stock/:id` | Queries the database to select the numerical stock value of a particular product, used to update (add to or reduce) stock if and where necessary |
| GET | `/get-total-cost/:id` | Queries the database to select the total cost of a basket/cart stored in the databased based on id. Used for basket and checkout. |
| GET | `/get-user-name/:id` | Queries the database to select the user name, email and phone based on their unique id. |
| GET | `/get-basket/:id` | Queries the database to select the order id based on the customer id. |
| GET | `/type-filters/:filter` | Queries the database to select products in the store based on specific parameters chosen by the user when filtering through the products in the store. |
| GET | `/check-order-detail/:id` | Queries the database to select a product in order_details. This is used to check is the specific product is in the relevant basket and whether or not to update or insert into the database when adding to basket. |

## POST requests

POST requests are used to insert into/create new data into the PostgreSQL database.

| Request | Path | Description |
| - | ---- | ---- |
| POST | `/create-user/` | Whenever a new user is needed to be created, this request is made to insert the user details into the database. |
| POST | `/create-basket/` | Whenever a new user is created, this request is made to create a corresponding basket for that user. This also applies for when a user completes an order, a new basket is generated for the user. |
| POST | `/add-to-basket/` | This request is made when a user adds a new item to basket. If the item doesn't exist in the basket already, it is inserted into the basket with the corresponding order id. |

## PUT requests

PUT requests are used to update currently stored data in the PostgreSQL database.


| Request | Path | Description |
| - | ---- | ---- |
| PUT | `/update-user/` | This request queries the database to update user data if and when needed e.g. updating the user's address. |
| PUT | `/update-stock/` | This request queries the database to update the stock count of a specific product when it has been added to basket (reduces the stock count) |
| PUT | `/add-to-stock/` | This request queries the database to update the stock count of a specific product when it has been removed from basket (increases the stock count) |
| PUT | `/add-total-cost/` | Updates the total_cost number stored for an order in the database if items are added and removed from the database. |
| PUT | `/add-shipping-address/` | This request will update the order_address within the order table for a specific order. This is used when the user doesn't have a stored address/if they want to use an address other than that stored. |
| PUT | `/update-order/` | Updated the order status in the database when checkout has been completed, setting order status to complete. |
| PUT | `/update-basket-item/` | Updates the quantity and price of an item within the order/basket. This is used to live update the database as the different quantities are updated when adding/subtracting amounts from the order itself.  |

## DELETE requests

DELETE requests are used to remove data completely from the PostgreSQL database.


| Request | Path | Description |
| - | ---- | ---- |
| DELETE | `/remove-basket-item/` | This is used to delete an item completely from the order/basket. Used when the complete quantitity has been removed form basket. |
| DELETE | `/deleteUser/` | This is used to delete all user data from the database, including orders and user data. |
