const mapa = document.getElementById('mapa');
const map = L.map(mapa).setView([-6.7715769944306885, -79.83870854313238], 14);
const origen = document.getElementById('origen');
const destino = document.getElementById('destino');
const modalRegistro = document.querySelector("#modalCrearPunto");
const btnAceptarModal = document.getElementById('btnAceptarModal');
const inputNombreModal = document.getElementById('inputNombreModal');
const mensajeError = document.getElementById('mensajeError');
const myModal = new bootstrap.Modal(modalRegistro);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const getData = async () => {

    let listaRutas = [];
    let latitudSeleccionada;
    let longitudSeleccionada;

    const estiloCirculo = customizedMarkerStyle('#FF7800');

    function customizedMarkerStyle(fillColor) {
        return{
            radius: 9,
            fillColor,
            color: 'black',
            weight: 1.2,
            opacity: 1,
            fillOpacity: 0.8
        }
    }

    map.on('click',(e) => {
        this.latitudSeleccionada = e.latlng.lat;
        this.longitudSeleccionada = e.latlng.lng; 
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
                latitud: this.latitudSeleccionada,
                longitud: this.longitudSeleccionada,
                nombre: nombre,
                distancia: 5
            }
        );
        L.marker([this.latitudSeleccionada, this.longitudSeleccionada]).addTo(map).bindPopup(nombre).openPopup();
    })

    /*
    //Estilos para círculo
    L.geoJson(lista, {
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, estiloCirculo);
        }
    }).addTo(map)
    */
    // origen.addEventListener('change', (e) =>{
    //     if(e.target.value == 1){
    //         L.geoJson(lista)
    //         .addTo(map)
    //     }
    // })
}

getData();