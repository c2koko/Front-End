import { Button, TextInput, Textarea, Stack, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import api from "../api/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import { DateTimePicker } from "@mantine/dates";
import { IScreening, IUpdateScreeningDto } from "../Interfaces/IScreening.ts";

const UpdateScreening = () => {
  const { screeningId, movieId } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      screeningStartTime: new Date(),
      roomId: 0,
    },
    validate: {
        roomId: (id: number) => ((id >= 0 && id !== null) ? "A szoba Id-je pozitív egész szám legyen!" : null)
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
            let screening = res.data.$values;

            console.log(screening);

            if (screening) {

                form.setValues({
                    screeningStartTime: new Date(screening.screeningStartTime),
                    roomId: screening.roomId
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
        screeningStartTime: new Date(values.screeningStartTime).toISOString(),
        movieId: movieId,
        roomId: values.roomId
    }

    await api.Screenings.updateScreening(updateDto);
    // console.log("Vetítés létrehozva");
    navigate("/app/modifyMovie");
  } catch (error) {
    console.error("Hiba vetítés hozzáadásakor:", error);
  }
};

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <DateTimePicker
          label="Vetítés kezdete"
          {...form.getInputProps("screeningStartTime")}
        />
        <NumberInput
          label="Terem ID"
          min={1}
          {...form.getInputProps("roomId")}
        />
        <Button type="submit">Vetítés hozzáadása</Button>
      </Stack>
    </form>
  );
};

export default UpdateScreening;


