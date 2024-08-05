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

// CÓDIGO FUNCIONAL

const totalPairs = 8;
const iconList = [];

let currentCardIcon = "";
let tInit = Date.now();
let cardsFlipped = [];

let currentCardBack = [];
let indexCurrentCard = -1;
let attemptsTried = 0;
let pairsFound = 0;

const cards = document.querySelectorAll(".card");
const name = document.querySelectorAll(".name");
const score = document.querySelector(".score");
console.log(score);
//const iconList = ["🤩", "🤭", "😂v"]; //@@@

/** @@@ borrar tras meter los iconos a mano */
for (let i = 0; i < totalPairs; i++) {
  iconList.push(i);
}
/** @@@ borrar tras meter los iconos a mano */

let finalIconList = [];
finalIconList = iconList.concat(iconList).sort(() => Math.random() - 0.5);
console.log(finalIconList);
const backs = document.querySelectorAll(".back");
backs.forEach((back, index) => (back.textContent = finalIconList[index]));

/**volteo de cartas */
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
      cardsFlipped = []; //vaciamos el array de intentos, para que no se tenga en ccuenta en futuros flipCards
      pairsFound++;
      if (pairsFound === totalPairs) {
        setTimeout(() => {
          alert("You Win");
        }, 500);
      }
    } else {
      // si no fue exitoso
      flipCards();
    }
    //haya sido exitoso o no, reiniciamos las cartas a comparar, y la matriz de cards flipped
    currentCardIcon = "";
    score.textContent = `Hi ${name.textContent
      }, your score is ${attemptsTried} in ${parseInt(
        (Date.now() - tInit) / 1000
      )} sec`;
  }
};

for (const card of cards) {
  card.addEventListener("click", reveal);
}

function flipCards() {
  setTimeout(() => {
    cardsFlipped.forEach((currentCard) => {
      currentCard.classList.remove("flipped");
      cardsFlipped = [];
    });
  }, 1000);
}

////////////////////

// AUDIO

// Volumen de audio de fondo por defecto
const audio = document.querySelector("#theme");
audio.volume = 0.5;

// Voltear las cartas
const cardFront = document.querySelectorAll(".card");

function flipCard_sfx() {
  const sound = new Audio("sfx/flip-card.ogg");
  sound.play();
}
//addEventListener("click", flipCard_sfx);
