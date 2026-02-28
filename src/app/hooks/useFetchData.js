'use client'

import { useState,useEffect } from "react"


function useFetchData(url) {

   const [data,setdata] = useState(null)
   const [loading,setloading] = useState(null)
   const [error,seterros] = useState(null)

useEffect(()=>{
    if(!url) return;

    const fetctdata = async () => {
        try {
            setloading(true)
            const res = await fetch(url)
            if(!res.ok){
             throw new Error("Something Erorr")
            }
            const result = await res.json()
            setdata(result)
        } catch (error) {
            seterros(error.message)
            
        }finally{
            setloading(false)
        }
    }
     fetctdata()
},[url])
        
  return (
    {data,loading,error}
  )
}

export default useFetchData