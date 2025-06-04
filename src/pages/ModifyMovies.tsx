import {Button, Card, Group, Image, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import api from "../api/api.ts";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../Interfaces/IMovie.ts";

const ModifyMovies = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
      api.Movies.getMovie().then(res => {
        setMovies(res.data.$values);
        console.log(res.data.$values);
      });
    }, []);


    const deleteMovie = async (id: string) => {
    try {
      console.log(id);
      await api.Movies.deleteMovie(id); // Küldi a DELETE kérést
      setMovies((prev) => prev.filter((movie) => movie.id !== Number(id))); // Frissít frontenden
    } catch (error) {
      console.error("Hiba a film törlésekor:", error);
    }
  };

    const cards = movies.map((movie) => (
      <Card shadow="sm" padding="md" radius="md" withBorder key={movie.id} mt={"md"}>
      <Card.Section>
        <Image
          src={movie.movieImg || '/image_jegymesterASCII.png'} height={160}alt={`${movie.movieName ?? 'Movie'} film borítókép`}
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
        <Button color="blue" mt="md" radius="md"  pl={'1rem'} pr={'1rem'} onClick={() => navigate(`/app/updatemovie/${movie.id}`)}>
        Film módosítása
      </Button>
      <Button color="blue" mt="md" radius="md" pl={'1rem'} pr={'1rem'} onClick={() => navigate(`/app/addscreening/${movie.id}`)}>
        Vetítés hozzáadása
      </Button>
      <Button color="blue" mt="md" radius="md" pl={'1rem'} pr={'1rem'} onClick={() => navigate(`/app/modifymoviescreening/${movie.id}`)}>
        Vetítések megtekintése
      </Button>
      <Button color="blue" mt="md" radius="md" pl={'1rem'} pr={'1rem'} onClick={() =>deleteMovie(movie.id.toString())}>
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