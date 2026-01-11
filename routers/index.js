const authRouter = require("./auth.router");

const routes = [
  { path: "/user", router: authRouter },
];

module.exports = routes;
