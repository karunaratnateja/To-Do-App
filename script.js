

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");


// SAVE TASKS
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ADD TASK
addBtn.addEventListener("click", () => {

  const text = taskInput.value.trim();

  if (text === "") {
    alert("Enter a task");
    return;
  }

  tasks.push({
    id: Date.now().toString(),
    text: text,
    completed: false
  });

  taskInput.value = "";

  saveTasks();
  renderTasks();

});


// RENDER TASKS
function renderTasks() {

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }


  filteredTasks.forEach(task => {

    const li = document.createElement("li");

    li.setAttribute("data-id", task.id);

    li.innerHTML = `

      <div class="left">

        <input 
          type="checkbox" 
          class="check-task"
          ${task.completed ? "checked" : ""}
        >

        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>

      </div>

      <div class="actions">

        <button class="edit">Edit</button>

        <button class="delete">Delete</button>

      </div>

    `;

    taskList.appendChild(li);

  });

}



// EVENT DELEGATION
taskList.addEventListener("click", (e) => {

  const li = e.target.closest("li");

  if (!li) return;

  const taskId = li.dataset.id;

  const taskIndex = tasks.findIndex(task => task.id === taskId);


  // DELETE
  if (e.target.classList.contains("delete")) {

    tasks.splice(taskIndex, 1);

    saveTasks();
    renderTasks();
  }


  // EDIT
  if (e.target.classList.contains("edit")) {

    const updatedText = prompt("Edit Task", tasks[taskIndex].text);

    if (updatedText !== null && updatedText.trim() !== "") {

      tasks[taskIndex].text = updatedText;

      saveTasks();
      renderTasks();
    }

  }

});




// CHECKBOX TOGGLE
taskList.addEventListener("change", (e) => {

  if (e.target.classList.contains("check-task")) {

    const li = e.target.closest("li");

    const taskId = li.dataset.id;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    tasks[taskIndex].completed = e.target.checked;

    saveTasks();
    renderTasks();

  }

});




// FILTERS
filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks();

  });

});




// INITIAL RENDER
renderTasks();

