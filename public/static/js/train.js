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
  const userName = localStorage.getItem("userName");
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
  clearWorkout();
  const dbUser = await getUser(userName);
  let userData = {
    userName: dbUser.user.userName,
    userAge: dbUser.user.age,
    userHeight: dbUser.user.height,
    userWeight: dbUser.user.weigth,
    hardestSend: dbUser.user.hardestSend,
    progress: dbUser.user.progress,
  };
  createWorkout(userData, workouts);
  return workouts;
}

function clearWorkout() {
  const parent = document.getElementById("workout");
  const header = document.getElementById("workoutType");
  header.removeChild(header.firstChild);

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createWorkout(user, workouts) {
  let workoutType = document.getElementById("workoutType");
  let workoutSelector = (user.progress + 1) % 2;
  workoutType.innerText += `Day ${user.progress} | ${workouts[workoutSelector].category}`;

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

  let type = user.progress % 2 === 0 ? "strength" : "climbing";
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

  if (entry.exercises[0].length > 0) {
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
  } else {
    return false;
  }
  return true;
}

async function updateDay() {
  const userName = localStorage.getItem("userName");
  const dbUser = await getUser(userName);

  let userData = {
    userName: dbUser.user.userName,
    userAge: dbUser.user.age,
    userHeight: dbUser.user.height,
    userWeight: dbUser.user.weigth,
    hardestSend: dbUser.user.hardestSend,
    progress: dbUser.user.progress,
  };
  if (validateForm() === true) {
    let curr_json = localStorage.getItem("user");
    let curr_user = JSON.parse(curr_json);

    const jsonSession = localStorage.getItem("session");
    let session = JSON.parse(jsonSession);
    session += 1;
    const updateSession = JSON.stringify(session);
    localStorage.setItem("session", updateSession);

    curr_user.progress += 1;

    let jsonUser = JSON.stringify(curr_user);
    localStorage.setItem("user", jsonUser);
    try {
      const response = await fetch(`/api/update/${user.userName}`, {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      });
      const responses = await response.json();
    } catch {
      console.log("couldn't update user data");
    } finally {
      createEntry(userData);
      loadWorkout();
    }
  }
}

async function getUser(username) {
  const response = await fetch(`/api/user/${username}`);
  const user = await response.json();
  return user;
}

function validateForm() {
  const form = document.getElementById("workout");
  const e = form.getElementsByTagName("input");
  let completed = [];

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

  if (completed.length > 0) {
    return true;
  } else {
    return false;
  }
}

function logout() {
  localStorage.removeItem("userName");
  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "/"));
}

let json = localStorage.getItem("user");
let user = JSON.parse(json);

getDate();
populateUserData(user);
loadWorkout();
