var express = require('express');
var router = express.Router();
var passport = require('passport');
const MeetingModel = require('../../db/model.js').MeetingModel;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  MeetingModel.find({}).populate({ path: '_id_user', select: 'name teamName role' }).exec(function (err, data) {
    if (err) { return res.status(500).json({ message: 'Internal error', err: err }) };

    res.status(200).send(data)

  })

});

module.exports = router;