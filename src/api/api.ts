import { ICreateMovie, IMovie, IMovieUpdate } from "../Interfaces/IMovie";
import { IScreening, ICreateScreeningDto, IUpdateScreeningDto } from "../Interfaces/IScreening";
import { IChair } from "../Interfaces/IChair.ts";
import {ITicket, ITicketCreateDto, ITicketVerifyDto} from "../Interfaces/ITicket.ts"
import axiosInstance from "./axios.config";

const Auth = {
    // login: (email: string, password: string) => axiosInstance.post<{token: string}>(`/api/User/login`, {email, password})
    login: (email: string, password: string) => axiosInstance.post<{token: string}>(`/api/User/LoginUser`, {
        email: email,
        username: email,
        password: password
    })
}
const Movies = {
    getMovie: () => axiosInstance.get<IMovie[]>(`/api/Movie/GetAllMovies`),
    updateMovie: (id: string, data: IMovieUpdate) => axiosInstance.put<IMovie>(`/api/Admin/UpdateMovie/${id}`, data),
    createMovie: (data: ICreateMovie) => axiosInstance.post<IMovie>('/api/Admin/CreateMovie', data),
    deleteMovie: (id: string) => axiosInstance.delete<void>(`/api/Admin/DeleteMovie/${id}`),
};
const Screenings = {
    getScreening: (movieId: string | number) =>axiosInstance.get<IScreening[]>(`/api/Screening/GetScreeningByMovieId/${movieId}`),
   createScreening: (data: ICreateScreeningDto) =>
        axiosInstance.post('/api/Admin/CreateScreening', data),

    updateScreening: (screeningId: string ,data: IUpdateScreeningDto) =>
        axiosInstance.put(`/api/Admin/UpdateScreening/${screeningId}`, data),

    deleteScreening: (id: number) =>
        axiosInstance.delete(`/api/Admin/DeleteScreening/${id}`),
};
const Seats ={
    getAllChairs: () => 
        axiosInstance.get<IChair[]>('/api/Chair/GetAllChair'),
    getAvailableChairsForRoom: (screeningId: number) => axiosInstance.get<IChair[]>(`/api/chairs/GetAvailableChairsForRoom/${screeningId}`),
    
};

const Tickets = {   
    createTicket: (data: ITicketCreateDto) =>
        axiosInstance.post('/api/Ticket/CreateTicket', data), 
    deleteTicket: (id: number) =>
        axiosInstance.delete(`/api/Ticket/DeleteTicket/${id}`),
    verifyTicket: (id: number, data: ITicketVerifyDto) =>
        axiosInstance.put<ITicket>(`/api/Ticket/VerifyTicket/${id}`, data),
};



// const Food = {
//     getFoods: () => axiosInstance.get<IFood[]>(`/api/food`),
//     getFood: (id: string) => axiosInstance.get<IFood>(`/api/food/${id}`),
//     getCategories: () => axiosInstance.get<{name: string, id: number}[]>(`/api/food/categories`),
//     createFood : (param: ICreateFood) => axiosInstance.post<IFood>(`/api/food`, param),
//     updateFood: (id: string, param2: {
//         foodCategoryId: number;
//         price: number;
//         name: string;
//         description: string
//     }) => axiosInstance.put<IFood>(`/api/food/${id}`, param2),
// }


const api = {Movies, Screenings, Seats, Auth};

export default api;