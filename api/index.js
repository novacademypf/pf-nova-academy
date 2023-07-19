const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env;


const {
  loaderCategory,
  loaderUsers,
  loaderCourseForSale,
  loaderRating,
} = require("./src/helpers/loaderDataDb.js");

// Syncing all the models at once.
const main = async () => {
  try {
    await conn.authenticate();
    await conn.sync({ force: false });
    console.log("Connection has been established successfully.");
    server.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });

    await loaderUsers();
    await loaderCategory();
    await loaderCourseForSale()
    
     await loaderRating()
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  
  }
};
main();
