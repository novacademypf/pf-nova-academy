import axios from "axios";
import Swal from "sweetalert2";

export const loginUser = async (data) => {
    const user = await axios.post("/user/login", data);
    return user;
      
};
export const loginUserGoogle = async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data
      },
    };
    try {
      await axios.post("/google/verifyToken", {}, config);
    } catch (error) {
      error.response.status === 423 && Swal.fire({
        title: 'Error',
        text: "Usuario Baneado",
        icon: 'error',
      });;
    }

    return response
  };