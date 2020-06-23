// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
// Load all event listners
loadEventListeners();

// function for load all event listners
function loadEventListeners(e) {
  // DOM load event listeners
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear Task list
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //Create list element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // This is for my reference
    console.log(`Input Data Copied Value =  ${task}`);
    //Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task before clicking the button");
  }
  //Create list element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // This is for my reference
  console.log(`Input Data Copied Value =  ${taskInput.value}`);
  //Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage

  storeTaskInLocalStorage(taskInput.value);

  // Clear input once after clicking Add task button
  taskInput.value = "";
  console.log(li);

  e.preventDefault();
}

// Store task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to remove")) {
      e.target.parentElement.parentElement.remove();
      // Remove from localstorage
      removeTaskFromLocalstorage(e.target.parentElement.parentElement);
    } else {
      alert("You task is not deleted");
    }
  }
}
// Remove from local storage
function removeTaskFromLocalstorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(taskItem);
}
// clear Task
function clearTasks(e) {
  //  taskList.innerHTML ='';

  // Faster method
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from local storage
  clearTaskfromLocalStorage();
}

// Clear task from local storage
function clearTaskfromLocalStorage() {
  localStorage.clear();
}

// Filter the tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
