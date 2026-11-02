// ---------- PET DATA ----------
const PET_TYPES = {
  Hunter: { name: "Hawk", emoji: "🦅", ability: "Hint circle size" },
  Hider:  { name: "Fox",  emoji: "🦊", ability: "Hunter warning range" }
};

// look for each level: size, glow color, accessory
const PET_LEVELS = [
  { size: 40, glow: "#888888", extra: "" },     // level 1
  { size: 52, glow: "#4cff8a", extra: "🎀" },   // level 2
  { size: 64, glow: "#4cc3ff", extra: "🕶️" },  // level 3
  { size: 76, glow: "#ffd54c", extra: "👑" },   // level 4
  { size: 90, glow: "#ff4cf0", extra: "🔥" }    // level 5 (max)
];

// ---------- SAVE / LOAD (stored on this device) ----------
function loadPets() {
  try {
    const saved = JSON.parse(localStorage.getItem("petData"));
    if (saved) return saved;
  } catch (e) {}
  return { coins: 50, Hunter: 1, Hider: 1 };   // start: 50 coins, level 1
}

let petData = loadPets();

function savePets() {
  try { localStorage.setItem("petData", JSON.stringify(petData)); } catch (e) {}
}

// ---------- ABILITIES ----------
function hunterHintRadius(level) { return 300 - (level - 1) * 50; }   // meters, smaller = better hint
function hiderWarnRange(level)   { return 50 + (level - 1) * 25; }    // meters

// ---------- UPGRADE ----------
function upgradeCost(level) { return level * 20; }

function upgradePet(role) {
  const level = petData[role];
  if (level >= PET_LEVELS.length) { alert("Max level!"); return; }
  const cost = upgradeCost(level);
  if (petData.coins < cost) { alert("Need " + cost + " coins"); return; }
  petData.coins -= cost;
  petData[role] = level + 1;
  savePets();
  renderPet(role);
}

// ---------- DRAW THE PET ----------
function renderPet(role) {
  const box = document.getElementById("petBox");
  const type = PET_TYPES[role];
  const level = petData[role];
  const look = PET_LEVELS[level - 1];

  const stat = (role === "Hunter")
    ? hunterHintRadius(level) + " m hint circle"
    : hiderWarnRange(level) + " m warning range";

  const nextCost = level < PET_LEVELS.length ? upgradeCost(level) + " coins" : "MAX";

  box.innerHTML =
    '<div class="pet" style="font-size:' + look.size + 'px; text-shadow:0 0 18px ' + look.glow + ';">' +
      type.emoji + '<span class="extra">' + look.extra + '</span>' +
    '</div>' +
    '<div class="petInfo">' +
      '<b>' + type.name + '</b> · Level ' + level + '<br>' +
      stat + '<br>' +
      '🪙 ' + petData.coins + '<br>' +
      '<button onclick="upgradePet(\'' + role + '\')">Upgrade (' + nextCost + ')</button>' +
    '</div>';
}
