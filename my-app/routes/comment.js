var express = require('express');
var router = express.Router();
var Comments = require('../models/comments');

// GET 路由 - 获取所有评论
router.get('/', function(req, res) {
    Comments.find(function(err, comments) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Comments retrieved', data: comments });
    });
});

// GET 路由 - 根据 ID 获取单个评论
router.get('/:id', function(req, res) {
    Comments.findById(req.params.id, function(err, comment) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment found', data: comment });
    });
});

// POST 路由 - 创建新评论
router.post('/', function(req, res) {
    var newComment = new Comments({
        Content: req.body.Content,
        LinkedPostID: req.body.LinkedPostID,
        commentUserID: req.body.commentUserID
    });
    newComment.save(function(err, comment) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ message: 'Comment created', data: comment });
    });
});

// PUT 路由 - 根据 ID 更新评论
router.put('/:id', function(req, res) {
    Comments.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function(err, comment) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment updated', data: comment });
    });
});

// DELETE 路由 - 根据 ID 删除评论
router.delete('/:id', function(req, res) {
    Comments.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted', data: comment });
    });
});

module.exports = router;