require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const auth = require('./auth');


app.use(cors());
app.use(express.json());

app.use(auth);

app.use('/api/auth/check_token', require('./auth/check_token'));
app.use('/api/login', require('./login'));
app.use('/api/register', require('./register'));
app.use('/api/meeting', require('./meeting'));
app.use('/api/meeting/all', require('./meeting/all'));
app.use('/api/user', require('./user'));
app.use('/api/user/all', require('./user/all'));

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`)
})
