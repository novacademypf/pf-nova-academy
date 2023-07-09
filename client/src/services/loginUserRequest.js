import api from "./api";
export const loginUser = async (data) => {

    console.log(data);
    const user = await api.post("/user/login", data);
    console.log(user.data)
    return user;
      
};
export const loginUserGoogle = async (data) => {
    console.log(", service  loginuser data",data)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data
      },
    };
    console.log(" service ,loginuser config",config)
    const response = await api.post("google/verifyToken", {}, config);
    console.log(" service ,loginuser response",response)

    return response
  };