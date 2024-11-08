"use strict";

const content = document.getElementById("content");

let startPoint = 1;
let maxPokemons = 20;

let backgroundCardColor;
let color1;
let color2;
let abilitiesString;
let pokemonNames = [];
let pokemonIds = [];
let pokemonJsons = [];
let cardBackside = document.getElementsByClassName("cardBackside");
let cardFrontside = document.getElementsByClassName("cardFrontside");

const searchImgContainer = document.getElementById("searchImgContainer");
const searchInput = document.getElementById("searchInput");
let pokemonIdSearch = [];

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const modalCardContent = document.getElementById("modalCardContent");
const cardFrontsideContainer = document.getElementsByClassName(
  "cardFrontsideContainer"
);

let aboutTitle = document.getElementsByClassName("aboutTitle");
let baseTitle = document.getElementsByClassName("baseTitle");
let aboutStatsContent = document.getElementsByClassName("aboutStatsContent");
let baseStatsContent = document.getElementsByClassName("baseStatsContent");

let currentCard;

let indexId = 1;
let indexStart = 0;
let indexEnd = 20;
let isRendering = false;

const loadPokemons = document.getElementById("loadPokemons");

/*
let pokemonJsons = [];
let pkmnNames = [];
let pkmnStats0 = [];
let pkmnSprites = [];
let pkmnSpeciesName = [];
let pkmnHeight = [];
let pkmnWeight = [];
let pkmnAbilities = [];
let pkmnStats1 = [];
let pkmnStats2 = [];
let pkmnStats3 = [];
let pkmnStats4 = [];
let pkmnStats5 = [];
*/

async function displayPokemons() {
  for (let i = indexStart; i < indexEnd; i++) {
    let currentId = indexId + i;
    await fetchPokemon(currentId);
  }
}

async function fetchPokemon(id) {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  let response = await fetch(url);
  let jsonData = await response.json();
  displayPokemon(id, jsonData);
}

function displayPokemon(id, jsonData) {
  pokemonJsons.push(JSON.stringify(jsonData));

  pokemonNames.push(jsonData.name);
  pokemonIds.push(id);

  /*
  pkmnNames.push(jsonData.name);
  pkmnStats0.push(jsonData.stats["0"].base_stat);
  pkmnSprites.push(jsonData.sprites.other["showdown"].front_default);
  pkmnSpeciesName.push(jsonData.species.name);
  pkmnHeight.push(jsonData.height);
  pkmnWeight.push(jsonData.weight);
  pkmnAbilities.push(jsonData.abilities);
  pkmnStats1.push(jsonData.stats["1"].base_stat);
  pkmnStats2.push(jsonData.stats["2"].base_stat);
  pkmnStats3.push(jsonData.stats["3"].base_stat);
  pkmnStats4.push(jsonData.stats["4"].base_stat);
  pkmnStats5.push(jsonData.stats["5"].base_stat);
*/

  content.innerHTML += `
        <div id="divBack${id}" class="cardBackside flexContainerCol">

           <div id="nameContentBackside${id}" class="nameContentBackside flexContainer"><span class="nameBackside">${capitalizeFirstLetter(
    jsonData.name
  )}</span>
            <span id="type1Backside${id}" class="typeBackside">${
    jsonData.types["0"].type["name"]
  }</span>
            <span id="type2Backside${id}"class="typeBackside">${
    jsonData.types["1"] ? jsonData.types["1"].type["name"] : ""
  }</span>
           </div>

           

          <div class="imgContentBackside"><img class="imgBackside bounce" src="${
            jsonData.sprites.other.dream_world.front_default
          }" alt="${jsonData.name} image" /></div>

        </div>`;

  modalCardContent.innerHTML += `<div id="divFrontContainer${id}" class="cardFrontsideContainer none">
        <div id="divFront${id}" class="cardFrontside flexContainerCol">

           <div class="nameContentFrontside flexContainer">
           <span class="nameFrontside">${capitalizeFirstLetter(
             jsonData.name
           )}</span>
            <div class="hpContent">
              <span class="hp">HP</span>
              <span class="hpStat">${jsonData.stats["0"].base_stat}</span>
            </div>
           </div>

          <div class="imgContentFrontside flexContainer"><img class="imgFrontside" src="${
            jsonData.sprites.other["showdown"].front_default
          }" alt="${jsonData.name} image" />
          </div>

          <div class="statsFrontside flexContainer">
            <span id="aboutTitle${id}" class="aboutTitle statsTitle activeStatsTab">About</span>
            <span id="baseTitle${id}" class="baseTitle statsTitle">Base</span>
          </div>

          

          <div id="aboutStatsContent${id}" class="aboutStatsContent statsContentAll flexContainer">
           <table>

            <tr>
              <td>Species</td>
              <td>${capitalizeFirstLetter(jsonData.species.name)}</td>
            </tr>

            <tr>
              <td>Height</td>
              <td>${jsonData.height}0 cm</td>
            </tr>

            <tr>
              <td>Weight</td>
              <td>${jsonData.weight / 10} kg</td>
            </tr>

            <tr>
              <td>Abilities</td>
              <td>${displayAbilities(jsonData.abilities)}</td>
            </tr>

           </table>
          </div>



          

          <div id="baseStatsContent${id}" class="baseStatsContent statsContentAll flexContainer none">
           <table>

            <tr>
              <td>Attack</td>
              <td>${jsonData.stats["1"].base_stat} Un.</td>
            </tr>

            <tr>
              <td>Defense</td>
              <td>${jsonData.stats["2"].base_stat} Un.</td>
            </tr>

            <tr>
              <td>Special-Attack</td>
              <td>${jsonData.stats["3"].base_stat} Un.</td>
            </tr>

            <tr>
              <td>Special-Defense</td>
              <td>${jsonData.stats["4"].base_stat} Un.</td>
            </tr>

            <tr>
              <td>Speed</td>
              <td>${jsonData.stats["5"].base_stat} Un.</td>
            </tr>

           </table>
          </div>

        </div>
</div>`;

  getId();

  setColor1(jsonData.types["0"].type["name"]);
  document.getElementById(`type1Backside${id}`).style.color = color1;

  if (jsonData.types["1"]) {
    setColor2(jsonData.types["1"].type["name"]);
    document.getElementById(`type2Backside${id}`).style.color = color2;
  }

  setBackgroundColor(jsonData.types["0"].type["name"]);

  /* color */
  if (document.getElementById(`divFront${id}`)) {
    document.getElementById(
      `divFront${id}`
    ).style.backgroundImage = `linear-gradient(${
      Math.floor(Math.random() * 360) + 10
    }deg, ${backgroundCardColor}, #14293d80`;
  }

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  for (let i = 0; i < aboutTitle.length; i++) {
    aboutTitle[i].addEventListener("click", function () {
      aboutTitle[i].classList.add("activeStatsTab");
      baseTitle[i].classList.remove("activeStatsTab");

      aboutStatsContent[i].classList.remove("none");
      baseStatsContent[i].classList.add("none");
    });
  }

  for (let i = 0; i < baseTitle.length; i++) {
    baseTitle[i].addEventListener("click", function () {
      aboutTitle[i].classList.remove("activeStatsTab");
      baseTitle[i].classList.add("activeStatsTab");

      aboutStatsContent[i].classList.add("none");
      baseStatsContent[i].classList.remove("none");
    });
  }
}

function getId() {
  for (let i = 0; i < cardBackside.length; i++) {
    cardBackside[i].addEventListener("click", function (event) {
      //console.log(cardBackside[i].id);
      let currentId = cardBackside[i].id.slice(7);
      console.log(currentId);
      displayFrontCard(currentId, pokemonJsons[currentId]);
    });
  }
}

closeBtn.addEventListener("click", function () {
  modal.classList.add("none");
  document.body.style.overflowY = "visible";
});

/*
  pokemonNames.push(jsonData.name);
  pokemonIds.push(id);


closeBtn.addEventListener("click", function () {
  modal.classList.add("none");
  document.body.style.overflowY = "visible";
});

arrowLeft.addEventListener("click", function () {
  currentCard = pokemonIds[i] - 1;
  displayFrontCard(i);
});

arrowRight.addEventListener("click", function () {
  currentCard = pokemonIds[i];
  displayFrontCard(i;
});


*/

displayPokemons();

function setBackgroundColor(type) {
  switch (type) {
    case "normal":
      backgroundCardColor = "#a1ffba";
      break;
    case "fighting":
      backgroundCardColor = "#ffafa1";
      break;
    case "flying":
      backgroundCardColor = "#a1f1ff";
      break;
    case "poison":
      backgroundCardColor = "#ffa1a1";
      break;
    case "ground":
      backgroundCardColor = "#deffa1";
      break;
    case "rock":
      backgroundCardColor = "#f7ffa1";
      break;
    case "bug":
      backgroundCardColor = "#cda1ff";
      break;
    case "ghost":
      backgroundCardColor = "#a1fff6";
      break;
    case "steel":
      backgroundCardColor = "#a1ceff";
      break;
    case "fire":
      backgroundCardColor = "#ffc0a1";
      break;
    case "water":
      backgroundCardColor = "#a1e3ff";
      break;
    case "grass":
      backgroundCardColor = "#a1ffb8";
      break;
    case "electric":
      backgroundCardColor = "#a1adff";
      break;
    case "psychic":
      backgroundCardColor = "#f7a1ff";
      break;
    case "ice":
      backgroundCardColor = "#a1fcff";
      break;
    case "dragon":
      backgroundCardColor = "#ffc0a1";
      break;
    case "dark":
      backgroundCardColor = "#ffb7a1";
      break;
    case "fairy":
      backgroundCardColor = "#a1ffc0";
      break;
    case "stellar":
      backgroundCardColor = "#dbffa1";
      break;
    case "unknown":
      backgroundCardColor = "#fffca1";
      break;
    default:
      backgroundCardColor = "#a1e7ff";
  }
}

function setColor1(type) {
  switch (type) {
    case "normal":
      color1 = "#a1ffba";
      break;
    case "fighting":
      color1 = "#ffafa1";
      break;
    case "flying":
      color1 = "#a1f1ff";
      break;
    case "poison":
      color1 = "#ffa1a1";
      break;
    case "ground":
      color1 = "#deffa1";
      break;
    case "rock":
      color1 = "#f7ffa1";
      break;
    case "bug":
      color1 = "#cda1ff";
      break;
    case "ghost":
      color1 = "#a1fff6";
      break;
    case "steel":
      color1 = "#a1ceff";
      break;
    case "fire":
      color1 = "#ffc0a1";
      break;
    case "water":
      color1 = "#a1e3ff";
      break;
    case "grass":
      color1 = "#a1ffb8";
      break;
    case "electric":
      color1 = "#a1adff";
      break;
    case "psychic":
      color1 = "#f7a1ff";
      break;
    case "ice":
      color1 = "#a1fcff";
      break;
    case "dragon":
      color1 = "#ffc0a1";
      break;
    case "dark":
      color1 = "#ffb7a1";
      break;
    case "fairy":
      color1 = "#a1ffc0";
      break;
    case "stellar":
      color1 = "#dbffa1";
      break;
    case "unknown":
      color1 = "#fffca1";
      break;
    default:
      color1 = "#a1e7ff";
  }
}

function setColor2(type) {
  switch (type) {
    case "normal":
      color2 = "#a1ffba";
      break;
    case "fighting":
      color2 = "#ffafa1";
      break;
    case "flying":
      color2 = "#a1f1ff";
      break;
    case "poison":
      color2 = "#ffa1a1";
      break;
    case "ground":
      color2 = "#deffa1";
      break;
    case "rock":
      color2 = "#f7ffa1";
      break;
    case "bug":
      color2 = "#cda1ff";
      break;
    case "ghost":
      color2 = "#a1fff6";
      break;
    case "steel":
      color2 = "#a1ceff";
      break;
    case "fire":
      color2 = "#ffc0a1";
      break;
    case "water":
      color2 = "#a1e3ff";
      break;
    case "grass":
      color2 = "#a1ffb8";
      break;
    case "electric":
      color2 = "#a1adff";
      break;
    case "psychic":
      color2 = "#f7a1ff";
      break;
    case "ice":
      color2 = "#a1fcff";
      break;
    case "dragon":
      color2 = "#ffc0a1";
      break;
    case "dark":
      color2 = "#ffb7a1";
      break;
    case "fairy":
      color2 = "#a1ffc0";
      break;
    case "stellar":
      color2 = "#dbffa1";
      break;
    case "unknown":
      color2 = "#fffca1";
      break;
    default:
      color2 = "#a1e7ff";
  }
}

function displayAbilities(abilities) {
  abilitiesString = "";
  abilities.forEach((item) => {
    abilitiesString += `${item.ability.name}<br>`;
  });
  return abilitiesString.trim();
}

/*
function switchStatTabs(i, id) {
  for (let i = 1; i < aboutTitle.length + 1; i++) {
    const aboutTab = aboutTitle[i];
    const baseTab = baseTitle[i];
    const aboutStats = aboutStatsContent[i];
    const baseStats = baseStatsContent[i];

    baseTab.addEventListener("click", function () {
      console.log("baseTab");
      displayBaseStats(aboutTab, baseTab, aboutStats, baseStats);
    });

    aboutTab.addEventListener("click", function () {
      console.log("aboutTab");
      displayAboutStats(aboutTab, baseTab, aboutStats, baseStats);
    });
  }
}
  */

function searchPokemons() {
  pokemonIdSearch = [];
  let elmnts = [];
  let elmntsFiltered = [];

  for (let i = 0; i < cardBackside.length; i++) {
    cardBackside[i].classList.remove("none");
  }

  let pokemonSearch = searchInput.value.toLowerCase().trim();
  let filteredPokemons = [];

  filteredPokemons = pokemonNames.filter((pokemon) => {
    pokemonIdSearch.push(pokemon.startsWith(pokemonSearch));

    for (let i = 0; i < cardBackside.length; i++) {
      cardBackside[i].classList.add("none");
      if (pokemonIdSearch[i]) {
        elmnts.push(i + 1);
      }
    }

    elmntsFiltered = [...new Set(elmnts)];

    elmntsFiltered.slice(0, 10).forEach((item) => {
      document.getElementById(`divBack${item}`).classList.remove("none");
    });
  });
}

searchImgContainer.addEventListener("click", function () {
  if (searchInput.value.length >= 3) {
    searchPokemons();
  }
});

searchInput.addEventListener("keyup", (event) => {
  if (
    event.which == 32 ||
    (event.which >= 48 && event.which <= 57) ||
    (event.which >= 96 && event.which <= 222)
  ) {
    event.preventDefault();
  }

  if (searchInput.value.length >= 3) {
    searchPokemons();
  }

  if (searchInput.value.length <= 3) {
    for (let i = 0; i < cardBackside.length; i++) {
      cardBackside[i].classList.remove("none");
    }
  }
});

async function pageBottom() {
  if (isRendering) {
    return;
  }

  isRendering = true;

  try {
    if (indexEnd != 905) {
      if (indexEnd <= 865) {
        indexStart = indexStart + 20;
        indexEnd = indexEnd + 20;

        displayLoading();
        await displayPokemons();
      } else {
        indexStart = indexStart + 20;
        indexEnd = 1016;

        displayLoading();
        await displayPokemons();
      }
    }
  } finally {
    hideLoading();
    isRendering = false;
  }
}

window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    pageBottom();
  }
});

function displayLoading() {
  const overlay = document.createElement("div");
  overlay.id = "loadingOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";

  const span = document.createElement("span");
  span.textContent = "Loading...";

  const img = document.createElement("img");
  img.src = "./images/pokeball.png";
  img.id = "loadingImg";
  overlay.appendChild(img);
  overlay.appendChild(span);
  document.body.appendChild(overlay);
}

function hideLoading() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    document.body.removeChild(overlay);
  }
}

function displayFrontCard(id) {
  arrowLeft.classList.remove("hidden");
  arrowRight.classList.remove("hidden");
  currentCard = id;
  if (!currentCard) {
    arrowLeft.classList.add("hidden");
  }

  if (currentCard > cardFrontsideContainer.length) {
    arrowRight.classList.add("hidden");
  }

  for (let i = 0; i < cardFrontsideContainer.length; i++) {
    cardFrontsideContainer[i].classList.add("none");
  }

  modal.classList.remove("none");
  document.getElementById(`divFrontContainer${id}`).classList.remove("none");
  document.body.style.overflowY = "hidden";
}

function leftCard() {
  arrowRight.classList.remove("hidden");
  if (!currentCard) {
    arrowLeft.classList.add("hidden");
  } else {
    arrowLeft.classList.remove("hidden");
  }

  for (let i = 0; i < cardFrontsideContainer.length; i++) {
    cardFrontsideContainer[i].classList.add("none");
  }

  document
    .getElementById(`divFrontContainer${currentCard - 1}`)
    .classList.remove("none");

  currentCard -= 1;
  console.log(currentCard);
}

function rightCard() {
  currentCard = Number(currentCard) + Number(1);

  arrowLeft.classList.remove("hidden");
  if (currentCard > cardFrontsideContainer.length - 2) {
    arrowRight.classList.add("hidden");
  } else {
    arrowRight.classList.remove("hidden");
  }

  for (let i = 0; i < cardFrontsideContainer.length; i++) {
    cardFrontsideContainer[i].classList.add("none");
  }

  document
    .getElementById(`divFrontContainer${currentCard}`)
    .classList.remove("none");

  currentCard = Number(currentCard) + Number(1);
}

arrowLeft.addEventListener("click", leftCard);
arrowRight.addEventListener("click", rightCard);
