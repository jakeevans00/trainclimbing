// const coinToss = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (Math.random() > 0.9) {
//       resolve(Math.random() > 0.5 ? "heads" : "tails");
//     } else {
//       reject("fell off table");
//     }
//   }, 3000);
// });

// console.log("Toss initiated");

// coinToss
//   .then((result) => console.log(result))
//   .catch((result) => console.log(result))
//   .finally(() => console.log("done with function"));

// console.log("at end");

async function cow() {
  return "moo";
}

console.log(cow());
