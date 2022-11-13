const axios = require('axios');

const userName = "teste" + (Math.random() * 1000).toFixed(0);

let token = '';
let testUser = {};
let testUser2 = {};

test('Create user', async () => {

  const userObject = {
    "name": userName,
    "teamName": "Marketing",
    "userName": userName,
    "password": userName,
    "role": "worker"
  }

  await axios.post('http://localhost:4000/api/register', userObject)
    .then(function (res) {

      token = res.data.token;

      expect(res.data).toHaveProperty('token');

    });

});

test('Edit user', async () => {

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'bearer ' + token
  }

  await axios.get('http://localhost:4000/api/user/all', { headers: headers })
    .then(async function (res) {

      testUser = JSON.parse(JSON.stringify(res.data.users.find(function (user) { return user.name === userName })));

      const userObject = {
        "_id": testUser._id,
        "name": "new_" + testUser.name
      }

      await axios.put('http://localhost:4000/api/user', userObject, { headers: headers })
        .then(function (res) {

          expect(res.status).toBe(204);

        });

    });

});

test('Delete user', async () => {

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'bearer ' + token
  }

  await axios.get('http://localhost:4000/api/user/all', { headers: headers })
    .then(async function (res) {

      testUser2 = JSON.parse(JSON.stringify(res.data.users.find(function (user) { return user.name === 'new_' + userName })));

      const userObject = {
        "_id": testUser2._id
      }

      // await axios.delete('http://localhost:4000/api/user', userObject, { headers: headers })
      //   .then(function (res) {

      //     expect(res.status).toBe(204);

      //   })

    })

})

