//* Lista de Equipos
let Equipos = [];

//*Los Equipos
const nombresEquipos = ["River", "Boca", "Bayer Munich", "Barcelona F.C", "Chicago", "Real Madrid", "Chacarita"];

//* Configuración de filtros por precio de DT
const filtroPrecio = { minimo: 0, maximo: 1000 };

//! Funciones que son esenciales para el funcionamiento del "proyecto"

//* Función para agregar un equipo al inventario
function agregarEquipo(titulos, DT, saldo, nombreEquipo, estadio) {
    if (!nombresEquipos.includes(nombreEquipo)) {
        console.log(`Nombre de equipo inválido. Equipos disponibles: ${nombresEquipos.join(", ")}`);
        return;
    }
    const equipo = {
        titulos: Number(titulos),  // Convertir títulos a número
        DT,
        saldo,
        nombreEquipo,
        estadio,
        disponible: true
    };
    Equipos.push(equipo);
    console.log(`Equipo "${nombreEquipo}" agregado exitosamente.`);
}

//* Funciones de filtro

// Filtrar por títulos
function buscarEquipoPorTitulo(titulos) {
    return Equipos.filter(equipo => equipo.titulos === Number(titulos));
}

// Filtrar por DT
function buscarEquipoPorDT(DT) {
    return Equipos.filter(equipo => equipo.DT.toLowerCase().includes(DT.toLowerCase()));
}

// Filtrar por saldo del equipo
function filtrarEquiposPorSaldo(minimo, maximo) {
    return Equipos.filter(equipo => equipo.saldo >= minimo && equipo.saldo <= maximo);
}

// Filtrar por nombre de equipo
function filtrarEquiposPorNombre(nombreEquipo) {
    return Equipos.filter(equipo => equipo.nombreEquipo.toLowerCase() === nombreEquipo.toLowerCase());
}

// Filtrar por estadio
function filtrarEquiposPorEstadio(estadio) {
    return Equipos.filter(equipo => equipo.estadio.toLowerCase().includes(estadio.toLowerCase()));
}

// Función para mostrar todos los Equipos
function mostrarEquipos() {
    console.log("Conjunto de Equipos:");
    if (Equipos.length === 0) {
        console.log("No hay Equipos agregados.");
        return;
    }
    Equipos.forEach((equipo, index) => {
        console.log(`${index + 1}. ${equipo.nombreEquipo} con DT ${equipo.DT} - Saldo: ${equipo.saldo} USD - Títulos: ${equipo.titulos} - Estadio: ${equipo.estadio}`);
    });
}

//? Ejemplos de uso

// Agregar Equipos a la Consola
agregarEquipo(10, "Gallardo", 10000, "River", "Mas Monumental");
agregarEquipo(1, "Diego Hernán Martínez", 9000, "Boca", "La Bombonera");
agregarEquipo(7, "Vincent Kompany", 12000, "Bayer Munich", "Allianz Arena");
agregarEquipo(8, "Hansi Flick", 13000, "Barcelona F.C", "Camp Nou");
agregarEquipo(9, "Andrés Montenegro", 4000, "Chicago", "Estadio Nueva Chicago");
agregarEquipo(2, "Carlo Ancelotti", 15000, "Real Madrid", "Estadio Santiago Bernabeu");
agregarEquipo(4, "Manuel Fernández", 200, "Chacarita", "Estadio de Chacarita Juniors");

// Funciones de Búsqueda y Filtro Interactivas
function buscarPorTituloPrompt() {
    const titulo = prompt("Ingrese el número de títulos del equipo a buscar:");
    const resultados = buscarEquipoPorTitulo(titulo);
    if (resultados.length === 0) {
        console.log(`No se encontraron equipos con ${titulo} títulos.`);
    } else {
        console.log("Equipos encontrados:");
        console.log(resultados);
    }
}

function buscarPorDTPrompt() {
    const DT = prompt("Ingrese el DT del equipo a buscar:");
    const resultados = buscarEquipoPorDT(DT);
    if (resultados.length === 0) {
        console.log(`No se encontraron equipos con el DT "${DT}".`);
    } else {
        console.log("Equipos encontrados:");
        console.log(resultados);
    }
}

function filtrarPorSaldoPrompt() {
    const minimo = parseFloat(prompt("Ingrese el saldo mínimo:"));
    const maximo = parseFloat(prompt("Ingrese el saldo máximo:"));
    const resultados = filtrarEquiposPorSaldo(minimo, maximo);
    if (resultados.length === 0) {
        console.log(`No se encontraron equipos en el rango de saldo entre ${minimo} y ${maximo} USD.`);
    } else {
        console.log("Equipos encontrados en el rango de saldo:");
        console.log(resultados);
    }
}

function filtrarPorNombreEquipoPrompt() {
    const nombreEquipo = prompt("Ingrese el nombre del equipo a filtrar:");
    const resultados = filtrarEquiposPorNombre(nombreEquipo);
    if (resultados.length === 0) {
        console.log(`No se encontraron equipos con el nombre "${nombreEquipo}".`);
    } else {
        console.log("Equipos encontrados con el nombre:");
        console.log(resultados);
    }
}

// Ejecutar funciones de ejemplo
mostrarEquipos(); // Muestra todos los equipos

// Buscar un equipo por el número de títulos
buscarPorTituloPrompt();

// Buscar un equipo por el DT
buscarPorDTPrompt();

// Filtrar los equipos por saldo
filtrarPorSaldoPrompt();

// Filtrar los equipos por nombre de equipo
filtrarPorNombreEquipoPrompt();
