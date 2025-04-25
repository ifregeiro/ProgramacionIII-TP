console.log("Hello, World!");

const miTitulo = document.getElementById("tituloPrincipal");

miTitulo.textContent = "Título modificado";

const parrafo = document.getElementsByClassName("parrafo");

for (let i = 0; i < parrafo.length; i++) {
  parrafo[i].style.color = "red";
}

const lista = document.querySelectorAll("li");

for (let i = 0; i < lista.length; i++) {
    lista[i].innerHTML += " texto extra";
}