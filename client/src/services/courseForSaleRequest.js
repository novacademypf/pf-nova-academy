import api from "./api"

export const getCourseForSale= async()=>{
    const response = await api.get(`courseForSale`)   
    return response
}
export const getCategoryFilters = async(value,page=1,limit=10)=>{
    const categories=[]
    categories.push(value)
// Mapea los valores de las categorías y los codifica para evitar caracteres especiales
const encodedCategories = categories&&categories.map(category => encodeURIComponent(category));

// Concatena los valores codificados en una cadena separada por ampersand '&'
const queryString = 'categories[]=' + encodedCategories.join('&categories[]=');

try {
    const response = await api.get(`courseForSale/filter?${queryString}&page=${page}&limit=${limit}`)
  
    return response
} catch (error) {
    console.log(error)
}
   
   
}