// LES IMPORT ....

const App = () => {
    axios
        .get("https://api-node-js-pokemons.onrender.com/")
        .then((res) => console.log(res.data));
    
    // ...
}