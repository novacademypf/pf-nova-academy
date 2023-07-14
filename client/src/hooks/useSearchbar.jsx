import { useState } from "react"

export const useSearchbar=(initialState)=>{
    const [value,setValue]=useState(initialState)
    const handleOnChange=(e)=>{
       const valueInput = e.target.value
        setValue(valueInput) 
    }
    return {
        value,handleOnChange
    }
}