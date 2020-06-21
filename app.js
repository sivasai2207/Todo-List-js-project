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
  //Add task event
  form.addEventListener("submit", addTask);
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

  // Clear input once after clicking Add task button
  taskInput.value = "";
  console.log(li);

  e.preventDefault();
}
