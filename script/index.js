"use strict";

/**
 * Parejas de Emoji
 * Juego memoria donde se muestran 16 parejas de cartas
 * tapadas que se pueden destapar de dos en dos hasta
 * revelar todas.
 * Descripción
 * ● El juego debe mostrar 16 cartas correspondientes a 8 parejas de
 * cartas con un icono de un emoji cada una.
 * ● Las cartas inicialmente están “tapadas”, solo se ve un cuadrado gris.
 * ● Se puede hacer clic en 2 cartas y se revelará el emoji que contienen.
 * ● Si las 2 cartas tienen el mismo emoji se mantienen destapadas, en
 * caso contrario se vuelven a ocultar después de 1 segundo.
 * ● Se sigue jugando destapando cartas de 2 en dos hasta que todas las
 * parejas estén reveladas.
 * ● El juego debe llevar la cuenta de los intentos realizados.
 * ● El resultado final es el número de intentos realizados. Cuando
 * menor sea esa puntuación (como mínimo puede ser 8) mejor.
 *
 * Recursos:
 * https://getemoji.com/
 *
 * Procesamiento de cartas
 * https://codepen.io/bertez/pen/oNoryxg
 */

//importaciones para el código
import { getFormattedTime } from "./helper.js";
import { Scores } from "./scores.js";
import { insertCard } from "./cards.js";
import { animals, mountain, sea, spring, universe } from "./icons.js";

//variables que se usarán
let totalPairs = 8;

//sobre el tiempo y la puntuación
let tInit = Date.now();
let attemptsTried = 0;

//sobre los iconos
let currentCardIcon = "";
let finalIconList = [];
let icon;

//sobre las cartas,
let cardsFlipped = [];
let currentCardBack = [];
let indexCurrentCard = -1;
let pairsFound = 0;

//tomamos los selectores para modificar el html
////de las cartas // al cambiar el layout habrá que retomarlos, así que será diferente
const table = document.querySelector(".table");
let cards = document.querySelectorAll(".card");
let fronts = document.querySelectorAll(".front");
let backs = document.querySelectorAll(".back");
////para la puntuación
const name = document.querySelector(".name");
const score = document.querySelector(".score");
const scoreSection = document.querySelector(".scoreTable");
const initButton = document.querySelector("#reset");
const selectTheme = document.querySelector("#themes");
const selectLayout = document.querySelector("#layout");

selectLayout.value = "4x4";
reset();

/*******************************************\
 **************Inicio de juego**************
\*******************************************/
initButton.addEventListener("click", () => {
  reset();
});

function reset(resetTimeout = 500) {
  //sobre el tiempo y la puntuación
  tInit = Date.now();
  attemptsTried = 0;

  //sobre los iconos
  currentCardIcon = "";
  finalIconList = [];

  //sobre las cartas,
  cardsFlipped = [];
  currentCardBack = [];
  indexCurrentCard = -1;
  pairsFound = 0;

  if (name.value.length < 1) name.value = "Anonymous"
  score.textContent = "";

  switch (selectTheme.value) {
    case "mountain":
      icon = mountain;
      break;
    case "spring":
      icon = spring;
      break;
    case "universe":
      icon = universe;
      break;
    case "animals":
      icon = animals;
      break;
    default:
    case "sea":
      icon = sea;
      break;
  }
  flipAllCards();

  //  icon.back.sort(() => Math.random() - 0.5);
  icon.back = icon.back.slice(0, totalPairs);

  finalIconList = icon.back.concat(icon.back).sort(() => Math.random() - 0.5);


  setTimeout(() => {
    backs.forEach((back, index) => {
      back.textContent = finalIconList[index];
      back.style.cssText = icon.backColor;
    });
    fronts.forEach((front) => {
      front.textContent = icon.front;
      front.style.cssText = icon.frontColor;
    });
  }, resetTimeout);
}

/*******************************************\
 *************cambiamos layout**************
\*******************************************/
selectLayout.addEventListener("change", () => changeLayout());

function changeLayout() {
  const hCards = selectLayout.value[0];
  const vCards = selectLayout.value[2];

  cards.forEach(card => card.remove());
  totalPairs = hCards * vCards / 2;
  scoreTable = new Scores(scoreSection, totalPairs * 2);
  table.style.cssText = `grid-template-columns: repeat(${hCards}, minmax(100px, 1fr));`

  for (let i = 0; i < totalPairs; i++) {
    insertCard(table);
    insertCard(table);//2, por que son una pareja
  }

  cards = document.querySelectorAll(".card");//variable, por que pueden cambiar al cambiar la mesa
  fronts = document.querySelectorAll(".front");
  backs = document.querySelectorAll(".back");
  // tras un click - Revelamos
  for (const card of cards) {
    card.addEventListener("click", reveal);
  }

  reset(0);

}
/*******************************************\
 *************cambiamos layout**************
\*******************************************/


/*******************************************\
 **********establecemos los iconos**********
\*******************************************/
selectTheme.addEventListener("change", () => reset());
/*******************************************\
 **********establecemos los iconos**********
\*******************************************/

/*******************************************\
 ***establecemos la tabla de puntuaciones***
\*******************************************/
//ojo: la cambiamos al cambiar el layout
let scoreTable = new Scores(scoreSection, totalPairs * 2);

/*******************************************\
 ***establecemos la tabla de puntuaciones***
\*******************************************/

/*******************************************\
 *************volteo de cartas *************
\*******************************************/
//al pulsar una carta
const reveal = (e) => {
  if (cardsFlipped.length == 2) return;
  if (e.currentTarget.classList.contains("flipped")) return;
  flipCard_sfx();
  //guardamos la carta en la matriz de cartas dadas la vuelta
  cardsFlipped[cardsFlipped.length] = e.currentTarget;

  cardsFlipped[cardsFlipped.length - 1].classList.add("flipped");

  //tomamos la imaguen de la carta para comparar
  currentCardBack[++indexCurrentCard] =
    cardsFlipped[cardsFlipped.length - 1].querySelector(".back");

  //si no habíamos dado la vuelta a ninguna carta
  if (currentCardIcon.length < 1) {
    //guardamos el valor de la carta parra comparar luego
    currentCardIcon = currentCardBack[indexCurrentCard].textContent;
    console.log(
      "No había cartas: damos la vuelta a la primera " + currentCardIcon
    );
  } else {
    //su ta habíamos dado la vuelta a cartas
    attemptsTried++; //sube el contador de intentos
    console.log(
      `Pareja de cartas ${currentCardIcon} Vs ${currentCardBack[indexCurrentCard].textContent}`
    );

    //comparamos para ver si fue exitoso o no
    if (currentCardIcon === currentCardBack[indexCurrentCard].textContent) {
      //si encontramos la pareja
      setTimeout(() => pairFound_sfx(), 600);
      cardsFlipped = []; //vaciamos el array de intentos, para que no se tenga en ccuenta en futuros flipCards
      pairsFound++;
      if (pairsFound === totalPairs) {
        allClear_sfx();
        scoreTable.add(name.value, attemptsTried, Date.now() - tInit);
        setTimeout(() => {
          alert("You Win");
        }, 500);
      }
    } else {
      // si no fue exitoso
      flipCards();
      setTimeout(() => miss_sfx(), 700);
    }
    //haya sido exitoso o no, reiniciamos las cartas a comparar, y la matriz de cards flipped
    currentCardIcon = "";
    score.textContent = `Hi ${name.value
      }, your score is ${attemptsTried} in ${getFormattedTime(
        Date.now() - tInit
      )}`;
  }
};

function flipAllCards() {
  for (const card of cards) {
    card.classList.remove("flipped");
  }
}
// tras un click - Revelamos
for (const card of cards) {
  card.addEventListener("click", reveal);
}

// si no son pareja, tras 1 segundo - ocultamos
function flipCards() {
  setTimeout(() => {
    cardsFlipped.forEach((currentCard) => {
      currentCard.classList.remove("flipped");
      cardsFlipped = [];
    });
  }, 1000);
}
/*******************************************\
 *************volteo de cartas *************
\*******************************************/

// AUDIO

// Volumen de audio de fondo por defecto
const audioBackground = document.querySelector("#theme");
audioBackground.volume = 0.5;

// Efectos de sonido

function flipCard_sfx() {
  const sound = new Audio("sfx/flip-card.ogg");
  sound.volume = 0.5;
  sound.play();
}

function pairFound_sfx() {
  const sound = new Audio("sfx/correct.ogg");
  sound.volume = 0.2;
  sound.play();
}

function miss_sfx() {
  const sound = new Audio("sfx/miss.ogg");
  sound.volume = 0.5;
  sound.play();
}

function allClear_sfx() {
  const sound = new Audio("sfx/allclear.ogg");
  sound.volume = 0.5;
  audioBackground.pause();
  sound.play();
}

// Iconos de audio

const audio = document.querySelector("audio");

const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

playButton.addEventListener("click", () => {
  audioBackground.play();
});

pauseButton.addEventListener("click", () => {
  audioBackground.pause();
});

console.log(playButton);
