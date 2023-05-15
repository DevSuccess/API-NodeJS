const { ValidationError } = require('sequelize')
const { Pokemon } = require('../data/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(404).json({message: error.message, data: error});
        }
        const message = `Le pokemon n'a pas pu être ajouter; Réessayer dans quelques instants.`;
        res.status(500).json({message, data: error});
      })
  })
}