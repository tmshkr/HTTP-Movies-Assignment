import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

function UpdateMovie(props) {
  const { movies } = props;
  const { handleSubmit, register, errors, setError, setValue } = useForm();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const found = movies.find(m => m.id === Number(id));
      if (found) {
        const values = [];
        for (let key in found) {
          values.push({ [key]: found[key] });
        }
        setValue(values);
      }
    }
  }, [movies]);

  const onSubmit = values => {
    console.log(values);
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
        {id ? "Edit Movie" : "Create Movie"}
      </Button>
      <span className="error">
        {errors.response && errors.response.message}
      </span>
    </form>
  );
}

export default UpdateMovie;
