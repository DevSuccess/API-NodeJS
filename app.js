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

sequelize.initDb();

// Ici, nous plaçons nos futurs de terminaison
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);

app.listen(PORT, () =>
  console.log(`Server running in : http://localhost:${PORT}`)
);
