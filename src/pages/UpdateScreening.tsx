import { Button, Stack, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import api from "../api/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import { DateTimePicker } from "@mantine/dates";
import dayjs from 'dayjs';
import { IUpdateScreeningDto } from "../Interfaces/IScreening.ts";

const UpdateScreening = () => {
  const { screeningId, movieId } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      screeningStartTime: new Date(),
      roomId: 0,
    },
    validate: {
        roomId: (id: number) => ((id < 0 || id == null) ? "A szoba Id-je pozitív egész szám legyen!" : null)
    }
  });


    /*
    *ToDo:
    * - befejezni a vetítés frisítését
    * - a vetítések kilistázásánál a film módosítás
    *   menünél törléskor törölje az adott vetítést
    */

  useEffect(() => {
    const getScreening = async () => {
        try {
        if (screeningId) {
            let res = await api.Screenings.getScreeningById(Number(screeningId));

            if (res) {

                form.setValues({
                    screeningStartTime: new Date(res.data.screeningStartTime) ? new Date(res.data.screeningStartTime) : new Date(),
                    roomId: res.data.roomId
                })
            }
            else {
                console.error("Nincs ilyen vetítés!");
                
            }
        }
        else {
            console.error("Nincs vetítés ID!");
        }
        }
        catch (error) {
            console.error(error);
        }
    }

    getScreening();
  }, [screeningId]);

  const handleSubmit = async (values: typeof form.values) => {
  try {
    
    let updateDto: IUpdateScreeningDto = {
        screeningStartTime: dayjs(values.screeningStartTime).format("YYYY-MM-DDTHH:mm:ss"),
        movieId: Number(movieId),
        roomId: values.roomId
    }

    await api.Screenings.updateScreening(String(screeningId), updateDto);
    console.log("Vetítés frissítve!");
    console.log(updateDto);
    
    navigate("/app/modifyMovie");
  } catch (error) {
    console.error("Hiba vetítés hozzáadásakor:", error);
  }
};

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <DateTimePicker
          key={form.key('screeningStartTime')}
          label="Vetítés kezdete"
          {...form.getInputProps("screeningStartTime")}
        />
        <NumberInput
          key={form.key('roomId')}
          label="Terem ID"
          min={1}
          {...form.getInputProps("roomId")}
        />
        <Button type="submit">Vetítés módosítása</Button>
      </Stack>
    </form>
  );
};

export default UpdateScreening;


