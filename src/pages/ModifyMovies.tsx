import {Button, TextInput, Textarea, Card, Group, Image, Text, Badge, Box} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import api from "../api/api.ts";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../api/axios.config.ts";
import { ICreateMovie, IMovie } from "../Interfaces/IMovie.ts";
import { useSetState } from "@mantine/hooks";

const ModifyMovies = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
      api.Movies.getMovie().then(res => {
        setMovies(res.data.$values);
        console.log(res.data.$values);
      });
    }, []);

    const cards = movies.map((movie) => (
      <Card shadow="sm" padding="md" radius="md" withBorder key={movie.id}>
      <Card.Section>
        <Image
          src={movie.movieImg}
          height={160}
          alt={movie.movieName}
        />
      </Card.Section>
      <Text size="lg">
        {movie.movieName}
      </Text>

      <Text size="sm" c="dimmed">
        {movie.movieDescription}
      </Text>

      <Group style={{
          display: "Flex",
          justifyContent: 'center',
          
      }}>
        <Button color="blue" mt="md" radius="md"  pl={'1rem'} pr={'1rem'}>
        Film módosítása
      </Button>
      <Button color="blue" mt="md" radius="md" pl={'1rem'} pr={'1rem'}>
        Vetítés módosítása
      </Button>
      <Button color="blue" mt="md" radius="md" pl={'1rem'} pr={'1rem'}>
        Törlés
      </Button>
      </Group>
    </Card>
      ));
    
    return <>
       <Card shadow="sm" padding="lg" radius="md" withBorder>
         {cards}
       </Card>
     </>
}

export default ModifyMovies;