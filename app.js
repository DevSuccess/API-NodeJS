const express = require("express");

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello, Express !'));
app.get('/api/pokemons/1', (req,res) => res.send("Hello Bulbizar"));

app.listen(PORT, () => console.log(`Server running in : http://localhost:${PORT}`));