const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("../mocks/mock-pokemon");
const users = require("../mocks/mock-user");

const sequelize = new Sequelize(
  process.env.DB_DBNAME || "api-node-js",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "AllahSeul",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT+3",
    },
    logging: false,
  }
);

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((_) => console.log("Pokemon Ajouter avec SUCCES !"));
    });

    users.map((user) => {
      bcrypt.hash(user.password, 10).then((hash) => {
        User.create({
          username: user.username,
          password: hash,
        }).then((_) => console.log("Utilisateur Ajouter avec SUCCES !"));
      });
    });
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
