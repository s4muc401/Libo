let password

const boardPassword = document.getElementById("board-password");
const footerNavBar = document.querySelector("footer")

// Board Password
const enterPassword = () => {
  let inputPassword = document.getElementById("input-enter-password");
  let correctOrNotPassword = (inputPassword.value == localStorage.getItem("Password")) ? true : false;
  if (correctOrNotPassword) {
    footerNavBar.style.display = "block";
  } else {
    boardPassword.innerHTML = `<p style="color:red;">Senha Incorreta</p>`;
  }
}

// Board Settings
const openSettings = () => {
  if (boardPassword.style.display != "none") {
    console.log("Settings Acess -> NEGADO")
  } else {
    const boardSettings = document.getElementById("board-settings");
    let status = (boardSettings.style.display == "block") ? "none" : "block";
    boardSettings.style.display = status;
  }
}

const setPassword = () => {
  let inputOldPassword = document.getElementById("input-password");
  let inputNewPassword = document.getElementById("input-set-password");
}