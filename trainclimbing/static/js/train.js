const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
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

const workouts = {
  odd: {
    category: "Climbing Specific",
    exercises: [
      { type: "cbox", text: "Warm-Up on wall" },
      { type: "cbox", text: "Max Hang Warm Up" },
      {
        type: "cbox-tooltip",
        text: "Max Hangs",
        tooltext: "4 sets: 8 seconds on, 52 seconds off with weight",
      },
      { type: "range", text: "How many did you complete?" },
      { type: "input", text: "How much weight did you use" },
      {
        type: "cbox-tooltip",
        text: "Campus Board",
        tooltext: "6 sets: 4 laddering, 2 skipping",
      },
      { type: "range", text: "How many did you complete?" },
      { type: "cbox", text: "Project Bouldering" },
      {
        type: "input",
        text: "What is the difficulty of your hardest project? (V-scale)",
      },
      { type: "cbox", text: "Limit Bouldering" },
      { type: "cbox-tooltip", text: "Front Lever", tooltext: "4 x 10 seconds" },
      { type: "cbox", text: "Cool Down" },
    ],
  },
  even: {
    category: "Strength Training",
    exercises: [{ type: "cbox", text: "First one bro" }],
  },
  rest: {
    category: "Rest Day",
    exercises: [],
  },
};

function getDate() {
  let date = new Date();
  let el = document.getElementById("date");

  el.innerText = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

function populateUserData(user) {
  let grade = document.getElementsByClassName("welcomeUser")[0];
  let name = localStorage.getItem("userName");
  console.log(name);
  grade.innerText += ` ${name}`;

  let project = document.getElementById("projectGrade");
  project.innerText += `${user.hardestSend + 1}`;

  let progressBar = document.getElementsByClassName("progressBar")[0];
  progressBar.innerHTML = `<label for="progress">Current Progress</label>
  <progress id="progress" max="4" value="${user.progress}"></progress>`;
}

function createWorkout(user, workouts) {
  let day = user.progress % 2 === 1 ? "odd" : "even";

  let workoutType = document.getElementById("workoutType");
  workoutType.innerText += ` ${user.progress} | ${workouts[day].category}`;

  for (w of workouts[day].exercises) {
    console.log(w);
    let parent = document.getElementById("workout");
    console.log(parent.innerText);
  }
}

getDate();

populateUserData(userData);

createWorkout(userData, workouts);
