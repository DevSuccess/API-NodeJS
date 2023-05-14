const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require('./src/data/sequelize');

const app = express();
const PORT = 3000;

// Les middlewares :
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json())
;

app.listen(PORT, () =>
  console.log(`Server running in : http://localhost:${PORT}`)
);
