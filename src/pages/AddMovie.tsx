import {Button, TextInput, Textarea, rem, Stack, NumberInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import api from "../api/api.ts";
import {useParams} from "react-router-dom";
import axiosInstance from "../api/axios.config.ts";
import { ICreateMovie } from "../Interfaces/IMovie.ts";


const AddMovies = () => {
    
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
          title: (value: string) => (Number(value.length) < 2 ? 'A címnek hosszsabnak kell elnnie 2 karakternél!' : null) 
        }
    })
    
    const handleSubmit = async (values: typeof form.values) => {

    try {

      const response = await api.Movies.createMovie({
        movieName: values.title,
        movieImg: values.coverUrl,
        movieDescription: values.description,
        movieDuration: values.duration
      });

      console.log('Sikeres mentés:', response.data);
      form.reset(); // üríti az inputokat
    } catch (error) {
      console.error('Hiba történt mentés közben:', error);
    }
  };


    return <>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack style={{
              minWidth:"50rem",
              }}>
                <TextInput label="Film neve" placeholder="A Gyűrűk Ura: A gyűrű szövetsége" maxLength={100} w={"30%"} withAsterisk key={form.key('title')} {...form.getInputProps('title')}/>
                <TextInput label="Film borítójának URL-je" placeholder="https://www.example.com/cover" maxLength={150} w={"30%"} key={form.key("coverUrl")} {...form.getInputProps('coverUrl')}/>
                <Textarea label="Film rövid leírása" placeholder="A meek Hobbit from the Shire and eight companions..." maxLength={250} w={"30%"} h={"30%"} maxRows={5} key={form.key("description")} {...form.getInputProps('description')}/>
                <NumberInput label="Film hossza" placeholder="120" clampBehavior="strict" w={"5rem"} key={form.key("druation")} {...form.getInputProps('duration') }/>
                <Button w={"30%"} type="submit">Hozzáadás</Button>
            </Stack>
        </form>
    </>
}

export default AddMovies;