let map, myMarker;

function showGame(me) {
  document.getElementById("lobby").classList.remove("active");
  document.getElementById("game").classList.add("active");
  document.getElementById("hud").textContent = me.name + " is a " + me.role;

  map = L.map("map").setView([19.076, 72.8777], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  if (!navigator.geolocation) { alert("No GPS support"); return; }

  navigator.geolocation.watchPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    if (!myMarker) {
      myMarker = L.marker([lat, lng]).addTo(map);
      map.setView([lat, lng], 17);
    } else {
      myMarker.setLatLng([lat, lng]);
    }
  }, err => alert("GPS error: " + err.message),
  { enableHighAccuracy: true });
}
