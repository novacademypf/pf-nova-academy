import axios from "axios";
export const loginUser = async (data) => {

    console.log(data);
    const user = await axios.post("/user/login", data);
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
    const response = await axios.post("/google/verifyToken", {}, config);
    console.log(" service ,loginuser response",response)

    return response
  };