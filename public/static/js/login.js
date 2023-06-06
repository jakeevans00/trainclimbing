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
    const dbUser = await getUser(userName);
    let userData = {
      userName: dbUser.user.userName,
      userAge: dbUser.user.age,
      userHeight: dbUser.user.height,
      userWeight: dbUser.user.weigth,
      hardestSend: dbUser.user.hardestSend,
      progress: dbUser.user.progress,
    };
    let jsonUser = JSON.stringify(userData);
    localStorage.setItem("user", jsonUser);
    window.location.href = "pages/train.html";
  } else {
    validate();
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
      weight: weigth,
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
    validate();
  }
}

async function getUser(username) {
  const response = await fetch(`/api/user/${username}`);
  const user = await response.json();
  return user;
}

async function validate() {
  let e = document.getElementsByClassName("warning")[0];

  if (e.style.display === "block") {
    e.style.marginLeft = "8px";
    setTimeout(function () {
      e.style.marginLeft = "0px";
    }, 100);
    setTimeout(function () {
      e.style.marginLeft = "8px";
    }, 200);
    setTimeout(function () {
      e.style.marginLeft = "0px";
    }, 300);
  } else {
    document.getElementsByClassName("warning")[0].style.display = "block";
  }
}
