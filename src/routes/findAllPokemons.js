const { Pokemon } = require("../data/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      return Pokemon.findAll({
        where: {
          name: { [Op.like]: `%${name}%` }
        },
      }).then((pokemons) => {
        const message = `Il y a ${pokemons.length} pokémons qui correspond au terme rechercher ${name}`;
        res.json({ message, data: pokemons });
      });
    } else {
      Pokemon.findAll()
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
