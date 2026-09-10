import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [editErrors, setEditErros] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(setErrors);

  const [formData, setFormData] = useState({
    name: "",
    release_year: "",
    collection_amount: "",
    poster_url: "",
  });

  const [editMovie, setEditMovie] = useState(null);

  //Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Movie Name is Required";
    }

    if (!formData.release_year.trim()) {
      newErrors.release_year = "Release Year is Required";
    }

    if (!formData.collection_amount.trim()) {
      newErrors.collection_amount = "Collection Amount is Required";
    }

    if (!formData.poster_url.trim()) {
      newErrors.poster_url = "Poster URL is Required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log("Submit Clicked");
    axios
      .post(
        "https://movie-management-system-eptg.onrender.com/api/movies",
        formData,
      )
      .then((response) => {
        console.log(response.data);
        setShowForm(false);
        axios
          .get(
            "https://movie-management-system-eptg.onrender.com/api/movies",
            formData,
          )
          .then((response) => {
            setMovies(response.data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Delete Movie
  const deleteMovie = (id) => {
    // e.preventDefault();
    console.log("Delete Button Clicked");
    axios
      .delete(
        `https://movie-management-system-eptg.onrender.com/api/movies/${id}`,
      )
      .then((response) => {
        console.log(response.data);
        axios
          .get(
            "https://movie-management-system-eptg.onrender.com/api/movies",
            formData,
          )
          .then((response) => {
            setMovies(response.data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Edit Movie
  const handleUpdate = (id, e) => {
    e.preventDefault();
    console.log("Update Button Clicked");

    const newErrors = {};

    if (!editMovie.name.trim()) {
      newErrors.name = "Moviename is required";
    }
    if (!editMovie.release_year) {
      newErrors.release_year = "Release year is required";
    }
    if (!editMovie.collection_amount) {
      newErrors.collection_amount = "Collection amount is required";
    }
    if (!editMovie.poster_url.trim()) {
      newErrors.poster_url = "Poster URL is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setEditErros(newErrors);
      return;
    }
    axios
      .put(
        `https://movie-management-system-eptg.onrender.com/api/movies/${id}`,
        editMovie,
      )
      .then((response) => {
        console.log(response.data);
        axios
          .get("https://movie-management-system-eptg.onrender.com/api/movies")
          .then((response) => {
            setMovies(response.data);
            setEditMovie(null);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //HandleUpdate

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get("https://movie-management-system-eptg.onrender.com/api/movies")
      .then((response) => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load movies. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Movie Management System</h1>
      <div>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          Add Movie
        </button>
        {showForm && (
          <form className="movie-form" onSubmit={handleSubmit}>
            <div className="movie-form">
              <h2>Add Movie</h2>

              <input
                id="movie_name"
                type="text"
                placeholder="Movie Name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    name: "",
                  });
                }}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <p>{errors.name}</p>}
              <input
                id="release_year"
                type="number"
                placeholder="Release Year"
                value={formData.release_year}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    release_year: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    release_year: "",
                  });
                }}
                className={errors.name ? "input-error" : ""}
              />
              {errors.release_year && <p>{errors.release_year}</p>}
              <input
                id="collection_amount"
                type="number"
                placeholder="Collection Amount"
                value={formData.collection_amount}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    collection_amount: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    collection_amount: "",
                  });
                }}
                className={errors.name ? "input-error" : ""}
              />
              {errors.collection_amount && <p>{errors.collection_amount}</p>}
              <input
                id="poster_url"
                type="text"
                placeholder="Poster URL"
                value={formData.poster_url}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    poster_url: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    poster_url: "",
                  });
                }}
                className={errors.name ? "input-error" : ""}
              />
              {errors.poster_url && <p>{errors.poster_url}</p>}

              <button type="submit" className="add-btn">
                Add
              </button>

              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>

      {loading ? (
        <p className="loading-message">Loading movies...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => {
            return (
              <div className="movie-card" key={movie.id}>
                <img src={movie.poster_url} alt={movie.name} />

                <div className="movie-info">
                  <h2>{movie.name}</h2>
                  <p>Release Year: {movie.release_year}</p>
                  <p>
                    Box Office Collection: ₹{" "}
                    {Number(movie.collection_amount).toLocaleString("en-IN")}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Delete Movie
                  </button>

                  {editMovie?.id === movie.id && (
                    <form onSubmit={(e) => handleUpdate(editMovie.id, e)}>
                      {" "}
                      <div className="movie-form">
                        {" "}
                        <h2>Edit Movie</h2>{" "}
                        <input
                          id="movie_name"
                          type="text"
                          placeholder="Movie Name"
                          value={editMovie.name}
                          onChange={(e) =>
                            setEditMovie({ ...editMovie, name: e.target.value })
                          }
                          className={editErrors.name ? "input-error" : ""}
                        />{" "}
                        {editErrors.name && <p>{editErrors.name}</p>}{" "}
                        <input
                          id="release_year"
                          type="number"
                          placeholder="Release Year"
                          value={editMovie.release_year}
                          onChange={(e) =>
                            setEditMovie({
                              ...editMovie,
                              release_year: e.target.value,
                            })
                          }
                          className={
                            editErrors.release_year ? "input-error" : ""
                          }
                        />{" "}
                        {editErrors.release_year && (
                          <p>{editErrors.release_year}</p>
                        )}{" "}
                        <input
                          id="collection_amount"
                          type="number"
                          placeholder="Collection Amount"
                          value={editMovie.collection_amount}
                          onChange={(e) =>
                            setEditMovie({
                              ...editMovie,
                              collection_amount: e.target.value,
                            })
                          }
                          className={
                            editErrors.collection_amount ? "input-error" : ""
                          }
                        />{" "}
                        {editErrors.collection_amount && (
                          <p>{editErrors.collection_amount}</p>
                        )}{" "}
                        <input
                          id="poster_url"
                          type="text"
                          placeholder="Poster URL"
                          value={editMovie.poster_url}
                          onChange={(e) =>
                            setEditMovie({
                              ...editMovie,
                              poster_url: e.target.value,
                            })
                          }
                          className={editErrors.poster_url ? "input-error" : ""}
                        />{" "}
                        {editErrors.poster_url && (
                          <p>{editErrors.poster_url}</p>
                        )}{" "}
                        <button type="submit">Save</button>{" "}
                        {/* <button onClick={() => setShowForm(false)}>Cancel</button> */}{" "}
                      </div>{" "}
                    </form>
                  )}

                  {editMovie?.id !== movie.id && (
                    <button
                      className="edit-btn"
                      onClick={() => setEditMovie(movie)}
                    >
                      Edit Movie
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
