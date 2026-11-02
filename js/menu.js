// ---------- SCREEN SWITCHING ----------
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (id === "menu") refreshMenu();
}

// ---------- PROFILE (saved on this device) ----------
function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) return saved;
  } catch (e) {}
  return { name: "" };
}

function saveProfile() {
  const name = document.getElementById("profileName").value.trim();
  try { localStorage.setItem("profile", JSON.stringify({ name: name })); } catch (e) {}
  openProfile();
}

function refreshMenu() {
  const name = loadProfile().name || "Player";
  document.getElementById("menuCoins").textContent = "👤 " + name + "   🪙 " + petData.coins;
}

function openProfile() {
  const p = loadProfile();
  document.getElementById("profileName").value = p.name;

  const hunter = PET_CATALOG.find(x => x.id === petData.equipped.Hunter);
  const hider  = PET_CATALOG.find(x => x.id === petData.equipped.Hider);
  const ownedCount = Object.keys(petData.owned).length;

  document.getElementById("profileInfo").innerHTML =
    "🪙 Coins: " + petData.coins + "<br>" +
    "Hunter pet: " + hunter.emoji + " " + hunter.name + " (Lv " + petData.owned[hunter.id] + ")<br>" +
    "Hider pet: " + hider.emoji + " " + hider.name + " (Lv " + petData.owned[hider.id] + ")<br>" +
    "Pets owned: " + ownedCount;

  showScreen("profile");
}

window.addEventListener("load", refreshMenu);
