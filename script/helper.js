"use strict"

function getFormattedTime(miliseconds) {
  let time = ""
  let auxTime = 0;
  // milisegundos
  time = (+miliseconds % 1000)
  // segundos
  if ((auxTime = parseInt(miliseconds / 1000)) === 0) return time;
  time = (auxTime % 60) + "." + time;
  if (auxTime % 60 < 10) time = "0" + time;
  //minutos
  if ((auxTime = parseInt(auxTime / 60)) === 0) return time;
  time = (auxTime % 60) + ":" + time;
  if (auxTime % 60 < 10) time = "0" + time;
  //horas
  if ((auxTime = parseInt(auxTime / 60)) === 0) return time;
  time = auxTime + ":" + time;
  return time;
}


export { getFormattedTime };