/**
 * @file products.test.js
 * @author UP2002753
 * @description Contains all the tests for the product database interactions
 */

/* eslint-disable */ 

const getQueries = require('../server/db/getQueries.js');
const updateQueries = require('../server/db/updateQueries.js');

describe('Tests for retrieving products from the db', () => {
  test('Getting all products', async () => {
    await getQueries.getAllProducts()
      .then(data => {
        expect(data.length).toBe(45);
      })
  });

  test('Get product by Id', async () => {
    let stock;
    await getQueries.getStock(1)
    .then(data => {
      stock = parseInt(data[0].stock, 10);
    })
    const expected = [{
      category: "2x2brick",
      id: 1,
      image_ref: "2x2brick-1",
      price: "3.88",
      product_desc: "A 2x2 Lego brick offered in various colour choices.",
      product_name: "Brick 2x2",
      stock,
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

  test('Get product by search', async () => {
    const expected = [{
      category: "set",
      colour_id: 8,
      colour_name: "n/a(set)",
      id: 37,
      image_ref: "spiderman",
      price: "42.48",
      product_desc: "A Lego Spiderman/Doctor Octopus Marvel Set",
      product_id: 37,
      product_name: "Lego Spiderman Set",
      stock: 30,
    }]
    await getQueries.searchProduct('Spiderman')
      .then(data => {
        expect(data).toEqual(expected);
      })
  })

  test('Remove 5 to the stock of a product', async () => {
    let oldStock, newStock;
    await getQueries.getStock(1)
      .then(data => {
        oldStock = parseInt(data[0].stock, 10);
      })

    await updateQueries.updateStock(1, 5) 

    await getQueries.getStock(1)
      .then(data => {
        newStock = parseInt(data[0].stock, 10);
      })
    
    expect(newStock).toBe(oldStock - 5);
  })

  test('Adding 5 to the stock of a product', async () => {
    let oldStock, newStock;
    await getQueries.getStock(1)
      .then(data => {
        oldStock = parseInt(data[0].stock, 10);
      })

    await updateQueries.addToStock(1, 5) 

    await getQueries.getStock(1)
      .then(data => {
        newStock = parseInt(data[0].stock, 10);
      })
    
    expect(newStock).toBe(oldStock + 5);
  })
})
