console.log("Hello, World!");

const button = document.getElementById("boton");

document.getElementById("formulario").addEventListener("click", function(event){
    event.preventDefault()
  });

button.addEventListener("click", function() {
    const input = document.getElementById("elemento").value;
    const ul = document.getElementById("lista");
    const li = document.createElement("li");
    li.innerHTML = input;
    li.addEventListener("click", function() {
        li.classList.add("completado");
    });
    ul.appendChild(li);
});