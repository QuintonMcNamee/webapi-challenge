const express = require('express');

const actionRouter = require('./routes/actionRouter.js');
const projectRouter = require('./routes/projectRouter.js');

const server = express();

// gloabl middleware
server.use(express.json());
server.use(logger); // custom middleware used globally

// route handlers
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request made to ${req.url})}`
  );

  next();
};

// failsafe
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// export default server
module.exports = server;
