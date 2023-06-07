function getUser() {
  let name = document.getElementsByClassName("welcomeUser")[0];
  name.innerText += ` ${localStorage.getItem("userName")}`;
}

function logout() {
  localStorage.removeItem("userName");
  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "/"));
}

getUser();
