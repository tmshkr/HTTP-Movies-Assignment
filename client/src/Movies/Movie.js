import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const { addToSavedList, getMovieList } = props;
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        getMovieList();
        history.push("/");
      })
      .catch(err => console.dir(err));
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="movie">
      <MovieCard movie={movie} />

      <Button color="primary" onClick={saveMovie}>
        Save
      </Button>
      <Button color="info" onClick={() => history.push(`/update-movie/${id}`)}>
        Edit
      </Button>
      <Button color="danger" onClick={deleteMovie}>
        Delete
      </Button>
    </div>
  );
}

export default Movie;
