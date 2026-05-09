
export default function getReleaseDate(releaseDate){
    const year=releaseDate.slice(0,releaseDate.indexOf('-'));
    const month=releaseDate.slice(releaseDate.indexOf('-')+1,releaseDate.lastIndexOf('-'));
    const day=releaseDate.slice(releaseDate.lastIndexOf('-')+1);
    return day+'-'+month+'-'+year;
}