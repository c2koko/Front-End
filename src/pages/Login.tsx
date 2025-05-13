import {
    Stack,
    TextInput,
    PasswordInput,
    Group,
    Button,
    Anchor, Divider
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import AuthContainer from "../components/AuthContainer.tsx";
import useAuth from "../hooks/useAuth.tsx";

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Kérlek adj meg egy érvényes e-mail címet.'),
            password: (val: string) => (val.length <= 6 ? 'A jelszó nem tartalmaz legalább 6 karaktert' : null),
        },
    });


    const submit = () => {
        login(form.values.email, form.values.password)
    }

    return <AuthContainer>
        <div>
            <form onSubmit={form.onSubmit(submit)}>
                <Stack>
                    <TextInput
                        required
                        label="E-mail cím"
                        placeholder="ide írd az e-mail címed"
                        key={form.key('email')}
                        radius="md"
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        required
                        label="Jelszó"
                        placeholder="ide írd a jelszavad"
                        key={form.key('password')}
                        radius="md"
                        {...form.getInputProps('password')}
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    {/* <Anchor component="button" type="button" c="dimmed" onClick={() => navigate('/forgot')}
                            size="xs">
                        Elfelejtetted a jelszavad?
                    </Anchor> */}
                    <Button type="submit" radius="xl">
                        Bejelentkezés
                    </Button>
                </Group>
                <Divider my="lg"/>
                <Anchor component="button" type="button" c="dimmed" size="sm" onClick={() => { login("________@________.________", "________"); }} > Nem szeretnék belépni </Anchor>
            </form>
        </div>
    </AuthContainer>
}

export default Login;