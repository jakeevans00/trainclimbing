const express = require("express");
const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.JSON);

app.use(express.static("public"));

var apiRouter = express.Router();
app.use("/api", apiRouter);

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(PORT, () => console.log(`Connection active at port ${PORT}`));
