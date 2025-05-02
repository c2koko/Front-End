/*
 * a $values egy konvertálást segítő változó, amire a környezet hibát jelez, pedig nem rossz!
*/

import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import {useNavigate} from "react-router-dom";
//import axiosInstance from "../api/axios.config.ts";
import api from "../api/api.ts";
import {useState, useEffect} from "react";
import { IMovie } from '../Interfaces/IMovie.ts';

const Movies = () => {
    const [items, setItems] = useState<IMovie[]>([]); 
    const navigate = useNavigate();
    //useEffect(() => {api.Movies.getMove().then(res => {if (Array.isArray(res.data)) {setItems(res.data);} else {console.error("API response is not an array:", res.data);setItems([]);}console.log("Fetched data:", res.data);}).catch(err => {console.error("Error fetching movies:", err);setItems([]); }); }, []);
    //useEffect(() => {axiosInstance.get('/Movie').then(res => {setItems(res.data);console.log(res.data);})}, []);
    //useEffect(() => {api.Movies.getMovie().then(res => {setItems(res.data);console.log(res.data);})}, []);
    useEffect(() => {api.Movies.getMovie().then(res => {console.log("Nyers data", res.data);
      let dataToSet: IMovie[] = [];
      if (res.data && typeof res.data === 'object' && !Array.isArray(res.data) && Array.isArray(res.data.$values)) {console.log("Tömb bontás konvertálás elvégzése...", res.data.$values); 
      dataToSet = res.data.$values;}
      else if (Array.isArray(res.data)) {console.log("");dataToSet = res.data;}
      else {console.error("A végpont értelmezhetetlen a program számára", res.data);}
      setItems(dataToSet);
      }).catch(err => {console.error("Totális hiba, innentől kuka a kérés", err);
      setItems([]); });}, []); 

return ( <>
{Array.isArray(items) && items.length > 0 ? (
items.map(item => (
  <Card shadow="sm" padding="lg" radius="md" withBorder key={item.id} style={{ marginBottom: '1rem' }}>
  <Card.Section>
  <Image
    src={item.movieImg || '/image_jegymesterASCII.png'} height={160}alt={`${item.movieName ?? 'Movie'} film borítókép`}/>
    </Card.Section>
      <Group justify="space-between" mt="md" mb="xs"><Text fw={500}>{item.movieName}</Text>
        <Badge color="blue">MOST MEGTEKINTHETŐ!</Badge></Group>
      <Text size="sm" c="dimmed">
        {item.movieDescription}</Text>
      <Button color="blue" fullWidth mt="md" radius="md" onClick={() => navigate(`/app/screenings/${item.id}`)}>
        Jegyvásárlás
        </Button></Card>))) : (<Text>Nincsen elérhető film.</Text>)}</>);
}

export default Movies;