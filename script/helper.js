"use strict"

function getFormattedTime(miliseconds) {
  let time = ""
  let auxTime = 0;
  // milisegundos
  time = (+miliseconds % 1000)
  // segundos
  if ((auxTime = miliseconds / 1000) === 0) return time;
  time = (auxTime % 60) + "." + time;
  //minutos
  if ((auxTime = auxTime / 60) === 0) return time;
  time = (auxTime % 60) + ":" + time;
  //horas
  if ((auxTime = auxTime / 60) === 0) return time;
  time = auxTime + ":" + time;
  return time;
}


export { getFormattedTime };