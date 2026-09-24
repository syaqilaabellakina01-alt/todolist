const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList")

let tasks = [];
let editId = null;

addBtn.addEventListener("click",()=>{
  const text = taskInput.value.trim();
  if (text === "") return;
  if (editId !== null) {
    tasks = tasks.map(task => {
      if (task.id === editId){
        task.title = text;
      }
      return task;
    });
    editId = null;
    addBtn.textContent="Add"
  } else {
      const task = {
        id: Date.now(), title:text, completed:false
        
      };
      tasks.push(task);
  }
  taskInput.value = "";
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li")
    
    li.innerHTML =  `
    <span style="${task.completed ? 'text-decoration: line-through': ''}">${task.title}</span>
    <button onclick="editTask(${task.id})">Edit</button>
    <button onclick = "toggleTask(${task.id})">Complete</button>
    <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    
    taskList.appendChild(li);
  });
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  taskInput.value = task.title;
  editId = id; 
  addBtn.textContent = "Update";
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  }); 
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}
