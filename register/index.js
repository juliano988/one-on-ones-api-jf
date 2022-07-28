require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../db/model.js').UserModel


router.post('/', function (req, res) {

  const name = req.body.name;
  const teamName = req.body.teamName;
  const userName = req.body.userName;
  const password = req.body.password;
  const role = req.body.role;

  UserModel.findOne({ userName: userName }, null, { lean: true }, function (err, data) {
    if (err) { return res.status(500).json({ message: 'Internal error.', err: err }) }
    if (data) { return res.status(400).json({ message: 'User already exist.' }) }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) { return res.status(500).json({ message: 'Internal error.', err: err }) }

      const newUser = new UserModel({
        name: name,
        teamName: teamName,
        userName: userName,
        password: hash,
        role: role
      })

      await newUser.save();

      UserModel.findOne({ userName: userName }, null, { lean: true }, function (err, data) {
        if (err) { return res.status(500).json({ message: 'Internal error.', err: err }) }

        var token = jwt.sign(data, process.env.SECRET);

        res.status(200).json({ token: token });

      });

    });

  });

}
);

module.exports = router;