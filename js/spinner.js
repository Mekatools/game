function startSpin() {
  if (players.length < 2) { alert("Need at least 2 players"); return; }
  if (!players.every(p => p.ready)) { alert("Everyone must tap ready"); return; }

  const spinner = document.getElementById("spinner");
  const hiderIndex = Math.floor(Math.random() * players.length);
  let ticks = 0;

  const timer = setInterval(() => {
    spinner.textContent = players[Math.floor(Math.random() * players.length)].name;
    ticks++;
    if (ticks > 20) {
      clearInterval(timer);
      spinner.textContent = "Hider: " + players[hiderIndex].name + " 🫥";
      players.forEach((p, i) => p.role = (i === hiderIndex) ? "Hider" : "Hunter");
      setTimeout(() => showGame(players[0]), 1500);
    }
  }, 100);
}
