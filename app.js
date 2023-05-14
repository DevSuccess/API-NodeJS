const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/data/sequelize");

const app = express();
const PORT = 3000;

// Les middlewares :
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// Ici, nous plaçons nos futurs de terminaison
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

// On ajoute le gestions des erreurs 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver le ressource demandée ! Vous pouvez essayer une autre URL";
  res.status(404).json({ message });
});

app.listen(PORT, () =>
  console.log(`Server running in : http://localhost:${PORT}`)
);
