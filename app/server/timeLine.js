***REMOVED***
 * Created by YouHan on 2016/8/9.
***REMOVED***
var express = require('express');
var router = express.Router();
var path = require('path');
var chart = require('./controller/timeLine/chart');
var event = require('./controller/timeLine/event');

router.use('/chart', chart);
router.use('/event', event);

router.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/timeLine.html'));
***REMOVED***

router.get('/image', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/timeLine/image.html'));
***REMOVED***

module.exports = router;