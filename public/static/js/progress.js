let jsonUser = localStorage.getItem("user");
let userData = JSON.parse(jsonUser);

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

function getQuote() {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      let parent = document.querySelector("#quote");
      parent.classList.add("cards");

      let container = document.createElement("div");
      container.classList.add("card-single", "card-single--workout");
      let header = document.createElement("div");
      header.classList.add("card-header");
      let h3 = document.createElement("h3");
      h3.classList.add("card-header");
      h3.style.color = "#91768a";
      h3.textContent = "Inspirational Quote!";
      let quote = document.createElement("div");
      let author = document.createElement("div");
      quote.classList.add("info");
      author.classList.add("info");
      quote.textContent = `"${data.content}"`;
      author.textContent = `- ${data.author}`;

      header.appendChild(h3);
      header.appendChild(quote);
      header.appendChild(author);
      container.appendChild(header);
      parent.appendChild(container);
    });
}

async function getData() {
  let entries = [];
  try {
    const response = await fetch(
      `/api/entries/${localStorage.getItem("userName")}`
    );
    entries = await response.json();
    return entries;
  } catch {
    console.log("no data available");
    return;
  }
}

function logout() {
  localStorage.removeItem("userName");
  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "/"));
}

populateUserData(userData);
getQuote();

document.addEventListener("DOMContentLoaded", async function () {
  const data = await getData();
  const parent = document.getElementById("chart");

  if (data.length >= 1) {
    let climbData = data.filter((x) => x.type === "climbing");
    let strengthData = data.filter((x) => x.type === "strength");

    let hangs = [];
    let projects = [];
    let bench = [];
    let tris = [];
    let shoulders = [];
    let lats = [];
    let squats = [];

    for (let i = 0; i < climbData.length; i++) {
      try {
        hangs.push(climbData[i].exercises[0][0].value);
        projects.push(climbData[i].exercises[0][1].value);
      } catch {}
    }

    for (let i = 0; i < strengthData.length; i++) {
      try {
        bench.push(strengthData[i].exercises[0][0].value);
        tris.push(strengthData[i].exercises[0][1].value);
        shoulders.push(strengthData[i].exercises[0][2].value);
        lats.push(strengthData[i].exercises[0][3].value);
        squats.push(strengthData[i].exercises[0][4].value);
      } catch {}
    }

    const labels = Array.from(
      { length: hangs.length },
      (_, index) => `Day ${index + 1}`
    );
    const strengthlabels = Array.from(
      { length: bench.length },
      (_, index) => `Day ${index + 2}`
    );

    const projData = {
      labels: labels,
      datasets: [
        {
          label: "Project Grade",
          data: projects,
          borderColor: "#F28482",
          tension: 0.1,
        },
      ],
    };

    const otherData = {
      labels: strengthlabels,
      datasets: [
        {
          label: "Hangs",
          data: hangs,
          borderColor: "#335C67",
          tension: 0.1,
        },
        {
          label: "Bench",
          data: bench,
          borderColor: "#9E2A2B",
          tension: 0.1,
        },
        {
          label: "Triceps",
          data: tris,
          borderColor: "#AB92BF",
          tension: 0.1,
        },
        {
          label: "Shoulders",
          data: shoulders,
          borderColor: "#80DED9",
          tension: 0.1,
        },
        {
          label: "Lat Pulls",
          data: lats,
          borderColor: "#4C061D",
          tension: 0.1,
        },
        {
          label: "Squats",
          data: squats,
          borderColor: "#A59132",
          tension: 0.1,
        },
      ],
    };

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: projData,
      options: {
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
            barPercentage: 0.5,
          },
          y: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 17,
          },
        },
      },
    });

    const ctz = document.getElementById("myChart2").getContext("2d");
    new Chart(ctz, {
      type: "line",
      data: otherData,
      options: {
        scales: {
          y: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 300,
          },
        },
      },
    });
  } else {
    parent.textContent = "No data 😔 Complete a workout to see progress!";
  }
});
