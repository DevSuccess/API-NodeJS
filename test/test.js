// Step 1 : "Hello, Heroku"
fetch("https://api-node-js-pokemons.onrender.com/")
  .then((res) => res.json())
  .then((res) => console.log(res));

// Step 2 : "Get JWT Token"
fetch("https://api-node-js-pokemons.onrender.com/api/login", {
  method: "POST",
  body: JSON.stringify({ username: "Admin", password: "AllahSeul" }),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    return res.token;
  })
  .then((token) => fetchPokemonList(token));

// Step 3 : "GEt pokemonlist"
const fetchPokemonList = (token) => {
  fetch("https://api-node-js-pokemons.onrender.com/api/pokemons", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
