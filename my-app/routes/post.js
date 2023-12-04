var express = require('express');
var router = express.Router();
var Post = require('../models/post');

// GET 路由 - 获取所有帖子
router.get('/', function(req, res) {
    var query = Post.find();

    query.exec(function(err, posts) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Posts retrieved', data: posts });
    });
});

// GET 路由 - 根据 ID 获取单个帖子
router.get('/:id', function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post found', data: post });
    });
});

// POST 路由 - 创建新帖子
router.post('/', function(req, res) {
    var newPost = new Post({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body,
        likes: req.body.likes,
        commentID: req.body.commentID
    });
    newPost.save(function(err, post) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ message: 'Post created', data: post });
    });
});

// PUT 路由 - 根据 ID 更新帖子
router.put('/:id', function(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function(err, post) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated', data: post });
    });
});

// DELETE 路由 - 根据 ID 删除帖子
router.delete('/:id', function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err, post) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted', data: post });
    });
});

module.exports = router;