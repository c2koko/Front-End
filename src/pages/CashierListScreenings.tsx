import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Text, Group, Button, Image } from "@mantine/core";
import api from "../api/api"; // ez tartalmazza a .Screenings.getScreening metódust
import { IScreening } from "../Interfaces/IScreening";
import { IconCalendar, IconClock } from '@tabler/icons-react';

const CashierListScreenings = () => {
  const { movieId, screeningId } = useParams();
  const [screenings, setScreenings] = useState<IScreening[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

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

            <Button
                color="blue"
                mt="md"
                radius="md"
                onClick={() => navigate(`/app/verifytickets/${movieId}/${screening.id}/verify`)}
            >
                Jegyek
            </Button>
        </Group>
      </Card>
    );
  })}
</>
  );
};

export default CashierListScreenings;