import { Button, Card, Group, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../api/api.ts";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../Interfaces/IMovie.ts";

const CashierListMovies = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.Movies.getMovie().then(res => {
        setMovies(res.data.$values);
        console.log(res.data.$values);
      });
    }, []);


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
      <Button w={"30%"} color="blue" mt="md" radius="md" pl={'1rem'} pr={'1rem'} onClick={() => navigate(`/app/cashierlistcreenings/${movie.id}`)}>
        Vetítések megtekintése
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

export default CashierListMovies;