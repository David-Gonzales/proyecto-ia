const btnOrigen = document.getElementById("calcularRuta");
const btnNuevo = document.getElementById("nuevaRuta");
const origenSelect = document.getElementById("origen");
const destinoSelect = document.getElementById("destino");

btnOrigen.addEventListener("click", () => {
  let origenValue = origen.value;
  let destinoValue = destino.value;

  if (origenValue == 0 || destinoValue == 0) {
    return;
  }

  const datos = {
    origen: origenValue,
    destino: destinoValue,
  };

  fetch("/calcularRuta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
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
      rutaHTML = `<div class="card mt-3" id="ruta">
                    <div class="card-header">Ruta a seguir</div>
                    <div class="card-body">
                    <p class="card-text">${data.resultado}</p>
                    </div>
                </div>`;
      btnNuevo.insertAdjacentHTML("afterend", rutaHTML);

      btnOrigen.disabled = true;
      origenSelect.disabled = true;
      destinoSelect.disabled = true;
      btnNuevo.disabled = false;
    })
    .catch((error) => {
      console.error("Error en la petición:", error.message);
    });
});

btnNuevo.addEventListener("click", () => {
  var rutaHTML = document.getElementById("ruta");
  rutaHTML.remove();
  origenSelect.value = 0;
  destinoSelect.value = 0;
  btnOrigen.disabled = false;
  origenSelect.disabled = false;
  destinoSelect.disabled = false;
  btnNuevo.disabled = true;
});
