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
      duration: (value: number) => (isNaN(value) ? 'A hossz szám legyen' : null),
      title: (value: string) => (value.length < 2 ? 'A cím túl rövid' : null),
    },
  });

  useEffect(() => {
    // Betöltjük az adott film adatait
    const fetchMovie = async () => {
      try {
        const res = await api.Movies.getMovieById(id!);
        const movie = res.data;

        console.log("Film adatok:", movie);
        

        if (movie) {
          form.setValues({
            title: movie.movieName,
            // Ha kép nem létezik, aakkor egy alapértelmezett urlt kap
            coverUrl: (movie.movieImg ? movie.movieImg : '/image_jegymesterASCII.png'),
            // Ha a leírás nem létezik, akkor egy üres stringet kap
            description: (movie.movieDescription ? movie.movieDescription : ''),
            duration: movie.movieDuration
          });

        }
      } catch (error) {
        console.error("Hiba a film lekérésekor:", error);
      }
    };

    fetchMovie();
    console.log(form.values);
  }, [id]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const updateData: IMovieUpdate = {
        movieName: values.title,
        movieImg: values.coverUrl,
        movieDescription: values.description,
        movieDuration: Number(values.duration),
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
        <TextInput key={form.key('title')} label="Film neve" withAsterisk {...form.getInputProps("title")} />
        <TextInput key={form.key('movieImg')} label="Borítókép URL" {...form.getInputProps("coverUrl")} />
        <Textarea key={form.key('description')} label="Leírás" {...form.getInputProps("description")} maxRows={5} />
        <NumberInput key={form.key('duration')} label="Hossz" {...form.getInputProps("duration")} suffix=" perc" clampBehavior="strict"  min={0} />
        <Button type="submit">Módosítás mentése</Button>
      </Stack>
    </form>
  );
};

export default UpdateMovie;