import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Text, Group, Button, Image } from "@mantine/core";
import api from "../api/api"; // ez tartalmazza a .Screenings.getScreening metódust
import { IScreening } from "../Interfaces/IScreening";
import { IconCalendar, IconClock } from '@tabler/icons-react';

const ScreeningsForMovie = () => {
  const { movieId } = useParams();
  const [screenings, setScreenings] = useState<IScreening[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    console.log("Vetítesek megtekintése")
    console.log(movieId)

    if (!movieId) return;
    api.Screenings.getScreening(movieId)
      .then((res) => {
        setScreenings(res.data.$values);
      })
      .catch((err) => {
        console.error("Hiba a vetítések lekérésekor:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  //if (loading) return <Text>Betöltés...</Text>;
  if (screenings.length === 0) return <Text>Nincs vetítés ehhez a filmhez.</Text>;

  console.log(screenings);

  const deleteScreening = async (id: string) => {
    try {
      console.log(id);
      await api.Screenings.deleteScreening(Number(id)); // Küldi a DELETE kérést
      setScreenings((prev) => prev.filter((screening) => screening.id !== Number(id))); // Frissít frontenden
    } catch (error) {
      console.error("Hiba a film törlésekor:", error);
    }
  };

  return (
    <>
      {screenings.map((screening) => {
    const screeningDate = screening.screeningStartTime
      ? new Date(screening.screeningStartTime).toLocaleDateString("hu-HU", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })
      : "Ismeretlen dátum";

    const screeningTime = screening.screeningStartTime
      ? new Date(screening.screeningStartTime).toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Ismeretlen időpont";

    return (
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        key={screening.id}
        style={{ marginBottom: "1rem" }}
      >
        <Group justify="space-between" mt="md" mb="xs">
          <div>
            <Group gap="xs" mb={5}>
              <IconCalendar size={18} stroke={1.5} />
              <Text fw={500}>{screeningDate}</Text>
            </Group>
            <Group gap="xs" mb={5}>
              <IconClock size={18} stroke={1.5} />
              <Text>{screeningTime}</Text>
            </Group>
          </div>

          <Group mt="md" gap="md">
            <Button
              color="blue"
              mt="md"
              radius="md"
              onClick={() => navigate(`/app/updateScreening/${movieId}/${screening.id}`)}
            >
              Módosítás
            </Button>

            <Button
              color="blue"
              mt="md"
              radius="md"
              onClick={() => deleteScreening(screening.id.toString())}
            >
              Törlés
            </Button>
          </Group>
        </Group>
      </Card>
    );
  })}
</>
  );
};

export default ScreeningsForMovie;