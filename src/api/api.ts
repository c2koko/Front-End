import { IMovie } from "../Interfaces/IMovie";
import { IScreening } from "../Interfaces/IScreening";
import { ISeat } from "../Interfaces/ISeat.ts";
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
    getMovie: () => axiosInstance.get<IMovie[]>('/api/Movie/GetAllMovies')
}
const Screenings = {
    getScreening: (movieId: string | number) =>axiosInstance.get<IScreening[]>(`/api/Screening/GetScreeningById/${movieId}`),
};
const Seats ={
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