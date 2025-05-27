import Login from "../pages/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Movies from "../pages/Movies.tsx";
import Screenings from "../pages/Screenings.tsx";
import Seats from "../pages/Seats.tsx";
import Purchase from "../pages/Purchase.tsx";
import AddMovies from "../pages/AddMovie.tsx";
import ModifyMovie from "../pages/ModifyMovies.tsx"
import UpdateMovie from "../pages/UpdateMovie.tsx";
import Addscreening from "../pages/AddScreening.tsx";
import UserTickets from "../pages/UserTickets.tsx";
import Register from "../pages/Register.tsx";
import ModifyMovieScreening from "../pages/ModifyMovieScreenings.tsx";
import UpdateScreening from "../pages/UpdateScreening.tsx";
export const routes = [
    {
        path: "login",
        component: <Login/>,
        isPrivate: false
    },
    {
        path: "forgot",
        component: <ForgotPassword/>,
        isPrivate: false
    },
    {
        path: "dashboard",
        component: <Dashboard/>,
        isPrivate: false
    },
    {
        path: "movies",
        component: <Movies/>,
        isPrivate: true
    },
    {
        path: "addMovie",
        component: <AddMovies/>,
        isPrivate: true
    },
    {
        path: "modifyMovie",
        component: <ModifyMovie/>,
        isPrivate: true
    },
    {
        path: "updatemovie/:id",
        component: <UpdateMovie />,
        isPrivate: true
    },
    {
        path: "addscreening/:movieId",
        component: <Addscreening />,
        isPrivate: true
    },
    {
        path: "modifymoviescreening/:movieId",
        component: <ModifyMovieScreening />,
        isPrivate: true
    },
    {
        path: "updatescreening/:movieId/:screeningId",
        component: <UpdateScreening />,
        isPrivate: true
    },
    {
        path: "screenings/:movieId",
        component: <Screenings/>,
        isPrivate: true
    },
    {
        path: "seats/:screeningId",
        component: <Seats/>,
        isPrivate: true
    },
    {
        path: "purchase",
        component: <Purchase/>,
        isPrivate: true
    },
    {
        path: "usertickets",
        component: <UserTickets/>,
        isPrivate: true
    },
    {
        path: "register",
        component: <Register/>,
        isPrivate: true
    },
]