//import hooks
import { useState, useEffect } from "react";

export default function useDebounce(value,delay){
    const [debounce,setDebounce]=useState(value);
    
    useEffect(()=>{
        const timeoutId=setTimeout(()=>{
            setDebounce(value)
        },delay);

        return ()=>{clearTimeout(timeoutId)};
    },[value,delay]);

    return [debounce];
}