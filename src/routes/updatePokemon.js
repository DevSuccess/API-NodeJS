const { Pokemon } = require("../data/sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        Pokemon.findByPk(id)
          .then((pokemon) => {
            if (!pokemon === null) {
              const message = `La pokemon demander n'existe pas !`;
              return res.status(404).json({ message });
            }
            const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
            res.json({ message, data: pokemon });
          })
          .catch((error) => {
            const message = `La pokemon n'a pas pu être modifier; Réessayer dans quelques instants.`;
            res.status(500).json({ message, data: error });
          });
      })
      .catch((error) => {
        const message = `La pokemon n'a pas pu être modifier; Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
