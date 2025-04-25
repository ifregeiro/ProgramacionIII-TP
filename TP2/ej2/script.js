console.log("Hello, World!");

const button = document.getElementById("boton");

button.addEventListener("click", function() {
    const input = document.getElementById("elemento").value;
    const ul = document.getElementById("lista");
    const li = document.createElement("li");
    li.innerHTML = input + " <button class='eliminar'>Eliminar</button>";
    ul.appendChild(li);
    const eliminar = li.querySelector(".eliminar");
    eliminar.addEventListener("click", function() {
        ul.removeChild(li);
    });
});