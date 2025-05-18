import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {emailKeyName, roleKeyName, tokenKeyName} from "../constants/constants.ts";
import api from "../api/api.ts";
import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";

const useAuth = () => {
    const { token, setToken, email, setEmail, role, setRole  } = useContext(AuthContext);
    const isLoggedIn = !!token;

    // const login = (email: string, password: string) => {
    //     const loginData = {
    //         email: email,
    //         password: password
    //     };
    //     console.log('Attempting login with:', loginData);
    //     api.Auth.login(email, password)
    //         .then((res) => {
    //             console.log('Login response:', res);
    //             setToken(res.data.token);
    //             localStorage.setItem(tokenKeyName, res.data.token);
    //             const decodedToken: never = jwtDecode(res.data.token);
    //             const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    //             setRole(role);
    //             localStorage.setItem(roleKeyName, role);
    //             setEmail(email);
    //             localStorage.setItem(emailKeyName, email);
    //         })
    //         .catch((error) => {
    //             console.error('Login error:', error.response?.data || error.message);
    //             console.error('Full error object:', error);
    //         });
    // }
    const login = (email: string, password: string) => {
    const loginData = {
        email: email,
        password: password
    };
    console.log('Attempting login with:', loginData);

    return api.Auth.login(email, password)
        .then((res) => {
            console.log('Login response:', res);
            setToken(res.data.token);
            localStorage.setItem(tokenKeyName, res.data.token);

            const decodedToken: any = jwtDecode(res.data.token);
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']; // 🔹 Ez az ID kulcsa a legtöbb JWT-ben

            setRole(role);
            localStorage.setItem(roleKeyName, role);
            setEmail(email);
            localStorage.setItem(emailKeyName, email);
            localStorage.setItem('userId', userId); // 🔹 Elmentjük az ID-t is

            return { userId }; // 🔹 vissza is adjuk ha akarod használni
        })
        .catch((error) => {
            console.error('Login error:', error.response?.data || error.message);
            console.error('Full error object:', error);
            throw error;
        });
};


    const logout = () => {
        console.log('kijelentkezés')
        localStorage.clear();
        setToken(null);
        <Navigate to="/login/" />
    }

    useEffect(() => {

    }, []);

    return {login, logout, token, email, isLoggedIn, role, setRole};
}

export default useAuth;