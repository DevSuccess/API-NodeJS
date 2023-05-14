const express = require("express");
const {success} = require("./Helpers/helper");
let pokemons = require('./mocks/mock-pokemon');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello, Express !'));
app.get('/api/pokemons', (req, res) => {
    const nb =  pokemons.length;
    res.send(`Il y a ${nb} pokemons`);
});
app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const message = "Un pokemon à été trouvé";
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    res.json(success(message, pokemon));
});

app.listen(PORT, () => console.log(`Server running in : http://localhost:${PORT}`));