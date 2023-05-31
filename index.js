const express = require("express");
const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static("public"));

var apiRouter = express.Router();
app.use("/api", apiRouter);

//Endpoint to get workouts
app.get("/workouts", (_req, res) => {
  res.send(workouts);
});

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(PORT, () => console.log(`Connection active at port ${PORT}`));

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
    exercises: [
      { type: "checkbox", text: "Warm Up" },
      {
        type: "checkbox",
        text: "Bench Press *",
        tooltext: "3 x 8",
        inputtext: "How much weight did you use? ",
      },
      {
        type: "checkbox",
        text: "Tricep Extensions *",
        tooltext: "3 x 10 on cable machine",
        inputtext: "How much weight did you use?",
      },
      {
        type: "checkbox",
        text: "Shoulder Press *",
        tooltext: "3 x 8",
        inputtext: "How much weight did you use?",
      },
      {
        type: "checkbox",
        text: "Lat Pull-downs *",
        tooltext: "3 x 10",
        inputtext: "How much weight did you use?",
      },
      {
        type: "checkbox",
        text: "Barbell Squats *",
        tooltext: "3 x 10",
        inputtext: "How much weight did you use?",
      },
    ],
  },
  rest: {
    category: "Rest Day",
    exercises: [],
  },
};
