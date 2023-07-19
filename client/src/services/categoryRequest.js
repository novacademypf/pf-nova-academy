import axios from "axios"

export const getCategories=async()=>{
    const response= await axios.get("/category")
    console.log(response.data)
    return response
}