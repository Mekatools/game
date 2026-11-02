let players = [];   // each: { name, ready }
let roomCode = "";

function makeCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 4; i++) code += letters[Math.floor(Math.random() * letters.length)];
  return code;
}

function createRoom() {
  roomCode = makeCode();
  players = [];
  const myName = loadProfile().name;
  if (myName) players.push({ name: myName, ready: false });
  document.getElementById("roomCode").textContent = roomCode;
  document.getElementById("spinner").textContent = "";
  renderPlayers();
  showScreen("lobby");
}

function joinRoom() {
  const code = document.getElementById("joinCode").value.trim().toUpperCase();
  const name = document.getElementById("joinName").value.trim();
  if (!code || !name) { alert("Enter the room code and your name"); return; }
  if (code !== roomCode) { alert("Room not found. Online rooms come with the server step."); return; }
  players.push({ name: name, ready: false });
  renderPlayers();
  showScreen("lobby");
}

function addPlayer() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return;
  players.push({ name: name, ready: false });
  input.value = "";
  renderPlayers();
}

function toggleReady(i) {
  players[i].ready = !players[i].ready;
  renderPlayers();
}

function renderPlayers() {
  const list = document.getElementById("playerList");
  list.innerHTML = "";
  players.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = p.name + " ";
    const btn = document.createElement("button");
    btn.textContent = p.ready ? "Ready ✔" : "Tap ready";
    if (p.ready) btn.className = "ready";
    btn.onclick = () => toggleReady(i);
    li.appendChild(btn);
    list.appendChild(li);
  });
}
