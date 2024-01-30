const mapa = document.getElementById('mapa');


const map = L.map(mapa).setView([-6.7715769944306885, -79.83870854313238], 30);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
