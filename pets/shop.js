function openShop() {
  renderShop();
  showScreen("shop");
}

function renderShop() {
  document.getElementById("shopCoins").textContent = "🪙 " + petData.coins;
  const list = document.getElementById("shopList");
  list.innerHTML = "";

  ["Hunter", "Hider"].forEach(role => {
    const heading = document.createElement("h3");
    heading.textContent = role + " pets";
    list.appendChild(heading);

    PET_CATALOG.filter(p => p.role === role).forEach(p => {
      const level = petData.owned[p.id];
      const isEquipped = petData.equipped[role] === p.id;

      let buttonHtml;
      if (!level) {
        buttonHtml = '<button onclick="buyPet(\'' + p.id + '\')">Buy 🪙' + p.price + '</button>';
      } else if (isEquipped) {
        buttonHtml = '<button class="equipped">Equipped ✔</button>';
      } else {
        buttonHtml = '<button onclick="equipPet(\'' + p.id + '\')">Equip</button>';
      }

      const card = document.createElement("div");
      card.className = "shopCard";
      card.innerHTML =
        '<div class="shopEmoji">' + p.emoji + '</div>' +
        '<div class="shopText"><b>' + p.name + '</b><br>' +
        (level ? 'Level ' + level : 'Not owned') + '</div>' +
        buttonHtml;
      list.appendChild(card);
    });
  });
}

function buyPet(id) {
  const pet = PET_CATALOG.find(p => p.id === id);
  if (petData.coins < pet.price) { alert("Not enough coins"); return; }
  petData.coins -= pet.price;
  petData.owned[id] = 1;
  savePets();
  renderShop();
}

function equipPet(id) {
  const pet = PET_CATALOG.find(p => p.id === id);
  petData.equipped[pet.role] = id;
  savePets();
  renderShop();
}

// only for testing, delete this button later
function addTestCoins() {
  petData.coins += 100;
  savePets();
  renderShop();
}
