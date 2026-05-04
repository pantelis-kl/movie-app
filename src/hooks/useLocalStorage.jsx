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
        setValue(JSON.stringify(localStorage.setItem(key,initialValue)))
    },[key,initialValue]);

    return [value,setValue];
}