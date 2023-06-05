let userData = {
  userName: localStorage.getItem("userName"),
  userAge: 22,
  userHeight: 67,
  userWeight: 130,
  hardestSend: 8,
  progressbar: 3,
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
  }
}

async function createChart() {
  let parent = document.getElementById("chart");
  const data = await getData();

  parent.classList.add("cards");

  let container = document.createElement("div");
  container.classList.add("card-single", "card-single--workout");
  let header = document.createElement("div");
  header.classList.add("card-header");
  let h3 = document.createElement("h3");
  h3.classList.add("card-header");
  h3.style.color = "#91768a";
  if (data) {
    h3.textContent = "History";
    let text = document.createElement("div");
    text.classList.add("info");

    let climbData = data.filter((x) => x.type === "climbing");
    let strengthData = data.filter((x) => x.type === "strength");

    let hangs = [];
    let projects = [];
    for (let i = 0; i < climbData.length; i++) {
      hangs.push(climbData[i].exercises[0][0].value);
      projects.push(climbData[i].exercises[0][1].value);
    }
    text.textContent = `Hangs Weight History: ${hangs} -- Project Hisory: ${projects}`;
    header.append(text);
  } else {
    h3.innerText = "No data 😔 Complete a workout to see progress!";
  }
  header.insertBefore(h3, header.firstChild);
  container.appendChild(header);
  parent.appendChild(container);
}
populateUserData(userData);
getQuote();
createChart();
