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

// Volumen de audio por defecto
const audio = document.querySelector("#theme");
audio.volume = 0.5;


const cards = document.querySelectorAll(".card");

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");

  setTimeout(() => {
    currentCard.classList.remove("flipped");
  }, 1000);
};

for (const card of cards) {
  card.addEventListener("click", reveal);
}