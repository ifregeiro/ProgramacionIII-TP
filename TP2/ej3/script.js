console.log("Hello, World!");

const botonResaltar = document.getElementById("resaltar");
const botonOcultar = document.getElementById("ocultar");
const parrafos = document.getElementsByClassName("parrafo");



botonResaltar.addEventListener("click", function() {
    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].classList.add("resaltado");
    }
});

botonOcultar.addEventListener("click", function() {
    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].classList.toggle("oculto");
    }
});
