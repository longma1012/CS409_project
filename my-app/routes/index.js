/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));

    var usersRouter = require('./users');
    app.use('/api/users', usersRouter);

    var tasksRouter = require('./tasks');
    app.use('/api/tasks', tasksRouter);
};
