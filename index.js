const express = require("express");
const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;
const DB = require("./database.js");

app.use(express.json());

app.use(express.static("public"));

//Code to use apiRouter
var apiRouter = express.Router();
app.use("/api", apiRouter);

//Endpoint to get workouts from database
app.get("/workouts", async (_req, res) => {
  const workouts = await DB.getWorkouts();
  res.send(workouts);
});

//Endpoints for users aren't currently called by frontend. This won't really be useful until DB is configured.
app.get("/user/:userName", (req, res) => {
  res.send({ name: req.params.userName });
});

app.put("/user/:userName", (req, res) => {
  res.send({ update: req.params.userName });
});

app.delete("/user/:userName", (req, res) => {
  res.send({ delete: req.params.userName });
});

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(PORT, () => console.log(`Connection active at port ${PORT}`));

//I only ran this code once, to populate the database with workouts (commented out below)
// DB.addWorkouts(workouts);

// const workouts = [
//   {
//     day: "odd",
//     category: "Climbing Specific",
//     exercises: [
//       { type: "checkbox", text: "Warm-Up on wall", for: "warmup" },
//       { type: "checkbox", text: "Max Hang Warm Up", for: "hang-warmup" },
//       {
//         type: "checkbox",
//         text: "Max Hangs *",
//         for: "hangs",
//         tooltext: "4 sets: 8 seconds on, 52 seconds off with weight",
//         rangetext: "How many did you complete? ",
//         inputtext: "How much weight did you use?",
//       },
//       {
//         type: "checkbox",
//         text: "Campus Board *",
//         for: "campus",
//         tooltext: "6 sets: 4 laddering, 2 skipping",
//         rangetext: "How many did you complete? ",
//       },
//       { type: "checkbox", text: "Project Bouldering" },
//       {
//         type: "input",
//         text: "What is the difficulty of your hardest project? (V-scale)",
//       },
//       { type: "checkbox", text: "Limit Bouldering" },
//       {
//         type: "checkbox",
//         text: "Front Lever *",
//         tooltext: "4 x 10 seconds",
//         rangetext: "How many did you complete? ",
//       },
//       { type: "checkbox", text: "Cool Down" },
//     ],
//   },
//   {
//     day: "even",
//     category: "Strength Training",
//     exercises: [
//       { type: "checkbox", text: "Warm Up" },
//       {
//         type: "checkbox",
//         text: "Bench Press *",
//         tooltext: "3 x 8",
//         inputtext: "How much weight did you use? ",
//       },
//       {
//         type: "checkbox",
//         text: "Tricep Extensions *",
//         tooltext: "3 x 10 on cable machine",
//         inputtext: "How much weight did you use?",
//       },
//       {
//         type: "checkbox",
//         text: "Shoulder Press *",
//         tooltext: "3 x 8",
//         inputtext: "How much weight did you use?",
//       },
//       {
//         type: "checkbox",
//         text: "Lat Pull-downs *",
//         tooltext: "3 x 10",
//         inputtext: "How much weight did you use?",
//       },
//       {
//         type: "checkbox",
//         text: "Barbell Squats *",
//         tooltext: "3 x 10",
//         inputtext: "How much weight did you use?",
//       },
//     ],
//   },
//   { day: "rest", category: "Rest Day", exercises: [] },
// ];
