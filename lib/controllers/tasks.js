/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Task = mongoose.model('Task'),
    Comment = mongoose.model('Comment'),
    _ = require('lodash');


var response = function(req, res, err, item, status, next) {
    if (typeof status === 'undefined')
        status = 500;

    if (err) {
        res.status(status);
        res.jsonp(err);
    } else {
        if(typeof(next) === "function")
            next(req, res, item);
        else
            res.jsonp(item);
    }
};

var save = function(req, res, item, next) {
    item.save(function(err, task){
        response(req, res, err, item, 422, next);
    });
};

/**
 * Find task by id
 */
exports.task = function(req, res, next, id) {
    Task.load(id, function(err, task) {
        if (err) return next(err);
        if (!task) return next(new Error('Failed to load task ' + id));
        req.task = task;
        next();
    });
};

/**
 * Find task by id
 */
exports.comment = function(req, res, next, id) {
    Comment.load(id, function(err, comment) {
        if (err) return next(err);
        if (!comment) return next(new Error('Failed to load comment ' + id));
        req.comment = comment;
        next();
    });
};

/**
 * Create a task
 */
exports.create = function(req, res) {
    var task = new Task(req.body);
    task.user = req.user;
    save(req, res, task);
};

/**
 * Update a task
 */
exports.update = function(req, res, next) {
    var task = req.task;

    task = _.extend(task, req.body);
    save(req, res, task);

};

/**
 * Delete an task
 */exports.destroy = function(req, res, next) {
    var task = req.task;
    task.remove(function(err) {
        response(req, res, err, task);
    });

};

/**
 * Show an task
 */
exports.show = function(req, res, next) {
    var task = req.task;
    Task.findOne(task).populate('comments').exec(function (err, task) {
            res.jsonp(task);
        });
};

/**
 * List of Tasks
 */
exports.all = function(req, res) {
    Task.find({user: req.user}).sort('-created').populate('user', 'name username').exec(function(err, tasks) {
        response(req, res, err, tasks);
    });
};

exports.createComment = function (req, res, next) {
    var comment = new Comment(req.body.comment);
    comment.user = req.user;

    var task = req.task;

    save(req, res, comment, function (req, res, comment) {
        task = req.task;
        task.comments.push(comment);
        save(req, res, task, function (req, res, task){
            Task.findOne(task).populate('comments').exec(function (err, task) {
                res.jsonp(task);
            });
        });
    });
};


exports.destroyComment = function (req, res) {
    var comment = req.comment, task = req.task;

    task.update({$pull: {comments: comment}}, {}, function(err) {

        Task.findOne({'_id': req.task._id}).populate('comments').exec(function (err, task) {
            req.task = task;
            response(req, res, err, req.task, 200, function(req, res, task) {
                comment = req.comment;
                comment.remove(function(err, comment) {
                    response(req, res, err, req.task);
                });
            });
        });
    });
};
