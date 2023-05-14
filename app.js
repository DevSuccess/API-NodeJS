const express = require("express");

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello, Express !'));
app.get('/api/pokemons/:id', (req,res) => {
    const id = req.params.id;
    res.send("Vous avez demandé le paramètre n°"+id);
});

app.listen(PORT, () => console.log(`Server running in : http://localhost:${PORT}`));