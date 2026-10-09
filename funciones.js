const secciones = document.querySelectorAll(".seccion");
const enlaces = document.querySelectorAll(".nav-btn");
const botonesDetalle = document.querySelectorAll(".btn-detalle");
const botonModo = document.getElementById("btn-modo");

// muestra una sección y marca su enlace como activo
function mostrarSeccion(clave) {
    secciones.forEach(seccion => {
        seccion.hidden = seccion.id !== clave;
    });

    enlaces.forEach(enlace => {
        const activo = enlace.dataset.seccion === clave;
        enlace.classList.toggle("active", activo);
        if (activo) {
            enlace.setAttribute("aria-current", "page");
        } else {
            enlace.removeAttribute("aria-current");
        }
    });
}

// abre o cierra el detalle de un botón "Ver más"
function alternarDetalle(boton) {
    const detalle = document.getElementById(boton.getAttribute("aria-controls"));
    const abrir = detalle.hidden;

    detalle.hidden = !abrir;
    boton.setAttribute("aria-expanded", abrir);
    boton.textContent = abrir ? "Ver menos" : "Ver más";
}

// aplica el modo claro u oscuro
function aplicarModo(claro) {
    document.body.classList.toggle("light-mode", claro);

    const icono = botonModo.querySelector("i");
    const texto = claro ? "Cambiar a modo oscuro" : "Cambiar a modo claro";

    icono.className = claro ? "fa-solid fa-sun" : "fa-solid fa-moon";
    botonModo.title = texto;
    botonModo.setAttribute("aria-label", texto);
}

// eventos
enlaces.forEach(enlace => {
    enlace.addEventListener("click", evento => {
        evento.preventDefault();
        mostrarSeccion(enlace.dataset.seccion);
        history.replaceState(null, "", enlace.getAttribute("href"));
    });
});

botonesDetalle.forEach(boton => {
    boton.addEventListener("click", () => alternarDetalle(boton));
});

botonModo.addEventListener("click", () => {
    const pasaAClaro = !document.body.classList.contains("light-mode");
    aplicarModo(pasaAClaro);
    localStorage.setItem("modo", pasaAClaro ? "claro" : "oscuro");
});

// estado inicial
const claves = [...secciones].map(seccion => seccion.id);
const hashInicial = location.hash.slice(1);

mostrarSeccion(claves.includes(hashInicial) ? hashInicial : "perfil");
aplicarModo(localStorage.getItem("modo") === "claro");