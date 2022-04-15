/**
 * @file products.test.js
 * @author UP2002753
 * @description Contains all the tests for the user's database interactions. This includes adding to basketm new user, updating user, deleting etc.
 */

/* eslint-disable */ 

const getQueries = require('../server/db/getQueries.js');

describe('Tests for retrieving products from the db', () => {
  test('Getting all products', async () => {
    await getQueries.getAllProducts()
      .then(data => {
        expect(data.length).toBe(45);
      })
  });

  test('Get product by Id', async () => {
    const expected = [{
      category: "2x2brick",
      id: 1,
      image_ref: "2x2brick-1",
      price: "3.88",
      product_desc: "A 2x2 Lego brick offered in various colour choices.",
      product_name: "Brick 2x2",
      stock: 41,
    }];
    await getQueries.getProductById(1)
      .then(data => {
        console.log(data);
        expect(data).toEqual(expected);
      })
  });

  test('Get stock for specific product', async () => {
    await getQueries.getStock(1)
      .then(data => {
        const item = parseInt(data[0].stock, 10)
        expect(typeof item,).toBe('number');
        expect(item >= 0).toBe(true);
      })
  });
})
