const express = require("express");
const cors = require("cors");
const db = require("./backend/src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("GET / received");
  res.send(`<h1>Movie App is running</h1>`);
});

const port = process.env.PORT || 5000;

//Import Movie Routes

const movieRoutes = require("./backend/src/routes/movieRoutes");

app.use("/api/movies", movieRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port} successfully`);
});
