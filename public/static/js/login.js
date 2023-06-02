function login() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "train.html";

  //getUser(user);
  createUser();

  let entry = 1;
  localStorage.setItem("entry", entry);
}

function signup() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "train.html";

  createUser();
}

function createUser() {
  let userData = {
    userName: localStorage.getItem("userName"),
    userAge: 22,
    userHeight: 67,
    userWeight: 130,
    hardestSend: 8,
    progress: 1,
  };

  let jsonUser = JSON.stringify(userData);
  localStorage.setItem("user", jsonUser);
}
