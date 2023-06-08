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
  child.textContent = chat;
  parent.insertBefore(child, parent.children[0]);
}

function createUserComment(text) {
  const parent = document.getElementsByClassName("msg-area")[0];
  let child = document.createElement("div");
  child.classList.add("user");
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

//Functionality for Web Socket
// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === "http:" ? "ws" : "wss";
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  appendMsg("system", "websocket", "connected");
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const chat = JSON.parse(text);

  appendMsg("msg", chat.name, chat.msg);
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  appendMsg("system", "websocket", "disconnected");
  // document.querySelector("#name-controls").disabled = true;
  // document.querySelector("#chat-controls").disabled = true;
};

// Send a message over the webSocket
function sendMessage() {
  const msgEl = document.querySelector("#userComments");
  const msg = msgEl.value;
  if (!!msg) {
    appendMsg("user", "Me", msg);
    const name = localStorage.getItem("userName");
    socket.send(`{"name":"${name}", "msg":"${msg}"}`);
    msgEl.value = "";
  }
}

function broadcastEvent(from, type, value) {
  const event = {
    from: from,
    type: type,
    value: value,
  };
  this.socket.send(JSON.stringify(event));
}

// Create one long list of messages
function appendMsg(cls, from, msg) {
  const parent = document.querySelector(".msg-area");
  let child = document.createElement("div");
  child.setAttribute("class", `${cls}`);
  child.innerText = `${from}: ${msg}`;
  parent.insertBefore(child, parent.children[0]);
}

// Disable chat if no name provided
// const chatControls = document.querySelector(".msg-area");
// const myName = JSON.parse(localStorage.getItem("userName"));
// myName.addEventListener("keyup", (e) => {
//   chatControls.disabled = myName.value === "";
// });
