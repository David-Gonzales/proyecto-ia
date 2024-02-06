const mapa = document.getElementById('mapa');
const map = L.map(mapa).setView([-6.7715769944306885, -79.83870854313238], 14);
const modalRegistro = document.querySelector("#modalCrearPunto");
const btnAceptarModal = document.getElementById('btnAceptarModal');
const inputNombreModal = document.getElementById('inputNombreModal');
const mensajeError = document.getElementById('mensajeError');
const myModal = new bootstrap.Modal(modalRegistro);
const btnCalcularRuta = document.getElementById("calcularRuta");
const btnNuevaRuta = document.getElementById("nuevaRuta");

btnCalcularRuta.disabled = true;
btnNuevaRuta.disabled = true;

let listaRutas = [];
let puntos = [];
let puntoActual;
let linea; 
let marcadores = [];

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click',(e) => {
    this.puntoActual = e.latlng;
    puntos.push(this.puntoActual)
    mensajeError.className = 'text-danger d-none';
    inputNombreModal.value = '';
    myModal.show();
})

btnAceptarModal.addEventListener('click', () =>{
    let nombre = inputNombreModal.value;
    if(nombre == '') {
        mensajeError.className = 'text-danger d-block';
        return
    }

    myModal.hide();
    listaRutas.push(
        {
            nombre: nombre,
            punto: this.puntoActual
        }
    );
    marcadores.push(L.marker([this.latitudSeleccionada, this.longitudSeleccionada]).addTo(map).bindPopup(nombre).openPopup());
    if(listaRutas.length >= 2)
    {
        btnCalcularRuta.disabled = false;
    }
})

function generarMatrizDeDistancias(puntos) {
    const numPuntos = puntos.length;
    const matrizDistancias = Array.from({ length: numPuntos }, () => Array(numPuntos).fill(0));

    for (let i = 0; i < puntos.length; i++) {
        for (let j = 0; j < puntos.length; j++) {
            if (i !== j) {
                const distancia = map.distance(puntos[i], puntos[j]);
                matrizDistancias[i][j] = distancia;
            }
        }
    }
    return matrizDistancias;
}

btnCalcularRuta.addEventListener("click", () => {
 
    if(listaRutas.length < 2)
    {
      return
    }
  
    let matrizDistancias = generarMatrizDeDistancias(puntos);
  
    fetch("/calcularRuta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matrizDistancias),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(
                `La solicitud no fue exitosa. Código de estado: ${response.status}`
            );
        }
        return response.json();
    })
    .then((data) => {
        let puntosRespuesta = [];
        
        data.lista.forEach(element => {
            puntosRespuesta.push(listaRutas[element].punto)
        });

        puntosRespuesta.push(listaRutas[data.lista[0]].punto);
        linea = L.polyline(puntosRespuesta, {
                    color: 'red'
                });
        linea.addTo(map);
        btnNuevaRuta.disabled = false;
    })
    .catch((error) => {
        console.error("Error en la petición:", error.message);
    });
});

btnNuevaRuta.addEventListener("click", () => {
    btnNuevaRuta.disabled = true;
    btnCalcularRuta.disabled = true;
    listaRutas = [];
    puntos = [];
    map.removeLayer(linea);
    linea = null;
    marcadores.forEach(function(marcador) {
        map.removeLayer(marcador);
    });
});



