/* eslint-disable */ 
const getQuery = require('../server/db/getQueries.js');
const insertQuery = require('../server/db/insertQueries.js');
const updateQuery = require('../server/db/updateQueries.js');
const deleteQuery = require('../server/db/deleteQueries.js');

test('Sanity Check', () => {
  expect(1 + 1).toBe(2);
});

describe('User Tests', () => {

  test('Add User', async () => {
    await insertQuery.createUser('testuser2-testuser2', 'Test User', 'test2@gmail.com');
    await insertQuery.createBasket('testuser2-testuser2', 'test2@gmail.com');
    await getQuery.getUserName('testuser2-testuser2')
      .then((data) => {
        expect(data).toBeDefined();
      });
    await getQuery.getBasketId('testuser2-testuser2')
      .then((data) => {
        expect(data).toBeDefined();
      });
  });

  test('Add to Basket/Order', async () => {
    await getQuery.getBasketId('testuser2-testuser2')
      .then( async (data) => {
        insertQuery.addToBasket(data[0].id, 1, 3.88, 1);
        await getQuery.checkOrderDetail(`1-${data[0].id}`)
          .then((data) => {
            expect(data).toBeDefined();
          });
      });
  });

  test('Delete User', async () => {
    await getQuery.getBasketId('testuser2-testuser2')
      .then(async (data) => {
        await deleteQuery.deleteUser('testuser2-testuser2', data[0].id);
      });
    await getQuery.getUserName('testuser2-testuser2')
      .then((data) => {
        expect(data).toEqual([]);
      });
  });

  test('Get User', async () => {
    const id = 'testuser-testuser'; 
    const expected = [{
      address_line_1: '1 Test Street',
      address_line_2: 'Testland',
      city: 'Testington',
      country: 'Testland',
      county: 'Testington',
      phone: '07712345678',
      postcode: 'TE11ST',
    }];
    await getQuery.getUser(id)
      .then(data => {
        expect(data).toEqual(expected);
      });
  });
});