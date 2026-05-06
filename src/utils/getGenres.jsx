//import api key
import { apiKey } from "../constants/constants";

export default function getGenres(genreId,genresData){
    if (!genresData || !genresData.genres) return [];
        const genreLength=genresData.genres.length;
        let genresArr=[]
        for(let i=0;i<genreId.length;i++){
            for(let j=0;j<genreLength;j++){
                if(genreId[i]===genresData.genres[j].id)
                    genresArr.push(genresData.genres[j].name)
            }
        }
    return genresArr;
}