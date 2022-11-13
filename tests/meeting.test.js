const axios = require('axios');

const tomorrow = new Date(new Date().valueOf() + 86400000);
const meetingPlace = "teste" + (Math.random() * 1000).toFixed(0);

let token = '';

test('Log in to the system', async () => {

  await axios.post('http://localhost:4000/api/login', { "userName": "jest", "password": "123" })
    .then(function (res) {

      token = res.data.token;

      expect(res.data).toHaveProperty('token');

    });

});

test('Create a meeting', async () => {

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'bearer ' + token
  }

  const meetingObject = {
    "place": meetingPlace,
    "date": tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getDate() + "T19:14:00.000Z",
    "done": false,
    "_id_user": [
      "637141f1264b61fb1fbd6837",
      "62fc23b4d62efcf5ce71ebc7"
    ]
  }

  await axios.post('http://localhost:4000/api/meeting', meetingObject, { headers: headers })
    .then(function (res) {

      expect(res.status).toBe(204);

    });

});

test('Finishing a meeting', async () => {

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'bearer ' + token
  }

  await axios.get('http://localhost:4000/api/meeting', { headers: headers })
    .then(async function (res) {

      const testMeeting = res.data.find(function (meeting) { return meeting.place === meetingPlace });

      const meetingObject = {
        done: true,
        _id: testMeeting._id
      }

      await axios.put('http://localhost:4000/api/meeting', meetingObject, { headers: headers })
        .then(function (res) {

          expect(res.status).toBe(204);

        })

    });

});

