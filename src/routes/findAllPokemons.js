const { Pokemon } = require("../data/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      return Pokemon.findAndCountAll({
        where: {
          name: { [Op.like]: `%${name}%` }
        },
        order: ['name'],
        limit: 5
      }).then(({count, rows}) => {
        const message = `Il y a ${count} pokémons qui correspond au terme rechercher ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({order: ['name']})
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
