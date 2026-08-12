let addButton = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

addButton.addEventListener("click", function () {

    let task = taskInput.value;

    if (task !== "") {

        let li = document.createElement("li");

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑️";

        deleteButton.addEventListener("click", function () {
            li.remove();
        });

        li.addEventListener("click", function () {
    li.classList.toggle("completed");
});

        li.textContent = task;

        li.appendChild(deleteButton);

        taskList.appendChild(li);

        taskInput.value = "";

    }

});