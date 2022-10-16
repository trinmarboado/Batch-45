const todos = require('./todos/todos.service.js');
const users = require('./users/users.service.js');
const tasks = require('./tasks/tasks.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(todos);
  app.configure(users);
  app.configure(tasks);
}
