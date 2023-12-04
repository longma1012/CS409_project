// routes/uiuc.js

var express = require('express');
var router = express.Router();
var Uiuc = require('../models/uiuc');

router.get('/', function(req, res) {
    var query = Uiuc.find();

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
        query.exec(function(err, uiucs) {
            if (err) {
                res.status(500).json({ message: "Internal server error", data: [] });
            } else {
                res.status(200).json({ message: "OK", data: uiucs });
            }
        });
    }
});

router.post('/', function(req, res) {
    var newUiuc = new Uiuc({
        netID: req.body.netID,
        password: req.body.password
    });

    newUiuc.save(function(err, uiuc) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(201).json({ message: "Uiuc entry successfully created", data: uiuc });
        }
    });
});

router.get('/:netID', function(req, res) {
    var query = Uiuc.findOne({ netID: req.params.netID });

    if (req.query.select) {
        try {
            var selectFields = JSON.parse(req.query.select);
            query.select(selectFields);
        } catch (error) {
            return res.status(400).json({ message: "Invalid 'select' query format" });
        }
    }

    query.exec(function(err, uiuc) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!uiuc) {
            res.status(404).json({ message: 'Uiuc entry not found' });
        } else {
            res.status(200).json({ message: 'Uiuc entry found', data: uiuc });
        }
    });
});

router.put('/:netID', function(req, res) {
    Uiuc.findOneAndUpdate({ netID: req.params.netID }, req.body, { new: true, runValidators: true }, function(err, uiuc) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!uiuc) {
            res.status(404).json({ message: 'Uiuc entry not found' });
        } else {
            res.status(200).json({ message: 'Uiuc entry updated', data: uiuc });
        }
    });
});

router.delete('/:netID', function(req, res) {
    Uiuc.findOneAndRemove({ netID: req.params.netID }, function(err, uiuc) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (!uiuc) {
            res.status(404).json({ message: 'Uiuc entry not found' });
        } else {
            res.status(200).json({ message: 'Uiuc entry deleted', data: uiuc });
        }
    });
});

module.exports = router;