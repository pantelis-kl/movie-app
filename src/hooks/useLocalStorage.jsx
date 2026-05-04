//import hooks
import {useState ,useEffect} from 'react'

export default function useLocalStorage(key,initialValue){
    const [value,setValue]=useState(()=>{
        try{
            const data=JSON.parse(localStorage.getItem(key))
            return data?data:initialValue
        }catch(error){
            return initialValue;
        }
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[key,value]);

    return [value,setValue];
}