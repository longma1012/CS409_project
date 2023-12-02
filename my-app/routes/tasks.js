var express = require('express');
var router = express.Router();
var Task = require('../models/task');

router.get('/', function(req, res) {
    var query = Task.find();
    if (req.query.where) {
        try {
            var where = JSON.parse(req.query.where);
            query.where(where);
        } catch (error) {
            return res.status(400).json({ message: "Invalid 'where' query format", data: [] });
        }
    }
    if (req.query.sort) {
        try {
            var sort = JSON.parse(req.query.sort);
            query.sort(sort);
        } catch (error) {
            return res.status(400).json({ message: "Invalid 'sort' query format", data: [] });
        }
    }
    if (req.query.select) {
        try {
            var selectFields = JSON.parse(req.query.select);
            query.select(selectFields);
        } catch (error) {
            return res.status(400).json({ message: "Invalid 'select' query format", data: [] });
        }
    }
    if (req.query.skip) {
        var skip = parseInt(req.query.skip, 10);
        if (!isNaN(skip) && skip >= 0) {
            query.skip(skip);
        } else {
            return res.status(400).json({ message: "Invalid 'skip' query parameter", data: [] });
        }
    }
    var limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;
    if (!isNaN(limit) && limit >= 0) {
        query.limit(limit);
    } else {
        return res.status(400).json({ message: "Invalid 'limit' query parameter", data: [] });
    }

    if (req.query.count === 'true') {
        query.countDocuments(function(err, count) {
            if (err) {
                res.status(500).json({ message: "Internal server error", data: [] });
            } else {
                res.status(200).json({ message: "OK", data: count });
            }
        });
    } else {
        query.exec(function(err, tasks) {
            if (err) {
                res.status(500).json({ message: "Internal server error", data: [] });
            } else {
                res.status(200).json({ message: "OK", data: tasks });
            }
        });
    }
});

router.post('/', function(req, res) {
    var newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        completed: req.body.completed,
        assignedUser: req.body.assignedUser,
        assignedUserName: req.body.assignedUserName
    });

    newTask.save(function(err, task) {
        if (err) {
            res.status(500).json({ message: "Internal server error", data: [] });
        } else {
            res.status(201).json({ message: "New task created", data: task });
        }
    });
});

router.get('/:id', function(req, res) {
    var query = Task.findById(req.params.id);
    if (req.query.select) {
        try {
            var selectFields = JSON.parse(req.query.select);
            query.select(selectFields);
        } catch (error) {
            return res.status(400).json({ message: "Invalid 'select' query format" });
        }
    }
    query.exec(function(err, task) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!task) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Task found', data: task });
        }
    });
});

router.put('/:id', function(req, res) {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function(err, task) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!task) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Task updated', data: task });
        }
    });
});

router.delete('/:id', function(req, res) {
    Task.findByIdAndDelete(req.params.id, function(err, task) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!task) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Task deleted', data: task });
        }
    });
});

module.exports = router;