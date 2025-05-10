/*import { Card, Image, Text, Badge, Button, Group, Box, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'
import {useNavigate, useParams} from "react-router-dom";
//import axiosInstance from "../api/axios.config.ts";
import api from "../api/api.ts";
import {useState, useEffect} from "react";
import { IMovie } from '../Interfaces/IMovie.ts';
import { IScreening } from '../Interfaces/IScreening.ts';
import { IconCalendar, IconClock, IconMapPin } from '@tabler/icons-react';


const Screenings = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const [items, setItems] = useState<IScreening[]>([]); 
    const navigate = useNavigate();
    const { movieId } = useParams<{ movieId: string }>();
    useEffect(() => {
        api.Screenings.getScreening(movieId).then(res => {
        setItems(res.data);
        console.log(`Vetítések lekérése ehhez a filmhez: ${movieId}. movieId`);
        console.log(res.data);})}, [movieId]);

return ( <>

    {Array.isArray(items) && items.length > 0 ? (
    items.map(item => (
      <Card shadow="sm" padding="lg" radius="md" withBorder key={item.id} style={{ marginBottom: '1rem' }}>
          <Group justify="space-between" mt="md" mb="xs"><Text fw={500}>{item.screeningLocation}</Text>
            <Badge color="blue">{item.screeningStartTime}</Badge></Group>
          <Text size="sm" c="dimmed">
            {item.screeningLocation}</Text>
          <Button color="blue" fullWidth mt="md" radius="md" onClick={() => navigate(`/app/screenings/${item.id}`)}>
            Szék(ek) kiválasztása
            </Button></Card>))) : (<Text>Nincsen elérhető vetítés.</Text>)}</>);
    
}

export default Screenings;*/

import { Card, Text, Button, Group, Box, Collapse } from '@mantine/core'; // Box, Collapse ha kell a Fontos infókhoz
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import { useState, useEffect } from 'react';
import { IScreening } from '../Interfaces/IScreening';
import { IconCalendar, IconClock, IconMapPin } from '@tabler/icons-react';

const Screenings = () => {
    const [opened, { toggle }] = useDisclosure(false); // A Collapse-hez
    // Helyes state név és típus
    const [screenings, setScreenings] = useState<IScreening[]>([]);
    const navigate = useNavigate();
    const { movieId } = useParams<{ movieId: string }>();

    useEffect(() => {
        if (!movieId) {
            console.error("Movie ID is missing from URL");
            setScreenings([]);
            return;
        }

        // Használd a helyes API függvényt (feltételezve: getScreeningsByMovieId)
        api.Screenings.getScreening(movieId).then(res => {
            // Logold a nyers választ
            console.log(`Vetítések lekérése ehhez a filmhez: ${movieId}. movieId`);
            console.log("API Response Data:", res.data);

            let potentialScreenings: IScreening[] = [];

            // --- Adat Kinyerés és Tömbösítés ---
            if (res.data?.$values && Array.isArray(res.data.$values)) {
                potentialScreenings = res.data.$values;
            } else if (Array.isArray(res.data)) {
                potentialScreenings = res.data;
            } else if (res.data && typeof res.data === 'object') {
                 potentialScreenings = [res.data as IScreening]; // Egyetlen objektum becsomagolása tömbbe
            }
            // --- Kinyerés vége ---

            // --- Szűrés a jövőbeli dátumokra ---
            const now = new Date();
            const futureScreenings = potentialScreenings.filter(screening => {
                try {
                    return screening?.screeningStartTime && new Date(screening.screeningStartTime) > now;
                } catch { return false; }
            });
            // --- Szűrés vége ---

            console.log("Filtered future screenings:", futureScreenings); // Logold a szűrt eredményt
            setScreenings(futureScreenings); // <-- A HELYES: a szűrt TÖMBBÖT állítod be!

        }).catch(err => {
            console.error("Hiba a vetítések lekérésekor:", err);
            setScreenings([]);
        });
    }, [movieId]);

    // --- Javított Renderelés ---
    return (
         <>
            {/* A state változó neve itt is 'screenings' legyen */}
            {screenings.length > 0 ? (
                screenings.map(item => { // 'item' vagy 'screening', ahogy jobban tetszik
                    // Dátum/idő formázása
                    const screeningDate = item.screeningStartTime ? new Date(item.screeningStartTime).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) : 'Ismeretlen dátum';
                    const screeningTime = item.screeningStartTime ? new Date(item.screeningStartTime).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }) : 'Ismeretlen időpont';

                    return (
                        // Javított kártya tartalom és navigáció
                        <Card shadow="sm" padding="lg" radius="md" withBorder key={item.id} style={{ marginBottom: '1rem' }}>
                            <Group justify="space-between" mt="md" mb="xs">
                                <div>
                                    <Group gap="xs" mb={5}><IconCalendar size={18} stroke={1.5} /><Text fw={500}>{screeningDate}</Text></Group>
                                    <Group gap="xs" mb={5}><IconClock size={18} stroke={1.5} /><Text>{screeningTime}</Text></Group>
                                    {/*<Group gap="xs"><IconMapPin size={18} stroke={1.5} /><Text size="sm" c="dimmed">{item.screeningLocation || 'Ismeretlen helyszín'}</Text></Group>*/}
                                </div>
                                {/* JAVÍTOTT NAVIGÁCIÓ: /app/seats/ */}
                                <Button color="blue" mt="md" radius="md" onClick={() => navigate(`/app/seats/${item.id}`)}>
                                    Szék(ek) kiválasztása
                                </Button>
                            </Group>
                        </Card>
                    );
                })
            ) : (
                <Text>Nincsen elérhető (jövőbeli) vetítés.</Text>
            )}

             {/* Fontos Információk rész (a map-en KÍVÜL) */}
             <Box maw={400} mx="auto" mt="xl">
                 <Group justify="center" mb={5}>
                     <Button onClick={toggle}>Fontos információk</Button>
                 </Group>
                 <Collapse in={opened}>
                     <Card withBorder p="md" radius="md">
                         <Text>Tisztelt Vásárlónk! Felhívjuk szíves figyelmét, hogy a regisztrált felhasználók a vásárlást követően megtekinthetik a profiljukban a megvásárolt jegyek listáját. Amennyiben mégsem kívánják igénybe venni a jegyet, lehetőségük van a vásárlás törlésére legkésőbb a vetítés kezdete előtt 4 órával. Köszönjük!</Text>
                     </Card>
                 </Collapse>
             </Box>
         </>
    );
}

export default Screenings;

