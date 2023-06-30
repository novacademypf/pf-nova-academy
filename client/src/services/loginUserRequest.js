import api from "./api";
export const loginUser = async (data) => {

    console.log(data);
    const user = await api.post("/user/login", data);
    return user;
      
};
export const loginUserGoogle = async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data
      },
    };
  
    const response = await api.post("google/verifyToken", {}, config);
    return response
  };