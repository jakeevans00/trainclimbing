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
  grade.innerText += ` ${name}`;

  let project = document.getElementById("projectGrade");
  let projectGrade = parseInt(user.hardestSend);
  project.innerText += `${projectGrade + 1}`;

  let progressBar = document.getElementsByClassName("progressBar")[0];
  progressBar.innerHTML = `<label for="progress">Current Progress</label>
  <progress id="progress" max="10" value="${user.progress}"></progress>`;
}
async function loadWorkout() {
  let workouts = [];
  try {
    const response = await fetch("/api/workouts");
    workouts = await response.json();

    localStorage.setItem("workouts", JSON.stringify(workouts));
  } catch {
    const workoutsText = localStorage.getItem("workouts");
    if (workoutsText) {
      workouts = JSON.parse(workoutsText);
    }
  }

  createWorkout(user, workouts);
  return workouts;
}

function createWorkout(user, workouts) {
  let workoutType = document.getElementById("workoutType");
  let workoutSelector = (user.progress + 1) % 2;
  workoutType.innerText += ` ${user.progress} | ${workouts[workoutSelector].category}`;

  let parent = document.getElementById("workout");

  for (w of workouts[workoutSelector].exercises) {
    let row = document.createElement("li");
    let rangeul = document.createElement("ul");

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
  // input.setAttribute("required", "");

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

  if (type === "range") {
    input.setAttribute("max", "9");
  } else if (type === "number") {
    input.setAttribute("max", "200");
    input.setAttribute("id", w.inputid);
  }

  li.appendChild(label);
  li.appendChild(input);

  return li;
}

async function createEntry(user) {
  const form = document.getElementById("workout");
  const e = form.getElementsByTagName("input");

  let type = user.progress % 2 === 1 ? "strength" : "climbing";
  let completed = [];
  let entry = {
    user: localStorage.getItem("userName"),
    type: type,
    exercises: [],
  };

  for (let i = 1; i < e.length; i++) {
    if (e[i].type === "number") {
      const e_id = e[i].id;
      const e_value = e[i].value;
      if (e_value) {
        const item = { id: e_id, value: e_value };
        completed.push(item);
      }
    }
  }

  entry.exercises.push(completed);

  if (entry) {
    try {
      const response = await fetch("/api/entry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(entry),
      });
      //Store user entries in local storage
      const entries = await response.json();
      localStorage.setItem("userEntries", JSON.stringify(entries));
    } catch {
      console.log("Couldn't upload entry");
    }
  }
}

function updateDay() {
  const json = localStorage.getItem("user");
  let user = JSON.parse(json);
  console.log("In updateDay");

  user.progress += 1;
  let jsonUser = JSON.stringify(user);
  localStorage.setItem("user", jsonUser);

  createEntry(user);
  createWorkout(user, workouts);

  let jsonEntry = localStorage.getItem("entry");
  let entry = JSON.parse(jsonEntry);
  entry++;
  localStorage.setItem("entry", entry);
}

const json = localStorage.getItem("user");
let user = JSON.parse(json);

getDate();
populateUserData(user);
loadWorkout();
