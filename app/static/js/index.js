const mapa = document.getElementById('mapa');

const map = L.map(mapa).setView([-6.7715769944306885, -79.83870854313238], 30);

const origen = document.getElementById('origen');

const destino = document.getElementById('destino');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const getData = async () => {

    // var archivo = new URL ('map.json', import.meta.url).pathname;
    // console.log(archivo);

    const response = await fetch('../static/js/map.json');
    console.log(response);
    const data = await response.json();
    console.log(data);
    listaOrigen = data.features;
    listaDestino = data.features;

    console.log("Lista Origen: ");
    console.log(listaOrigen);
    console.log("");

    console.log("Lista Destino: ");
    console.log(listaDestino);

}

getData();