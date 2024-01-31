const mapa = document.getElementById('mapa');

const map = L.map(mapa).setView([-6.7715769944306885, -79.83870854313238], 14);

const origen = document.getElementById('origen');

const destino = document.getElementById('destino');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const getData = async () => {

    const response = await fetch('../static/js/map.json');
    const data = await response.json();
    lista = data.features;

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

    function onEachFeature(feature, layer) {
        if(feature.properties && feature.properties.nombre){
            layer.bindPopup(feature.properties.nombre)
        }
    }

    L.geoJson(lista, {
        onEachFeature
    }).addTo(map);


    
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

    // Obtén las referencias a los elementos select
    const inicioSelect = document.getElementById('origen');
    const finSelect = document.getElementById('destino');

    // Limpiar opciones existentes
    inicioSelect.innerHTML = '<option selected>Seleccione</option>';
    finSelect.innerHTML = '<option selected>Seleccione</option>';

    // Obtener nombres de ubicaciones desde el GeoJSON
    const nombresUbicaciones = lista.map(feature => feature.properties.nombre);

    // Añadir opciones a los selects
    nombresUbicaciones.forEach(nombre => {
        const optionInicio = document.createElement('option');
        optionInicio.value = nombre;
        optionInicio.textContent = nombre;
        const optionFin = optionInicio.cloneNode(true);

        inicioSelect.appendChild(optionInicio);
        finSelect.appendChild(optionFin);
    });

}

getData();