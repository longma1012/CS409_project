// routes/users.js
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res) {
    var query = User.find();
    if (req.query.where) {
        try {
            var where = JSON.parse(req.query.where);
            query = query.where(where);
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
            var select = JSON.parse(req.query.select);
            query.select(select);
        } catch (error) {
            return res.status(400).json({ message: "Invalid 'select' query format", data: [] });
        }
    }
    if (req.query.skip) {
        var skip = parseInt(req.query.skip);
        if (!isNaN(skip)) {
            query.skip(skip);
        } else {
            return res.status(400).json({ message: "Invalid 'skip' query parameter", data: [] });
        }
    }
    if (req.query.limit) {
        var limit = parseInt(req.query.limit);
        if (!isNaN(limit)) {
            query.limit(limit);
        } else {
            return res.status(400).json({ message: "Invalid 'limit' query parameter", data: [] });
        }
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
        query.exec(function(err, users) {
            if (err) {
                res.status(500).json({ message: "Internal server error", data: [] });
            } else {
                res.status(200).json({ message: "OK", data: users });
            }
        });
    }
});

router.post('/', function(req, res) {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        pendingTasks: req.body.pendingTasks || [],
        dateCreated: req.body.dateCreated || new Date()
    });

    newUser.save(function(err, user) {
        if (err) {
            res.status(500).json({message: err.message});
        } else {
            res.status(201).json({message: "User successfully created", data: user});
        }
    });
});

router.get('/:id', function(req, res) {
    var query = User.findById(req.params.id);
    if (req.query.select) {
        try {
            var selectFields = JSON.parse(req.query.select);
            query.select(selectFields);
        } catch (error) {
            return res.status(400).json({ message: "Invalid 'select' query format" });
        }
    }
    query.exec(function(err, user) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User found', data: user });
        }
    });
});

router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function(err, user) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User updated', data: user });
        }
    });
});

router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User deleted', data: user });
        }
    });
});

module.exports = router;