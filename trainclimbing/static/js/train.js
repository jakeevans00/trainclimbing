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
      { type: "checkbox", text: "Warm-Up on wall", for: "warmup" },
      { type: "checkbox", text: "Max Hang Warm Up", for: "hang-warmup" },
      {
        type: "checkbox",
        text: "Max Hangs *",
        for: "hangs",
        tooltext: "4 sets: 8 seconds on, 52 seconds off with weight",
        rangetext: "How many did you complete? ",
        inputtext: "How much weight did you use?",
      },
      {
        type: "checkbox",
        text: "Campus Board *",
        for: "campus",
        tooltext: "6 sets: 4 laddering, 2 skipping",
        rangetext: "How many did you complete? ",
      },
      { type: "checkbox", text: "Project Bouldering" },
      {
        type: "input",
        text: "What is the difficulty of your hardest project? (V-scale)",
      },
      { type: "checkbox", text: "Limit Bouldering" },
      {
        type: "checkbox",
        text: "Front Lever *",
        tooltext: "4 x 10 seconds",
        rangetext: "How many did you complete? ",
      },
      { type: "checkbox", text: "Cool Down" },
    ],
  },
  even: {
    category: "Strength Training",
    exercises: [{ type: "checkbox", text: "First one bro" }],
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

  let parent = document.getElementById("workout");

  for (w of workouts[day].exercises) {
    // console.log(w);

    let row = document.createElement("li");
    let rangeul = document.createElement("ul");

    console.log(w.type);
    if (w.type === "checkbox") {
      let label = createInput(w);

      if (w.tooltext) {
        let div = createToolTip(w, label);
        label.appendChild(div);
        if (w.rangetext) {
          let li = createNumberInput(w, rangeul, w.rangetext, "range");
          rangeul.append(li);
        }
        if (w.inputtext) {
          let li = createNumberInput(w, rangeul, w.inputtext, "number");
          rangeul.append(li);
        }
      } else {
        label.innerHTML += w.text;
      }

      row.append(label);
      if (rangeul) {
        row.appendChild(rangeul);
      }

      parent.append(row);
      console.log(label);
    }
  }
}

function createInput(w) {
  let label = document.createElement("label");
  label.setAttribute("class", "form-control");
  label.setAttribute("for", w.for);

  let input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", w.for);
  input.setAttribute("name", w.for);

  label.appendChild(input);

  return label;
}

function createToolTip(w, label) {
  label.children[0].setAttribute("class", "tooltip");
  let div = document.createElement("div");
  div.setAttribute("class", "tooltip");
  div.textContent = w.text;

  let span = document.createElement("span");
  span.setAttribute("class", "tooltiptext");
  span.textContent = w.tooltext;
  div.appendChild(span);

  console.log(w.text);
  return div;
}

function createNumberInput(w, rangeul, text, type) {
  rangeul.setAttribute("class", "wk-details");
  let li = document.createElement("li");
  let label = document.createElement("label");
  label.textContent = text;

  let input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("min", "0");
  input.setAttribute("max", "6");

  li.appendChild(label);
  li.appendChild(input);

  return li;
}

function updateDay() {
  userData.progress += 1;
  populateUserData(userData);
  createWorkout(userData, workouts);
}

getDate();

populateUserData(userData);

createWorkout(userData, workouts);
