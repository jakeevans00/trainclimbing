let userData = {
  userName: "Jakey",
  userAge: 22,
  userHeight: 67,
  userWeight: 130,
  hardestSend: 8,
  progress: 3,
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

function populateUserData(user) {
  let grade = document.getElementsByClassName("welcomeUser")[0];
  grade.innerText += ` ${localStorage.getItem("userName")}`;

  for (const [key, value] of Object.entries(user)) {
    let el = document.getElementById(key);

    if (key === "userHeight") {
      let ft, inch;
      ft = Math.floor(value / 12);
      inch = value % 12;

      el.innerText += ` ${ft}'${inch}"`;
    } else if (key === "hardestSend") {
      el.innerText += ` V${value}`;
    } else {
      el.innerText += ` ${value}`;
    }
  }
}
