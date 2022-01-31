CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  product_desc VARCHAR(400) NOT NULL,
  image_ref VARCHAR(10) NOT NULL,
  category VARCHAR(250),
  stock INT NOT NULL
);

CREATE TABLE colours(
  id SERIAL PRIMARY KEY,
  colour_name VARCHAR(10) NOT NULL
);

CREATE TABLE product_colours(
  colour_id INT REFERENCES colours(id) NOT NULL,
  product_id INT REFERENCES products(id) NOT NULL
);

CREATE TABLE customers(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  address_line_1 varchar(50) NOT NULL,
  address_line_2 varchar(100),
  city VARCHAR(20) NOT NULL,
  county varchar(50),
  postcode varchar(7) NOT NULL,
  country varchar(50) NOT NULL
);

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  total_cost DECIMAL(12,2) NOT NULL,
  order_address VARCHAR(200) NOT NULL,
  order_email VARCHAR(100) NOT NULL,
  order_date DATE NOT NULL,
  order_status VARCHAR(10),
  customer_id INT REFERENCES customers(id) NOT NULL
);

CREATE TABLE order_details(
  id SERIAL PRIMARY KEY,
  price DECIMAL(12,2) NOT NULL,
  quantity INT NOT NULL,
  order_id INT REFERENCES orders(id) NOT NULL,
  product_id INT REFERENCES products(id) NOT NULL
);