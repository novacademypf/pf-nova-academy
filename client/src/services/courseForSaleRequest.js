import api from "./api"

export const getCourseForSale= async(page=1,limit=10)=>{
    const response = await api.get(`courseForSale?page=${page}&limit=${limit}`)
   
    return response
}