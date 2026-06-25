
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

loadTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    createTask(text, false);
    saveTasks();

    taskInput.value = "";
}

function createTask(text, completed) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("task-text");

    if (completed) {
        span.classList.add("completed");
    }

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    const del = document.createElement("button");
    del.textContent = "X";
    del.classList.add("delete-btn");

    del.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(del);

    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        const span = li.querySelector(".task-text");

        tasks.push({
            text: span.textContent,
            completed: span.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}
