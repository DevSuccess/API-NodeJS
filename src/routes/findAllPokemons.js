const { Pokemon } = require("../data/sequelize");
const { Op } = require("sequelize");
const auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        const message = `Le terme de recherche doit être au moins 2 caractères.`;
        return res.status(400).json({ message });
      }

      return Pokemon.findAndCountAll({
        where: {
          name: { [Op.like]: `%${name}%` },
        },
        order: ["name"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} pokémons qui correspond au terme rechercher ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = `La liste des pokemons n'a pas pu être récupérée; Réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
