const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const userCollection = db.collection("user");
const workoutCollection = db.collection("workout");
const entryCollection = db.collection("entry");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

async function addWorkout(workout) {
  const result = await workoutCollection.insertOne(workout);
  return result;
}

function getWorkouts() {
  const cursor = workoutCollection.find();
  return cursor.toArray();
}

async function addEntry(entry) {
  const result = await entryCollection.insertOne(entry);
  return result;
}

async function addEntry(entry) {
  const result = await entryCollection.insertOne(entry);
  return result;
}

function getEntries(username) {
  const cursor = entryCollection.find({ user: username });
  return cursor.toArray();
}

function getUser(username) {
  return userCollection.findOne({ userName: username });
}
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(
  username,
  password,
  age,
  height,
  weight,
  hardestSend,
  progress
) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userName: username,
    password: passwordHash,
    age: age,
    height: height,
    weight: weight,
    hardestSend: hardestSend,
    progress: progress,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

module.exports = {
  addWorkout,
  getWorkouts,
  addEntry,
  getEntries,
  getUser,
  getUserByToken,
  createUser,
};
