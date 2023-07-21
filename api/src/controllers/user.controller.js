const { User, Profile, UserGoogle } = require("../db");
const { createtoken } = require("../helpers/generateToken");
const { compare, encrypt } = require("../helpers/handleBcrypt");
const nodemailer = require("nodemailer");
const transporter = require("../helpers/nodemailer.js");
const { NODEMAILER_EMAIL } = process.env;
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const searchedUserGoogle = await UserGoogle.findOne({
      where: { email: email },
    });
    const searchedUser = await User.findOne({ where: { email: email } });
    if (searchedUserGoogle) {
      const error = new Error("The user is already registered with Google. ");
      error.status = 409;
      throw error;
    }
    if (searchedUser) {
      const error = new Error("The user is already registered ");
      error.status = 409;
      throw error;
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    const user = await User.create({
      name,
      email,
      password: await encrypt(password),
      role,
    });
    const newPerfil = await Profile.create({
      userId: user.userId, // ID del usuario se guarda en la columna 'userId' de la tabla 'Perfil'
      name: user.name,
      email: user.email,
      role: user.role,
    });
    user.setProfile(newPerfil);
    const info = await transporter.sendMail({
      from: `"Nova Academy" <${NODEMAILER_EMAIL}>`,
      to: user.email,
      subject: "Nova Academy",
      html: `
    <body>
      <h1>Nova Academy</h1>
      <h2>Bienvenido ${user.name} a nuestra plataforma de Cursos</h2>
      <p>Felicitaciones estas registrado. En el siguiente link puedes iniciar sesion.</p>
      <a href= "https://pf-nova-academy.vercel.app/#/login">Iniciar Sesion</a>
    </body>`,
    });
    res.send("user created successfully");
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};

const postLoginUser = async (req, res) => {
  const { email, password } = req.body; // Se extraen el correo electrónico y la contraseña del cuerpo de la solicitud
  try {
    const user = await User.findOne({ where: { email: email } }); // Se busca en la base de datos un usuario con el correo electrónico proporcionado
    const profile = await Profile.findOne({ where: { email: email, status: true } });
    if (!user) {
      const error = new Error("user not found");
      error.status = 404;
      throw error;
    } // Si no se encuentra ningún usuario, se lanza un error
    if (!profile) {
      const error = new Error("Baneado");
      error.status = 423;
      throw error;
    }
    
    
    const checkPassword = await compare(password, user.password); // Se compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const tokenSession = await createtoken(profile); // Si la contraseña coincide, se crea un token de sesión
    if (checkPassword) res.status(200).json(tokenSession);
    // Se devuelve el token de sesión como respuesta con un estado 200
    else {
      const error = new Error("Invalid password");
      error.status = 401;
      throw error;
    } // Si la contraseña no coincide, se lanza un error
  } catch (error) {
    const estatus = error.status || 500;
    res.status(estatus).json({ error: error.message }); // Si ocurre algún error durante el proceso, se devuelve un estado 500 con un mensaje de error
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, role, status } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update({ name, email, password, role, status });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  createUser,
  postLoginUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
