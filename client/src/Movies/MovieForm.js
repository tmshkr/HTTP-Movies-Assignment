import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

function MovieForm(props) {
  const { movies, getMovieList } = props;
  const { handleSubmit, register, errors, setError, setValue } = useForm();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let found = movies.find(m => m.id === Number(id));
      if (found) {
        found = { ...found };
        found.stars = found.stars.join(", ");
        const values = [];
        for (let key in found) {
          values.push({ [key]: found[key] });
        }
        console.log(values);
        setValue(values);
      }
    }
  }, [movies]);

  const addMovie = values => {
    values.stars.includes(",")
      ? (values.stars = values.stars.split(",").map(s => s.trim()))
      : (values.stars = [values.stars]);

    axios.post("http://localhost:5000/api/movies", values).then(res => {
      getMovieList();
      history.push("/");
    });
  };

  const updateMovie = (id, values) => {
    values.stars.includes(",")
      ? (values.stars = values.stars.split(",").map(s => s.trim()))
      : (values.stars = [values.stars]);
    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        id: Number(id),
        ...values
      })
      .then(res => {
        console.log(res);
        getMovieList();
        history.push("/");
      })
      .catch(err => console.dir(err));
  };

  const onSubmit = values => {
    id ? updateMovie(id, values) : addMovie(values);
  };

  return (
    <form className="form movie-form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="title">Title</Label>
        <input
          className="form-control"
          name="title"
          type="text"
          id="title"
          ref={register({
            required: "Required"
          })}
        />
        <span className="error">{errors.name && errors.name.message}</span>
      </FormGroup>
      <FormGroup>
        <Label for="director">Director</Label>
        <input
          className="form-control"
          type="text"
          name="director"
          id="director"
          ref={register({
            required: "Required"
          })}
        />
        <span className="error">{errors.age && errors.age.message}</span>
      </FormGroup>
      <FormGroup>
        <Label for="stars">Stars</Label>
        <input
          className="form-control"
          type="text"
          name="stars"
          id="stars"
          ref={register({
            required: "Required"
          })}
        />
        <span className="error">{errors.age && errors.age.message}</span>
      </FormGroup>
      <FormGroup>
        <Label for="metascore">Metascore</Label>
        <input
          className="form-control"
          type="number"
          name="metascore"
          id="metascore"
          ref={register({
            required: "Required"
          })}
        />
        <span className="error">{errors.height && errors.height.message}</span>
      </FormGroup>
      <Button type="submit" color="primary" size="lg" block>
        {id ? "Edit Movie" : "Add Movie"}
      </Button>
      <span className="error">
        {errors.response && errors.response.message}
      </span>
    </form>
  );
}

export default MovieForm;
