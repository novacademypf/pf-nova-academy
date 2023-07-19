import api from "./api"

export const getCategories=async()=>{
    const response= await api.get("/category")
    console.log(response.data)
    return response
}
