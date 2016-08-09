/**
 * Created by YouHan on 2016/8/5.
 */
var express = require('express');
var event = require('./../model/event');
var authRouter = require('./../common/auth');
var router = express.Router();

//root path:/event

router.use(authRouter);

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});

router.route('/:id?')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next();
    })
    .get(function (req, res, next) {
        var id;
        if (req.params) {
            id = req.params.id;
        }
        event.get(id).then(function (data) {
            res.send({
                success: true,
                data: data
            });
        }).then(function (reason) {
            res.send({
                success: false,
                reason: reason || 'error happen'
            });
        });
    })
    .post(function (req, res, next) {
        var params = req.params;
        event.add(params.sid, params.name).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    })
    .patch(function (req, res, next) {
        var params = req.params;
        event.update(params.id, params.sid, params.name).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    })
    .delete(function (req, res, next) {
        var params = req.params;
        event.remove(params.id).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    });

module.exports = router;