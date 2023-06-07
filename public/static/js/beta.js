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

function createUserComment(text) {
  const parent = document.getElementsByClassName("msg-area")[0];
  let child = document.createElement("div");
  child.classList.add("msg", "user");
  let commentText = document.getElementById("userComments").value;
  if (commentText) {
    child.textContent = commentText;
    parent.insertBefore(child, parent.children[0]);
  }
}

function logout() {
  localStorage.removeItem("userName");
  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "/"));
}

let chat = "Placeholder";
setInterval(() => {
  let parent = document.querySelector(".msg-area");
  let child = document.createElement("div");
  child.setAttribute("class", "msg");
  child.textContent = chat;
  parent.insertBefore(child, parent.children[0]);
}, 5000);
