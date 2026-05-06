
export default function getRating(rating){
    rating=Number(rating)
    if(rating===0.0)
        return 'No rating found';
    return rating;
}