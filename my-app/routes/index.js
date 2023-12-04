/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));

    var usersRouter = require('./users');
    app.use('/api/users', usersRouter);

    var tasksRouter = require('./tasks');
    app.use('/api/tasks', tasksRouter);

    var uiucRouter = require('./uiuc');
    app.use('/api/uiuc', uiucRouter);

    var postRouter = require('./post');
    app.use('/api/post', postRouter);

    var commentsRouter = require('./comments');
    app.use('/api/comments', commentsRouter);
};
