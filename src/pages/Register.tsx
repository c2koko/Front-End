// import { useState } from "react";
// import { TextInput, PasswordInput, Button, Group, Box, Title, Notification } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import api from '../api/api';

// interface IUserRegisterDto {
//   username: string;
//   password: string;
//   email: string;
// }

// export const Register = () => {
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const form = useForm<IUserRegisterDto>({
//     initialValues: {
//       username: '',
//       password: '',
//       email: '',
//     },

//     validate: {
//       email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Érvénytelen email cím'),
//       password: (value) => (value.length < 6 ? 'Legalább 6 karakter' : null),
//       username: (value) => (value.length < 3 ? 'Legalább 3 karakter' : null),
//     },
//   });

//   const handleSubmit = async (values: IUserRegisterDto) => {
//     setError(null);
//     try {
//       await api.Auth.registerUser({
//         ...values,
//         name: '',
//         phone: '',
//         roleId: 1, // default role ID
//       });
//       setSuccess(true);
//       form.reset();
//     } catch (err: any) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Regisztráció sikertelen');
//     }
//   };

//   return (
//     <Box mx="auto" mt="xl">
//       <Title order={2} mb="lg">Regisztráció</Title>
//       {success && (
//         <Notification color="green" mb="md">
//           Sikeres regisztráció! Bejelentkezhetsz.
//         </Notification>
//       )}
//       {error && (
//         <Notification color="red" mb="md">
//           {error}
//         </Notification>
//       )}
//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <TextInput
//           label="Felhasználónév"
//           placeholder="pl. user123"
//           {...form.getInputProps('username')}
//           mb="sm"
//         />
//         <PasswordInput
//           label="Jelszó"
//           placeholder="Jelszó"
//           {...form.getInputProps('password')}
//           mb="sm"
//         />
//         <TextInput
//           label="Email"
//           placeholder="email@cím.hu"
//           {...form.getInputProps('email')}
//           mb="lg"
//         />
//         <Group >
//           <Button type="submit">Regisztrálás</Button>
//         </Group>
//       </form>
//     </Box>
//   );
// };

// export default Register;
import { useState } from "react";
import { TextInput, PasswordInput, Button, Group, Box, Title, Notification } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import useAuth from '../hooks/useAuth.tsx';

interface IUserRegisterDto {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<IUserRegisterDto>({
    initialValues: {
      username: '',
      password: '',
      email: '',
      phone: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Érvénytelen email cím'),
      password: (value) => (value.length < 6 ? 'Legalább 6 karakter' : null),
      username: (value) => (value.length < 3 ? 'Legalább 3 karakter' : null),
      phone: (value) => (value.length < 10 ? 'Legalább 11 karakter' : null),
    },
  });

  const handleSubmit = async (values: IUserRegisterDto) => {
    setError(null);
    try {
      await api.Auth.registerUser({
        ...values,
        name: '',
        
        roleId: 2,
      });
      // automatikus bejelentkezés regisztráció után
      await login(values.email, values.password);
      setSuccess(true);
      navigate('/app');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Regisztráció sikertelen');
    }
  };

  return (
    <Box mx="auto" mt="xl" >
      <Title order={2} mb="lg">Regisztráció</Title>
      {success && (
        <Notification color="green" mb="md">
          Sikeres regisztráció és bejelentkezés!<br />Átirányítás...
        </Notification>
      )}
      {error && (
        <Notification color="red" mb="md">
          {error}
        </Notification>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Felhasználónév"
          placeholder="pl. user123"
          {...form.getInputProps('username')}
          mb="sm"
        />
        <TextInput
          label="Phone"
          placeholder="telefonszám"
          {...form.getInputProps('phone')}
          mb="lg"
        />
        <PasswordInput
          label="Jelszó"
          placeholder="Jelszó"
          {...form.getInputProps('password')}
          mb="sm"
        />
        <TextInput
          label="Email"
          placeholder="email@cím.hu"
          {...form.getInputProps('email')}
          mb="lg"
        />
        <Group >
          <Button type="submit">Regisztrálás</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Register;
