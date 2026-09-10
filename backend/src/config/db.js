const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie_app",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err.message);
    return;
  }

  console.log("MySQL database connected successfully");
});

module.exports = db;
