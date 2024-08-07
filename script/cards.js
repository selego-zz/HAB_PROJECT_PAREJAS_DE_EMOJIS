function insertCard(table) {
  /* 
    <section class="card">
      <div class="content">
        <div class="front">🌊</div>
        <div class="back">🪼</div>
      </div>
    </section>
   */

  const cardSection = document.createElement("section");
  cardSection.classList.value = "card";

  const cardDiv = document.createElement("div");
  cardDiv.classList.value = "content";

  const cardFrontDiv = document.createElement("div");
  cardFrontDiv.classList.value = "front";
  cardFrontDiv.textContent = "";

  const cardBackDiv = document.createElement("div");
  cardBackDiv.classList.value = "back";
  cardBackDiv.textContent = "";

  cardSection.appendChild(cardDiv)
  cardDiv.appendChild(cardFrontDiv);
  cardDiv.appendChild(cardBackDiv);

  table.appendChild(cardSection);
}

export { insertCard, }