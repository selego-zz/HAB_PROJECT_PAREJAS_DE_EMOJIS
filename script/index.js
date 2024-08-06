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
import { animals, mountain, sea, spring, universe } from "./icons.js";

//variables que se usarán
const totalPairs = 8;

//sobre el tiempo y la puntuación
let tInit = Date.now();
let attemptsTried = 0;

//sobre los iconos
let iconList = [];
let currentCardIcon = "";
let finalIconList = [];

//sobre las cartas,
let cardsFlipped = [];
let currentCardBack = [];
let indexCurrentCard = -1;
let pairsFound = 0;

//tomamos los selectores para modificar el html
////de las cartas
const cards = document.querySelectorAll(".card");
const fronts = document.querySelectorAll(".front");
const backs = document.querySelectorAll(".back");
////para la puntuación
const name = document.querySelector(".name");
const score = document.querySelector(".score");
const scoreSection = document.querySelector(".scoreTable");

/*******************************************\
 **********establecemos los iconos**********
\*******************************************/
let frontIcon;
const selectTheme = document.querySelector("select");
selectTheme.addEventListener("change", function (e) {
  switch (selectTheme.value) {
    case "mountain":
      iconList = mountain.back;
      frontIcon = mountain.front;
      break;
    case "spring":
      iconList = spring.back;
      frontIcon = spring.front;
      break;
    case "universe":
      iconList = universe.back;
      frontIcon = universe.front;
      break;
    case "animals":
      iconList = animals.back;
      frontIcon = animals.front;
      break;
    default:
    case "sea":
      iconList = sea.back;
      frontIcon = sea.front;
      break;
  }
});

finalIconList = iconList.concat(iconList).sort(() => Math.random() - 0.5);

backs.forEach((back, index) => (back.textContent = finalIconList[index]));
fronts.forEach((front, index) => (front.textContent = frontIcon));

/*******************************************\
 **********establecemos los iconos**********
\*******************************************/

/*******************************************\
 ***establecemos la tabla de puntuaciones***
\*******************************************/
//console.log(scoreSection);
const scoreTable = new Scores(scoreSection, totalPairs * 2);

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
    score.textContent = `Hi ${
      name.value
    }, your score is ${attemptsTried} in ${getFormattedTime(
      Date.now() - tInit
    )}`;
  }
};

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
