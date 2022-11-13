var express = require('express');
var router = express.Router();
var passport = require('passport');
const UserModel = require('../db/model.js').UserModel
const MeetingModel = require('../db/model.js').MeetingModel;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  delete req.user.password
  delete req.user.userName

  res.send(req.user)

});

router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const id = req.body._id;
  const name = req.body.name;
  const teamName = req.body.teamName;
  const role = req.body.role;

  UserModel.findByIdAndUpdate(id, { name: name, teamName: teamName, role: role }, function (err, data) {
    if (err) { return res.status(500).json({ message: 'Internal error.', err: err }) }

    res.status(204).send();

  })

});

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const id = req.body._id;

  UserModel.findByIdAndDelete(id, function (err, data) {
    if (err) { return res.status(500).json({ message: 'Internal error.', err: err }) }

    MeetingModel.deleteMany({ _id: { $in: data._id_meeting } }, function (data, err) {
      if (err) { return res.status(500).json({ message: 'Internal error.', err: err }) }

      res.status(204).send();

    })

  })

});

module.exports = router;