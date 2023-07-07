const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { API_GOOGLE } = process.env;

const verifyGoogleToken = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization.split(" ").pop();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + idToken,
      },
    };
    const response = await axios.get(
      `${API_GOOGLE}access_token=${idToken}`,
      {},
      config
    );
    console.log("--->>", response.data);
    req.user = {
      userEmail: response.data.email,
      userName: response.data.name,
      userPhoto: response.data.picture,
    };
    next();
  } catch (error) {
    console.error("Error al verificar el token de Google:", error);
    res.status(401).json({ success: false, error: "Token de Google inválido" });
  }
};
module.exports = verifyGoogleToken;