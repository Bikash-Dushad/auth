const userRouter = require("./auth.router");

const routes = [
  { path: "/user", router: userRouter },
];

module.exports = routes;
