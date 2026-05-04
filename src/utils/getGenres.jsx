//import api key
import { apiKey } from "../constants/constants";
//import hooks
import useFetch from "../hooks/useFetch";
export default function getGenres(movieId){
    const [data,loading]=useFetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    return!loading?data.genres:''
}