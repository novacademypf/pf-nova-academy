import axios from "axios"

export const getCategories=async()=>{
    const response= await axios.get("/category")
    return response
}
