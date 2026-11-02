// ---------- PET LIST (what the shop sells) ----------
const PET_CATALOG = [
  { id: "hawk",   role: "Hunter", name: "Hawk",   emoji: "🦅", price: 0 },
  { id: "wolf",   role: "Hunter", name: "Wolf",   emoji: "🐺", price: 100 },
  { id: "owl",    role: "Hunter", name: "Owl",    emoji: "🦉", price: 150 },
  { id: "dragon", role: "Hunter", name: "Dragon", emoji: "🐲", price: 300 },

  { id: "fox",    role: "Hider",  name: "Fox",    emoji: "🦊", price: 0 },
  { id: "cat",    role: "Hider",  name: "Cat",    emoji: "🐱", price: 100 },
  { id: "rabbit", role: "Hider",  name: "Rabbit", emoji: "🐰", price: 150 },
  { id: "ghost",  role: "Hider",  name: "Ghost",  emoji: "👻", price: 300 }
];

// look for each level: size, glow color, accessory
const PET_LEVELS = [
  { size: 40, glow: "#888888", extra: "" },
  { size: 52, glow: "#4cff8a", extra: "🎀" },
  { size: 64, glow: "#4cc3ff", extra: "🕶️" },
  { size: 76, glow: "#ffd54c", extra: "👑" },
  { size: 90, glow: "#ff4cf0", extra: "🔥" }
];

// ---------- SAVE / LOAD (stored on this device) ----------
function loadPets() {
  try {
    const saved = JSON.parse(localStorage.getItem("petData2"));
    if (saved) return saved;
  } catch (e) {}
  return {
    coins: 50,
    owned: { hawk: 1, fox: 1 },                    // pet id -> level
    equipped: { Hunter: "hawk", Hider: "fox" }     // pet used in the game
  };
}

let petData = loadPets();

function savePets() {
  try { localStorage.setItem("petData2", JSON.stringify(petData)); } catch (e) {}
}

// ---------- ABILITIES ----------
function hunterHintRadius(level) { return 300 - (level - 1) * 50; }
function hiderWarnRange(level)   { return 50 + (level - 1) * 25; }

// ---------- UPGRADE ----------
function upgradeCost(level) { return level * 20; }

function upgradePet(role) {
  const id = petData.equipped[role];
  const level = petData.owned[id];
  if (level >= PET_LEVELS.length) { alert("Max level!"); return; }
  const cost = upgradeCost(level);
  if (petData.coins < cost) { alert("Need " + cost + " coins"); return; }
  petData.coins -= cost;
  petData.owned[id] = level + 1;
  savePets();
  renderPet(role);
}

// ---------- DRAW THE PET ----------
function renderPet(role) {
  const box = document.getElementById("petBox");
  const pet = PET_CATALOG.find(p => p.id === petData.equipped[role]);
  const level = petData.owned[pet.id];
  const look = PET_LEVELS[level - 1];

  const stat = (role === "Hunter")
    ? hunterHintRadius(level) + " m hint circle"
    : hiderWarnRange(level) + " m warning range";

  const nextCost = level < PET_LEVELS.length ? upgradeCost(level) + " coins" : "MAX";

  box.innerHTML =
    '<div class="pet" style="font-size:' + look.size + 'px; text-shadow:0 0 18px ' + look.glow + ';">' +
      pet.emoji + '<span class="extra">' + look.extra + '</span>' +
    '</div>' +
    '<div class="petInfo">' +
      '<b>' + pet.name + '</b> · Level ' + level + '<br>' +
      stat + '<br>' +
      '🪙 ' + petData.coins + '<br>' +
      '<button onclick="upgradePet(\'' + role + '\')">Upgrade (' + nextCost + ')</button>' +
    '</div>';
}
