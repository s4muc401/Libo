const localStorageKey = "notebox";

let passwordStorageKey = localStorage.wor;
const password = (localStorage.wor) ? passwordStorageKey : "";

const boardPassword = document.getElementById("board-password");
const boardSettings = document.getElementById("board-settings");
const boardAdd = document.getElementById("board-add");
const boardTasks = document.getElementById("board-main");
const footerNavBar = document.querySelector("footer");
const btNewTask = document.getElementById("btn-new-task");

// Board Password
const enterPassword = () => {
  let inputPassword = document.getElementById("input-enter-password");
  let correctOrNotPassword = (inputPassword.value == password) ? true : false;
  if (correctOrNotPassword) {
    footerNavBar.style.display = "block";
    btNewTask.style.display = "block";
    boardTasks.style.display = "block";
    boardPassword.style.display = "none";
  } else {
    boardPassword.innerHTML = `<p style="color:red;">Senha Incorreta</p>`;
  }
}

// Lock System
function lockSystem() { 
  location.reload();
}

// Board Settings
let inputOldPassword = document.getElementById("input-password");
let inputNewPassword = document.getElementById("input-set-password");

const openSettings = () => {
  boardTasks.style.display = "none";

  const existsPassword = (localStorage.wor) ? "block" : "none";
  inputOldPassword.style.display = existsPassword;
  console.log(inputOldPassword.style.display)
  if (boardPassword.style.display != "none") { // BoardPassword in display block
    console.log("Settings Acess -> NEGADO")
  } else {
    let status = (boardSettings.style.display == "block") ? "none" : "block";
    boardSettings.style.display = status;
  }
}

const setPassword = () => {
  if (inputOldPassword.value == password) {
    console.log("New Password: " + inputNewPassword.value)
    localStorage.wor = inputNewPassword.value;
    inputNewPassword.value = "";
    inputOldPassword.value = "";
  } else {
    boardSettings.innerHTML += `<p style="color:red;margin-top:3px;">Senha Incorreta</p>`;
  }
}

function openToDo() {
  boardTasks.style.display = "block";
  boardSettings.style.display = "none";
}

function newTask() {
  let input = document.getElementById("input-new-task");
  
  if (!input.value) {
    alert("Digite algo...")
  }
  else if (validadeIfExistNewTask()) {
    alert("Ja existe uma Task com essa descrição");
  } 
  else {
    boardAdd.style.display = "none";
    boardTasks.style.display = "block";
    
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let heightBox = document.getElementById("input-height-box");
    let colorBox = document.getElementById("input-color-box");
    values.push({
      name: input.value,
      height: heightBox.value,
      color: colorBox.value
    });
    localStorage.setItem(localStorageKey,JSON.stringify(values));
    showValues();
    input.value = "";
  }
}

function validadeIfExistNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let input = document.getElementById("input-new-task");
  let exists = values.find(x => x.name == input.value);
  return !exists ? false : true;
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let campo = document.getElementById("board-main");
  campo.innerHTML = "";
  for (let i = 0;i < values.length;i++) {
    campo.innerHTML += `<textarea style="height:${values[i]['height'] + "px"};background-color:${values[i]['color']};border-color:${values[i]['color']};margin-bottom: 5px;">${values[i]['name']}</textarea><button onclick='removeItem("${values[i]['name']}")' style="height:${values[i]['height'] + "px"};"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" /></svg>`;
  }
}

function removeItem(data) {
  // A ultima função Ethel
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex(x => x.name == data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();
}

function openBoardAdd() {
  if (boardAdd.style.display == "none") {
    boardAdd.style.display = "block";
    boardTasks.style.display = "none";
  } else {
    boardAdd.style.display = "none";
    boardTasks.style.display = "block";
  }
}

showValues();
