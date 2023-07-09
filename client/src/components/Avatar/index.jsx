import { useEffect } from "react";

const Avatar = () => {
  useEffect(() => {
    const avatarEl = document.querySelector(".rounded-full");
    const initialsEl = avatarEl.querySelector("span");
    const loginStatusEl = document.querySelector("#login-status");
    const editProfileButtonEl = document.querySelector("#edit-profile-button");

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const imageUrl = localStorage.getItem("imageUrl");

    if (loginStatusEl) {
      if (isLoggedIn) {
        loginStatusEl.textContent = `Bienvenido, ${firstName} ${lastName}`;
      } else {
        loginStatusEl.textContent = "Iniciar sesión";
      }
    }

    if (isLoggedIn) {
      if (imageUrl) {
        initialsEl.style.display = "none";
        const avatarImgEl = avatarEl.querySelector("img");
        avatarImgEl.src = imageUrl;
        avatarImgEl.style.display = "block";
      } else {
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
        initialsEl.textContent = initials.toUpperCase();
      }

      avatarEl.style.display = "block";
      editProfileButtonEl.classList.remove("hidden");
    } else {
      initialsEl.style.display = "none";
      const avatarImgEl = avatarEl.querySelector("img");
      avatarImgEl.style.display = "none";
      const initials = "GT";
      initialsEl.textContent = initials;

      avatarEl.style.display = "none"; // Oculta el avatar
      editProfileButtonEl.classList.add("hidden");
    }
  }, []);

  const handleEditProfile = () => {
    window.location.href = "/edit-profile";
  };

  return (
    <div className="flex items-center">
      <div className="mx-3 rounded-full h-10 w-10 bg-gray-400 flex items-center justify-center">
        <span className="text-white font-bold text-lg"></span>
        <img src="" alt="Avatar" className="h-10 w-10 rounded-full" />
      </div>
      <div className="font-semibold text-gray-800" id="login-status"></div>
      <button
        id="edit-profile-button"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ml-4 hidden"
        onClick={handleEditProfile}
      >
        Editar Perfil
      </button>
    </div>
  );
};

export default Avatar;
