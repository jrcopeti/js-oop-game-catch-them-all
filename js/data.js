const pokemonData = [
  {
    name: "Bulbasaur",
    imageSrc: "../assets/pokemon/bulbasaur.png",
    score: 100,
  },
  {
    name: "Butterfree",
    imageSrc: "../assets/pokemon/butterfree.png",
    score: 50,
  },
  {
    name: "Charmander",
    imageSrc: "../assets/pokemon/charmander.png",
    score: 100,
  },
  {
    name: "Jigglypuff",
    imageSrc: "../assets/pokemon/jigglypuff.png",
    score: 100,
  },
  { name: "Meowth", imageSrc: "../assets/pokemon/meowth.png", score: 100 },
  { name: "Pidgiotto", imageSrc: "../assets/pokemon/pidgiotto.png", score: 50 },
  { name: "Pikachu", imageSrc: "../assets/pokemon/pikachu.png", score: 150 },
  { name: "Squirtle", imageSrc: "../assets/pokemon/squirtle.png", score: 100 },
  { name: "Starmie", imageSrc: "../assets/pokemon/starmie.png", score: 150 },
  { name: "Ratata", imageSrc: "../assets/pokemon/ratata.png", score: 50 },
  { name: "Totodile", imageSrc: "../assets/pokemon/totodile.png", score: 100 },
  {
    name: "Cyndaquil",
    imageSrc: "../assets/pokemon/cyndaquil.png",
    score: 100,
  },
  {
    name: "Chicorita",
    imageSrc: "../assets/pokemon/chicorita.png",
    score: 100,
  },
  { name: "Eevee", imageSrc: "../assets/pokemon/eevee.png", score: 100 },
  { name: "Psyduck", imageSrc: "../assets/pokemon/psyduck.png", score: 150 },
  { name: "Magikarp", imageSrc: "../assets/pokemon/magikarp.png", score: 50 },
  { name: "Goldeen", imageSrc: "../assets/pokemon/goldeen.png", score: 50 },
  { name: "Caterpie", imageSrc: "../assets/pokemon/caterpie.png", score: 50 },
  { name: "Snorlax", imageSrc: "../assets/pokemon/snorlax.png", score: 150 },
  // enemy pokemon
  { name: "Ekans", imageSrc: "../assets/pokemon/ekans.png", score: 300 },
  { name: "Koffing", imageSrc: "../assets/pokemon/koffing.png", score: 300 },
  { name: "Kadabra", imageSrc: "../assets/pokemon/kadabra.png", score: 500 },
  { name: "Gastly", imageSrc: "../assets/pokemon/gastly.png", score: 200 },
];

const specialPokemonData = [
  {
    name: "Celebi",
    imageSrc: "../assets/special-pokemon/celebi.png",
    score: 1000,
  },
  {
    name: "Entei",
    imageSrc: "../assets/special-pokemon/entei.png",
    score: 1000,
  },
  {
    name: "Ho-oh",
    imageSrc: "../assets/special-pokemon/ho-oh.png",
    score: 500,
  },
  { name: "Mew", imageSrc: "../assets/special-pokemon/mew.png", score: 500 },
  {
    name: "Mewtwo",
    imageSrc: "../assets/special-pokemon/mewtwo.png",
    score: 500,
  },
  {
    name: "Dragonite",
    imageSrc: "../assets/special-pokemon/dragonite.png",
    score: 1000,
  },
  {
    name: "Lugia",
    imageSrc: "../assets/special-pokemon/lugia.png",
    score: 500,
  },
  { name: "Jynx", imageSrc: "../assets/special-pokemon/jynx.png", score: 1000 },
  {
    name: "Blastoise",
    imageSrc: "../assets/special-pokemon/blastoise.png",
    score: 1000,
  },
  {
    name: "Charizard",
    imageSrc: "../assets/special-pokemon/charizard.png",
    score: 500,
  },
  {
    name: "Venosaur",
    imageSrc: "../assets/special-pokemon/venosaur.png",
    score: 500,
  },

  // enemy pokemon
  {
    name: "Arbok",
    imageSrc: "../assets/special-pokemon/arbok.png",
    score: 500,
  },
  {
    name: "Weezing",
    imageSrc: "../assets/special-pokemon/weezing.png",
    score: 500,
  },
  {
    name: "Gengar",
    imageSrc: "../assets/special-pokemon/gengar.png",
    score: 500,
  },
];

const levels = [
  {
    level: "1",
    background: "../assets/background/mount-background.png",
    maxCount: 30,
    rate: 2000,
    speed: 0.5,
    specialRate: 10000,
    specialSpeed: 2,
    music: level1Music,
  },

  {
    level: "2",
    background: "../assets/background/cave.png",
    maxCount: 40,
    rate: 1000,
    speed: 1,
    specialRate: 10000,
    specialSpeed: 3,
    music: level2Music,
  },
  {
    level: "3",
    background: "../assets/background/veridian.png",
    maxCount: 50,
    rate: 1000,
    speed: 2,
    specialRate: 10000,
    specialSpeed: 4,
    music: level3Music,
  },
  {
    level: "4",
    background: "../assets/background/mirage-island.png",
    maxCount: 50,
    rate: 800,
    speed: 3,
    specialRate: 5000,
    specialSpeed: 6,
    music: level4Music,
  },
  {
    level: "5",
    background: "../assets/background/kyo.png",
    maxCount: 500,
    rate: 100,
    speed: 2,
    specialRate: 2000,
    specialSpeed: 8,
    music: level5Music,
  },
  {
    level: "6",
    background: "../assets/background/computer.png",
    maxCount: 50,
    rate: 1000,
    speed: 1,
    specialRate: 15000,
    specialSpeed: 15,
    music: level6Music,
  },
  {
    level: "7",
    background: "../assets/background/safron.png",
    maxCount: 70,
    rate: 1000,
    speed: 6,
    specialRate: 10000,
    specialSpeed: 5,
    music: level7Music,
  },
  {
    level: "8",
    background: "../assets/background/ice.png",
    maxCount: 350,
    rate: 200,
    speed: 3,
    specialRate: 2000,
    specialSpeed: 5,
    music: level8Music,
  },

  {
    level: "9",
    background: "../assets/background/fire.png",
    maxCount: 150,
    rate: 1000,
    speed: 5,
    specialRate: 1000,
    specialSpeed: 6,
    music: level9Music,
  },
  {
    level: "10",
    background: "../assets/background/stadium.png",
    maxCount: 10000,
    rate: 10,
    speed: 2,
    specialRate: 200,
    specialSpeed: 15,
    music: level10Music,
  },
];
