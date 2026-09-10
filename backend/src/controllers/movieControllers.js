const db = require("../config/db");

const getAllMovies = (req, res) => {
  const sql = "select * from movies";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error Fetching Movies",
      });
    }

    res.status(200).json(results);
  });
};

const createMovie = (req, res) => {
  const { name, release_year, collection_amount, poster_url } = req.body;

  const sql = `INSERT INTO movies (name, release_year, collection_amount, poster_url) VALUES(?,?,?,?    )`;

  db.query(
    sql,
    [name, release_year, collection_amount, poster_url],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Error Creating Movies",
        });
      }
      res.status(201).json({
        message: "Movie Created Successfully",
        movieID: result.insertId,
      });
    },
  );
};

const updateMovie = (req, res) => {
  const { id } = req.params;
  const { name, release_year, collection_amount, poster_url } = req.body;

  console.log("ID:", req.params.id);
  console.log("BODY:", req.body);
  const sql = `UPDATE movies SET name = ?, release_year = ?, collection_amount = ?, poster_url = ? where id = ?`;

  db.query(
    sql,
    [name, release_year, collection_amount, poster_url, id],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Error Updating Movie",
        });
      }

      res.status(200).json({
        message: "Movie Updated Successfully",
      });
    },
  );
};

const deleteMovie = (req, res) => {
  const { id } = req.params;
  // const { name, release_year, collection_amount, poster_url } = req.body;
  const sql = `DELETE from movies where id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Error Deleting Movie",
      });
    }
    res.status(200).json({
      message: "Movie Deleted Successfully",
    });
  });
};

const getMovieByID = (req, res) => {
  const { id } = req.params;
  //   const { name, release_year, collection_amount, poster_url } = req.body;
  const sql = `SELECT * from movies where id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Error Getting Movie Details",
      });
    }
    console.log(result);
    res.status(200).json(result);
  });
};
module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieByID,
};
