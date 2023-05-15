const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("../mocks/mock-pokemon");
const users = require("../mocks/mock-user");

const sequelize = new Sequelize("api-node-js", "root", "AllahSeul", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    users.map((user) => {
      bcrypt.hash(user.password, 10).then((hash) => {
        User.create({
          username: user.username,
          password: hash,
        }).then((user) => console.log(user.toJSON()));
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
