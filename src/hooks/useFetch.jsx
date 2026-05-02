import { useEffect, useState } from "react";

export default function useFetch(url){
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')

    useEffect(()=>{
        if(!url){
            setData(null)
            return;
        }
        const fetchData=async()=>{
            setLoading(true);
            try{
                const response=await fetch(url)
                if(!response)
                    throw new Error("Cannot fetch the resource")
                const data=await response.json()
                setData(data)
            }catch(error){
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    },[url])

    return{data,loading,error}
}