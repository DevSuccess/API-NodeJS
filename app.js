const express = require("express");
const morgan = require("morgan");
const favicon = require('serve-favicon');
const {success} = require("./helpers/helper");
let pokemons = require('./mocks/mock-pokemon');

const app = express();
const PORT = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'));

app.get('/', (req, res) => res.send('Hello, Express !'));
app.get('/api/pokemons', (req, res) => {
    const nb =  pokemons.length;
    const message = `La liste des ${nb} pokemons `;
    res.json(success(message, pokemons));
});
app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const message = "Un pokemon à été trouvé";
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    res.json(success(message, pokemon));
});

app.listen(PORT, () => console.log(`Server running in : http://localhost:${PORT}`));