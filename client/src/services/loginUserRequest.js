import axios from "axios";
import Swal from "sweetalert2";

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
    try {
      await axios.post("/google/verifyToken", {}, config);
    } catch (error) {
      console.log("eeror login user reques",error)
      error.response.status === 423 && Swal.fire({
        title: 'Error',
        text: "Usuario Baneado",
        icon: 'error',
      });;
    }

    return response
  };