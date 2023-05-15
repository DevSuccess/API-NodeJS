const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../data/sequelize')
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({message: error.message, data: error});
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message: error.message, data: error});
        }
        const message = `Le pokemon n'a pas pu être ajouter; Réessayer dans quelques instants.`;
        res.status(500).json({message, data: error});
      })
  })
}