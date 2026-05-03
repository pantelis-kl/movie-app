// import icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons';

export default function getStars(rating){
    if(rating>=1 && rating <=2)
        return(<FontAwesomeIcon icon={faStar} className="star-item"/>)
    else if(rating>2 && rating <=4)
         return(<><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/></>)
    else if(rating>4 && rating<=6)
        return (<><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/></>)
    else if(rating>6 && rating<=8)
        return (<><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/></>)
    else
        return(<>
        <FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/><FontAwesomeIcon icon={faStar} className="star-item"/>
        </>)
}