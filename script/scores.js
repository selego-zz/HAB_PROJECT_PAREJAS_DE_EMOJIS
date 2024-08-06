"use strict"
import { getFormattedTime } from "./helper.js"

const defaultScoreTableCard = [
  {
    name: "The Boss",
    score: 100,
    time: 997 * 59 * 21,//en milisegundos
  },
  {
    name: "Maki",
    score: 200,
    time: 1010 * 60 * 40,//en milisegundos
  },
  {
    name: "Cerecita",
    score: 400,
    time: 1001 * 60 * 58,//en milisegundos
  },
  {
    name: "undefined",
    score: 800,
    time: 999 * 60 * 60,//en milisegundos
  },
  {
    name: "Abuelito",
    score: 1600,
    time: 1000 * 50 * 37,//en milisegundos
  },
  {
    name: "tu",
    score: 3200,
    time: 1000 * 61 * 65,//en milisegundos
  },
  {
    name: "yo",
    score: 6400,
    time: 1000 * 60 * 15,//en milisegundos
  },
  {
    name: "Mejor que el Mejor",
    score: 12800,
    time: 1000 * 62 * 30,//en milisegundos
  },
  {
    name: "Pareando",
    score: 25600,
    time: 1000 * 60 * 60 * 1,//en milisegundos
  },
  {
    name: "El Mejor",
    score: 1000000,
    time: 1000 * 60 * 60 * 20,//en milisegundos
  },
]

/////////////////////////////////////////////////
class Scores {
  constructor(tableSelector, cards = 16) {
    this._tableSelector = tableSelector;
    this.load(cards);
  }

  load(cards) {
    this._cards = cards;
    this._scoreTable = JSON.parse(localStorage.getItem(`${this._cards}_Cards`));
    if (this._scoreTable) {
      // carga completa
      this.showTable();
      return;
    };

    this._scoreTable = defaultScoreTableCard;
    this.save();
  };

  save() {
    localStorage.setItem(`${this._cards}_Cards`, JSON.stringify(this._scoreTable))
    this.showTable();
  };

  add(playerName, playerScore, playerTime) { // solo se puede grabar para el número de cartas para el que está cargada  

    //primero comprobamos que está entre los 10 mejores resultados
    if (this._scoreTable[this._scoreTable.length - 1].score < playerScore) return;
    this._scoreTable.push({ name: playerName, score: playerScore, time: playerTime });
    this._scoreTable.sort((a, b) => a.score - b.score).pop();
    this.save();
  }
  showTable() {
    const tableChildren = this._tableSelector.querySelectorAll(".scoreFile");
    // todos sus children son TR. el primero es la cabecera, el resto son las filas
    tableChildren.forEach((row, index) => {
      const rowChildren = row.childNodes;
      rowChildren[0].textContent = index + 1;
      rowChildren[1].textContent = this._scoreTable[index].name;
      rowChildren[2].textContent = this._scoreTable[index].score;
      rowChildren[3].textContent = getFormattedTime(this._scoreTable[index].time);
    }
    );
  }
}

export { Scores };