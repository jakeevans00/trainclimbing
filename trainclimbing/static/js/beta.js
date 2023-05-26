function getUser() {
  let name = document.getElementsByClassName("welcomeUser")[0];
  name.innerText += ` ${localStorage.getItem("userName")}`;
}

getUser();

async function createComment(text) {
  const parent = document.getElementsByClassName("msg-area")[0];
  let child = document.createElement("div");
  child.setAttribute("class", "msg");
  child.textContent = text;
  setTimeout(() => parent.appendChild(child), 3000);
}

let chat = "Placeholder";
setInterval(() => {
  let parent = document.querySelector(".msg-area");
  let child = document.createElement("div");
  child.setAttribute("class", "msg");
  child.textContent = chat;
  parent.insertBefore(child, parent.children[0]);
}, 5000);
