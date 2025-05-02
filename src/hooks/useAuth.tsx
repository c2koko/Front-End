import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {emailKeyName, roleKeyName, tokenKeyName} from "../constants/constants.ts";
import api from "../api/api.ts";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
    const { token, setToken, email, setEmail, role, setRole  } = useContext(AuthContext);
    const isLoggedIn = !!token;

    const login = (email: string, password: string) => {
        const loginData = {
            email: email,
            password: password
        };
        console.log('Attempting login with:', loginData);
        api.Auth.login(email, password)
            .then((res) => {
                console.log('Login response:', res);
                setToken(res.data.token);
                localStorage.setItem(tokenKeyName, res.data.token);
                const decodedToken: never = jwtDecode(res.data.token);
                const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                setRole(role);
                localStorage.setItem(roleKeyName, role);
                setEmail(email);
                localStorage.setItem(emailKeyName, email);
            })
            .catch((error) => {
                console.error('Login error:', error.response?.data || error.message);
                console.error('Full error object:', error);
            });
    }

    const logout = () => {
        localStorage.clear();
        setToken(null);
    }

    useEffect(() => {

    }, []);

    return {login, logout, token, email, isLoggedIn, role, setRole};
}

export default useAuth;