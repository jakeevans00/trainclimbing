function login() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "train.html";

  createUser();

  let entry = 1;
  localStorage.setItem("entry", entry);
}

function createUser() {
  let userData = {
    userName: localStorage.getItem("userName"),
    userAge: 22,
    userHeight: 67,
    userWeight: 130,
    hardestSend: 8,
    progress: 1,
    pastWorkouts: [
      {
        day: 1,
        hangsCompleted: 2,
        hangWeight: 5,
        campusCompleted: 2,
        frontLeverCompleted: 1,
      },
      {
        day: 2,
        hangsCompleted: 3,
        hangWeight: 10,
        campusCompleted: 4,
        frontLeverCompleted: 2,
      },
    ],
  };

  let jsonUser = JSON.stringify(userData);
  localStorage.setItem("user", jsonUser);
}
