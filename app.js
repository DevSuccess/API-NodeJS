const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const { success, getUniqueId } = require("./helpers/helper");
let pokemons = require("./mocks/mock-pokemon");

const app = express();
const PORT = 3000;

const sequelize = new Sequelize("api-node-js", "root", "AllahSeul", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then((_) => console.log("Connexion au BD"))
  .catch((error) => console.log(`Connexion Impossible, erreur : ${error}`));

// Les middlewares :
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello, Express !"));
app.get("/api/pokemons", (req, res) => {
  const nb = pokemons.length;
  const message = `La liste des ${nb} pokemons `;
  res.json(success(message, pokemons));
});
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = "Un pokemon à été trouvé";
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.json(success(message, pokemon));
});
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a bien été creée`;
  res.json(success(message, pokemonCreated));
});
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokemon ${pokemonUpdated.name} à été modifier !`;
  res.json(success(message, pokemonUpdated));
});
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});

app.listen(PORT, () =>
  console.log(`Server running in : http://localhost:${PORT}`)
);
