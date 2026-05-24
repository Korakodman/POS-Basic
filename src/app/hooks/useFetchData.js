'use client'

import { useState,useEffect } from "react"


function useFetchData(url) {

   const [data,SetData] = useState(null)
   const [loading,SetLoading] = useState(null)
   const [error,SetError] = useState(null)

useEffect(()=>{
    if(!url) return;

    const FetchData = async () => {
        try {
            SetLoading(true)
            const res = await fetch(url)
            if(!res.ok){
             throw new Error("Something Erorr")
            }
            const result = await res.json()
            SetData(result)
        } catch (error) {
            SetError(error.message)
            
        }finally{
            SetLoading(false)
        }
    }
     FetchData()
},[url])
        
  return (
    {data,loading,error}
  )
}

export default useFetchData