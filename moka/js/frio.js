class LecturaBiologica {
    constructor(lote, temperatura, estado) {
        this.lote = lote;
        this.temperatura = temperatura;
        this.estado = estado;
    }
}

let historialLecturas = JSON.parse(localStorage.getItem('cadenaFrio')) || [];
const loteInput = document.getElementById('loteVacuna');
const tempInput = document.getElementById('tempActual');
const btnRegistrar = document.getElementById('btnRegistrarTemp');
const gridLecturas = document.getElementById('gridLecturas');
function renderizarLecturas() {
    gridLecturas.innerHTML = '';
    
    historialLecturas.forEach(lectura => {
        const esComprometido = lectura.estado === 'COMPROMETIDO';
        const colorFondo = esComprometido ? 'bg-danger text-white' : 'bg-success text-white';
        const icono = esComprometido ? 'super mal' : 'super bien';
        const cardTemplate = `
            <div class="col-sm-6 mb-3">
                <div class="card ${colorFondo} shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="card-title">${icono} Lote: ${lectura.lote}</h5>
                        <p class="card-text mb-1">Temperatura: <strong>${lectura.temperatura}°C</strong></p>
                        <p class="card-text mb-0">Estado: <strong>${lectura.estado}</strong></p>
                    </div>
                </div>
            </div>
        `;
        gridLecturas.innerHTML += cardTemplate;
    });
}
btnRegistrar.addEventListener('click', () => {
    const lote = loteInput.value.trim();
    const temperatura = parseFloat(tempInput.value);
    if (!lote || isNaN(temperatura)) {
        alert('Por favor, ingresa un código de lote y una temperatura válida.');
        return;
    }
    let estado = 'ÓPTIMO';
    if (temperatura < 2 || temperatura > 8) {
        estado = 'COMPROMETIDO';
    }
    const nuevaLectura = new LecturaBiologica(lote, temperatura, estado);
    historialLecturas.push(nuevaLectura);
    localStorage.setItem('cadenaFrio', JSON.stringify(historialLecturas));
    renderizarLecturas();
    loteInput.value = '';
    tempInput.value = '';
});
document.addEventListener('DOMContentLoaded', renderizarLecturas);