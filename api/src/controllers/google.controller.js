const { User, UserGoogle, Profile } = require("../db");
const { createtoken } = require("../helpers/generateToken");

const postLoginGoogle = async (req, res) => {
  const { userEmail, userName, userPhoto } = req.user;

  try {
    const user = await User.findOne({ where: { email: userEmail } });
    const userGoogle = await UserGoogle.findOne({ where: { email: userEmail } });

    if (user) {
      console.log(1)
      const error = new Error(
        "The Google account cannot be linked, an account with that email is already registered."
      );
      error.status = 409;
      throw error;
    } else {
      if (userGoogle) {
        console.log(2)
        console.log("-->",userGoogle)
        const tokenSession = await createtoken(userGoogle);
        res.status(200).json({ token: tokenSession,message:"The user is already registered with a Google account." });
      } else {
        console.log(3)
        console.log("-->",userGoogle)
        const newUser = await UserGoogle.create({ name: userName, email: userEmail });

        const newProfile = await Profile.create({ name: userName, photo: userPhoto });

        newUser.setProfile(newProfile);

        const tokenSession = await createtoken(newUser);
        res.status(200).json({ token: tokenSession,message:"User created successfully." });
      }
    }

   
  } catch (error) {
    const status = error.status || 500;
    console.log(error.message);
    res.status(status).json({ error: error.message });
  }
};

module.exports = { postLoginGoogle };
