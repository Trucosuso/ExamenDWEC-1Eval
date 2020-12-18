/**
 * Devuelve true si el balanceo de los paréntesis es correcto, false en caso contrario
 * @param {String} cadena Cadena para comprobar paréntesis
 * @returns {Boolean}
 */
function ejercicio1(cadena) {
    let parentesisAbiertos = 0;
    let parentesisCerrados = 0;

    // Recorremos la cadena para comprobar los paréntesis
    for (let i = 0; i < cadena.length; i++) {
        if (cadena[i] == "(") {
            parentesisAbiertos++;
        } else if (cadena[i] == ")") {
            parentesisCerrados++;
        }
        // Si se cierra un paréntesis que no ha sido abierto devuelve false
        if (parentesisCerrados > parentesisAbiertos) {
            return false;
        }
    }

    // Si hay más paréntesis abiertos que cerrados devuelve false
    if (parentesisAbiertos > parentesisCerrados) {
        return false;
    }
    return true;
}

/**
 * Devuelve un array conteniendo las fechas del arrayFechas que están comprendidas entre fechaInicio y fechaFin. Ambas inclusive.
 * @param {Array<String>} arrayFechas Fechas en formato string dd/mm/aaaa
 * @param {String} fechaInicio Fecha en formato string dd/mm/aaaa
 * @param {String} fechaFin Fecha en formato string dd/mm/aaaa
 * @returns {Array<String>}
 */
function ejercicio2(arrayFechas, fechaInicio, fechaFin) {
    let dateInicio = new Date(fechaInicio);
    let dateFin = new Date(fechaFin);
    let fechasADevolver = [];

    // Recorremos todo el array de fechas comparando con dateInicio y dateFin. Si está en el intervalo se guarda en el arrayo fechasADevolver
    for (const fecha of arrayFechas) {
        let date = new Date(fecha);
        if (date >= dateInicio && date <= dateFin) {
            fechasADevolver.push(fecha);
        }
    }

    return fechasADevolver;
}

/**
 * Devuelve la multiplicación de todos los números enteros recibidos. Función recursiva
 * @param {Array<Number>} arrayEnteros Array de enteros
 * @returns {Number}
 */
function ejercicio3(arrayEnteros) {
    // Si solo queda un número en el array devolver ese.
    if (arrayEnteros.length == 1) {
        return arrayEnteros[0];
    }
    // Se llama de nuevo a si misma si es necesario
    return arrayEnteros[arrayEnteros.length - 1] * ejercicio3(arrayEnteros.slice(0, -1));
}

/**
 * Realiza una petición AJAX al servidor para obtener el contenido de textoEjercicio4. Cuando la recibe hace los siguiente:
 * Crea una tabla con los parámentros indicados. Las filas impares tienen como color de fondo el proporcionado.
 * Al pulsar sobre cualquier celda de la tabla anterior se borra la palabra que contiene dicha celda.
 * La tabla se almacena en localStorage tal y como se muestra en cada momento en pantalla
 * El texto de la celda es el obtenido en la petición al servidor
 * @param {Number} filas número de filas de la tabla
 * @param {Number} columnas número de columnas de la tabla
 * @param {String} color color HTML
 * @param {HTMLElement} objetoDOM Elemento dentro del cual creat la tabla
 */
function ejercicio4(filas, columnas, color, objetoDOM) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Pintamos la tabla cuando tenemos la respuesta del servidor
            pintarTabla(filas, columnas, color, objetoDOM, this.responseText);
        }
    };
    xhttp.open("GET", "textoEjercicio4", true);
    xhttp.send();
}

/**
 * Crea una tabla con los parámentros indicados. Las filas impares tienen como color de fondo el proporcionado.
 * Al pulsar sobre cualquier celda de la tabla anterior se borra la palabra que contiene dicha celda.
 * La tabla se almacena en localStorage tal y como se muestre en cada momento en pantalla
 * El texto de cada celda es el indicado en textoCelda
 * @param {Number} filas número de filas de la tabla
 * @param {Number} columnas número de columnas de la tabla
 * @param {String} color color HTML
 * @param {HTMLElement} objetoDOM Elemento dentro del cual creat la tabla
 * @param {String} textoCelda Texto a escribir dentro de las celdas
 */
function pintarTabla(filas, columnas, color, objetoDOM, textoCelda) {
    let tabla = document.createElement("table");
    for (let i = 0; i < filas; i++) {
        let fila = document.createElement("tr");
        if (i % 2 != 0) {
            fila.style.background = color;
        }
        for (let j = 0; j < columnas; j++) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(textoCelda));
            // Añadir manejador de eventos para borrar el texto si se hace click en la celda
            celda.addEventListener("click", (e) => {
                e.target.textContent = "";
                guardarTabla(tabla);
            });
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    objetoDOM.appendChild(tabla);
    guardarTabla(tabla);
}

/**
 * Guarda la tabla en localStorage
 * @param {HTMLTableElement} tabla Tabla a guardar en localStorage
 */
function guardarTabla(tabla) {
    localStorage.setItem("tabla", "<table>" + tabla.innerHTML + "</table>");
}
