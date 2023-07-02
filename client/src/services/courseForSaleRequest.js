import api from "./api"

export const getCourseForSale= async(page=1,limit=10)=>{
    const response = await api.get(`courseForSale?page=${page}&limit=${limit}`)   
    return response
}
export const getCategoryFilters = async(value)=>{
    const categories=[]
    categories.push(value)
// Mapea los valores de las categorías y los codifica para evitar caracteres especiales
const encodedCategories = categories&&categories.map(category => encodeURIComponent(category));

// Concatena los valores codificados en una cadena separada por ampersand '&'
const queryString = 'categories[]=' + encodedCategories.join('&categories[]=');

    const response = await api.get(`courseForSale/filter?`)
    console.log('-->', response.data)
}