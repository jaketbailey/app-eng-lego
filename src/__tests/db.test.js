/* eslint-disable */ 
const getQuery = require('../server/db/getQueries.js');
const insertQuery = require('../server/db/insertQueries.js');
const deleteQuery = require('../server/db/deleteQueries.js');

test('Sanity Check', () => {
  expect(1 + 1).toBe(2);
});

describe('getDb', () => {

  test('Add User', async () => {
    await insertQuery.createUser('testuser2-testuser2', 'Test User', 'test2@gmail.com');
    await getQuery.getUserName('testuser2-testuser2')
      .then((data) => {
        expect(data).toBeDefined();
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

// const DoMaths = (a, b) => a + b;
// const DoQuadratic = (a, b, c) => a * a + b * b + c * c;

// const StateObject = {};

// test('Logic System', () => {
//   expect(DoMaths(1, 2)).toBe(3);
//   expect(DoQuadratic(1, 2, 3)).toBe(14);

//   StateObject.x = 1;
//   StateObject.y = 2;
//   expect(StateObject.x).toBe(1);
// });

// function NewUser(username, email, password) {
//   if (!email.includes('@')) {
//       throw new Error('Invalid email');
//   }

//   Database.insert({
//       username,
//       email,
//       password,
//   });
// }

// test('User System', () {
//   NewUser('test', 'test@gmail.com', 'test');
//   expect(Database.get('test')).toBeDefined();

//   try {
//       NewUser('test1', 'asdasdasd', 'test');
//   } catch (e) {
//       expect(e.message).toBe('Invalid email');
//   }
//   expect(Database.get('test1')).toNotBeDefined();
// })

