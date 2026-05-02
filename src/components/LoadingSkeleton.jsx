import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingSkeleton({width,height,count}){
    return(
        <Skeleton width={width} height={height}/>
    )
}