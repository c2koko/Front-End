import {Navigate, Route, Routes} from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout.tsx";
import useAuth from "../hooks/useAuth.tsx";
import {routes} from "./Routes.tsx";
import {ReactElement} from "react";

const PrivateRoute = ({element}: {element: ReactElement}) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? element : element;//<Navigate to="/login" />;
};

const AuthenticatedRedirect = ({element}: {element: ReactElement}) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to="/app" /> : element;
};



const Routing = () => {

    return <Routes>
        <Route
            path="/"
            element={<AuthenticatedRedirect element={<Navigate to="login" />} />}
        />
        {
            routes.filter(route => !route.isPrivate).map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<AuthenticatedRedirect element={route.component} />}
                />
            ))
        }
        <Route
            path="app"
            element={<PrivateRoute element={<BasicLayout />} />}>
            <Route
                path=""
                element={<Navigate to="movies" />}
            />
            {
                routes.filter(route => route.isPrivate).map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<PrivateRoute element={route.component} />}
                    />
                ))
            }
        </Route>
    </Routes>
}

export default Routing;
/*
import {Navigate, Route, Routes} from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout.tsx";
import useAuth from "../hooks/useAuth.tsx";
import {routes} from "./Routes.tsx";
import {ReactElement} from "react";

const PrivateRoute = ({element}: {element: ReactElement}) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? element : 
    <Navigate to="/login" 
    />;
};

const AuthenticatedRedirect = ({element}: {element: ReactElement}) => {
    const { isLoggedIn } = useAuth();
    // Ha be van lépve és publikus oldalra menne (pl. /login), átirányít /app-ra
    return isLoggedIn ? <Navigate to="/app" /> : element;
};

const Routing = () => {
    return (
        <Routes>
            {routes
                .filter((route) => !route.isPrivate) // Csak a publikus útvonalak
                .map((route) => (
                    <Route
                        key={route.path}
                        // Ezeknek teljes útvonalnak kell lenniük, pl. "/login"
                        path={route.path}
                        // Ha be van lépve, a publikus oldalak átirányítanak /app-ra
                        element={<AuthenticatedRedirect element={route.component} />}
                    />
                ))}

            <Route
                path="app" // Az összes védett útvonal alapja
                element={<PrivateRoute element={<BasicLayout />} />} // A Layout komponens védelme

                <Route index element={<Navigate to="movies" replace />} />

                {routes
                    .filter((route) => route.isPrivate) // Csak a privát útvonalak
                    .map((route) => (
                        <Route
                            key={route.path}
                            // Az útvonalak itt RELATÍVAK az /app-hoz
                            // Pl.: 'movies', 'screenings/:movieId', 'seats/:screeningId'
                            path={route.path}
                            // Itt már nem kell újra PrivateRoute, mert a szülő ("/app") már védi
                            element={route.component}
                        />
                    ))}
            </Route>

            <Route path="*" element={
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                    <img  src="/image_jegymesterASCII.png" alt="404 - Nem található"style={{  maxWidth: "100%", height: "auto", marginBottom: "1rem" }}/>
                    <div>Az oldal nem található (404-es hiba). Kérlek menj vissza a főoldalra manuálisan.</div></div>}/>

        </Routes>
    );
};

export default Routing;
*/