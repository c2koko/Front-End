import { Button, TextInput, Textarea, Stack, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import api from "../api/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import { IMovieUpdate } from "../Interfaces/IMovie.ts";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      coverUrl: '',
      description: '',
      duration: 0,
    },
    validate: {
      duration: (value: number) => (isNaN(Number(value)) ? 'A hossz szám legyen' : null),
      title: (value: string) => (value.length < 2 ? 'A cím túl rövid' : null),
    },
  });

  useEffect(() => {
    // Betöltjük az adott film adatait
    const fetchMovie = async () => {
      try {
        const res = await api.Movies.getMovie(); // az összes filmet lekéri
        const movie = res.data.$values.find((m: any) => m.id === Number(id));
        if (movie) {
          form.setValues({
            title: movie.movieName,
            coverUrl: movie.movieImg,
            description: movie.movieDescription,
            duration: movie.movieDuration,
          });
        }
      } catch (error) {
        console.error("Hiba a film lekérésekor:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const updateData: IMovieUpdate = {
        movieName: values.title,
        movieImg: values.coverUrl,
        movieDescription: values.description,
        movieDuration: values.duration,
      };

      await api.Movies.updateMovie(id!, updateData);
      console.log("Film módosítva!");
      navigate("/app/modifyMovie"); // visszairányítás
    } catch (error) {
      console.error("Hiba a módosításkor:", error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack style={{ minWidth: "50rem" }}>
        <TextInput label="Film neve" withAsterisk {...form.getInputProps("title")} />
        <TextInput label="Borítókép URL" {...form.getInputProps("coverUrl")} />
        <Textarea label="Leírás" {...form.getInputProps("description")} maxRows={5} />
        <NumberInput label="Hossz (perc)" {...form.getInputProps("duration")} clampBehavior="strict" />
        <Button type="submit">Módosítás mentése</Button>
      </Stack>
    </form>
  );
};

export default UpdateMovie;