let players = [];   // each: { name, ready }

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
