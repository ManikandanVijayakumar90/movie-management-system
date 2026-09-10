const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieByID,
} = require("../controllers/movieControllers");

router.get("/", getAllMovies);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
router.get("/:id", getMovieByID);

module.exports = router;
