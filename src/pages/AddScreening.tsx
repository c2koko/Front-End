import { Button, NumberInput, Stack } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api.ts"; // majd bővítjük a screening metódussal

const AddScreening = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      screeningStartTime: new Date(),
      roomId: 1,
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
  try {
    const screeningData = {
      screeningStartTime: dayjs(values.screeningStartTime).format("YYYY-MM-DDTHH:mm:ss"),
      movieId: Number(movieId),
      roomId: values.roomId,
    };

    await api.Screenings.createScreening(screeningData);
    console.log("Vetítés létrehozva!");
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

export default AddScreening;
