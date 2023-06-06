async function loginUser() {
  const userName = document.querySelector("#name")?.value;
  const password = document.querySelector("#password")?.value;
  const response = await fetch(`/api/auth/login`, {
    method: "post",
    body: JSON.stringify({
      userName: userName,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    localStorage.setItem("userName", userName);
    window.location.href = "pages/train.html";
  } else {
    document.getElementsByClassName("warning")[0].style.display = "block";
  }
}
async function createUser() {
  const userName = document.querySelector("#su_name")?.value;
  const password = document.querySelector("#su_password")?.value;
  const age = document.querySelector("#su_age")?.value;
  const height = document.querySelector("#su_height")?.value;
  const weigth = document.querySelector("#su_weight")?.value;
  const hardestSend = document.querySelector("#su_send")?.value;
  const progress = 1;
  const response = await fetch(`/api/auth/create`, {
    method: "post",
    body: JSON.stringify({
      userName: userName,
      password: password,
      age: age,
      height: height,
      weigth: weigth,
      hardestSend: hardestSend,
      progress: progress,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    localStorage.setItem("userName", userName);

    window.location.href = "train.html";
    let userData = {
      userName: userName,
      userAge: age,
      userHeight: height,
      userWeight: weigth,
      hardestSend: hardestSend,
      progress: progress,
    };

    let jsonUser = JSON.stringify(userData);
    localStorage.setItem("user", jsonUser);
  } else {
    document.getElementsByClassName("warning")[0].style.display = "block";
    console.log("couldn't sign in ");
  }
}

function login() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "train.html";

  //getUser(user);
  createUser();
}
