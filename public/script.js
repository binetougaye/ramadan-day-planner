const newTask = document.getElementById("input");
const addTask = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addTask.addEventListener("click", () => {
    addToList();
});


newTask.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addToList();
    }
});

function addToList() {
    let text = newTask.value;
    if (text) {
    
        const listItem = document.createElement("li");
        listItem.className = "task-item";
        const checkbox = document.createElement("button");
        checkbox.className = "btn-check";
        checkbox.innerHTML = `<i class="fa-solid fa-check"><i/>`;
        const span = document.createElement("span");
        span.className = "text";
        span.textContent = text;
        const closeButton = document.createElement("button");
        closeButton.className = "btn-close";
        closeButton.innerHTML = `<i class="fa-solid fa-xmark"><i/>`;

        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(closeButton);

        taskList.appendChild(listItem);

        newTask.value = "";


        closeButton.addEventListener("click", () => {
            taskList.removeChild(listItem);
        });

        checkbox.addEventListener("click", () => {
            listItem.classList.toggle("completed");
        });
    }
}

const button = document.getElementById("changeMode")
const icon = document.querySelector(".fa-sun")
button.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (icon.classList.contains("fa-sun")) {
        icon.classList.replace("fa-sun", 'fa-moon')

    } else {
        icon.classList.replace("fa-moon", 'fa-sun')

    }
})
// Recupérer la date du jour
const date = document.getElementById("date")
const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}).toUpperCase();
date.innerText = today


// Obtenir la date islamique du jour
const hijriDate = moment().format('iD iMMMM iYYYY');
console.log(hijriDate); // Exemple : "25 Rajab 1446"