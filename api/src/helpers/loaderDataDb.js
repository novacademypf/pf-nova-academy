const {
  category,
  users,
  cursos,
  generateCourseObjects,
  generatedCourses,
} = require("../constants/data");
const { conn } = require("../db");
const { Op } = require("sequelize");
const { Category, User, Profile, CourseForSale,CourseRating } = require("../db");
const { encrypt } = require("./handleBcrypt");
const courseRating = require("../models/courseRating");
const loaderCategory = async () => {
  const categoriesCount = await Category.count();
  if (categoriesCount === 0) {
    await Category.bulkCreate(category);
  }
};

const loaderUsers = async () => {
  let transaction;

  try {
    const usersCount = await User.count();
    if (usersCount === 0) {
      transaction = await conn.transaction();
      const userP = await Promise.all(
        users.map(async (user) => {
          const encryptedPassword = await encrypt(user.password);
          return {
            name: user.name,
            email: user.email,
            password: encryptedPassword,
          };
        })
      );

      const createdUsers = await User.bulkCreate(userP, { transaction });

      const profilesData = createdUsers.map((user) => ({
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
      }));

      await Profile.bulkCreate(profilesData, { transaction });

      await transaction.commit();
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error loading users:", error);
  }
};

const loaderCourseForSale = async () => {
  const courseCount = await CourseForSale.count();

  if (courseCount > 0) {
    // Si ya hay cursos en la base de datos, no se realiza la carga nuevamente
    return;
  }
  const profileIds = await Profile.findAll({ attributes: ["profileId"] });
  const objGenerated = generateCourseObjects(cursos, 20);
  const coursesToAdd = profileIds.flatMap((profile) => {
    return objGenerated.map((cur) => {
      return {
        name: cur.name,
        category: cur.category,
        duration: cur.duration,
        description: cur.description,
        images: cur.images,
        price: cur.price,
        idProfile: profile.profileId,
      };
    });
  });

  const courseCreate = await CourseForSale.bulkCreate(coursesToAdd, {
    returning: true,
  });

  for (const course of courseCreate) {
    const categories = await Category.findAll({
      where: { name: course.category },
    });

    await course.addCategory(categories);
  }
};

const loaderRating = async () => {
  const courses = await CourseForSale.findAll();
  const users = await Profile.findAll();

  const courseCount = await CourseRating.count();

  if (courseCount > 0) {
  
    return;
  }
  
  let i = 1;
  const usersSet = new Set();
  while (usersSet.size < 2) {
    const randomIdUser = Math.floor(Math.random() * users.length) + 1;
    usersSet.add(randomIdUser);
    i++;
  }
  for (const course of courses) {
    
   
    for (const userId of usersSet) {
    
      const rating = Math.random() * 4.5 + 0.5;
      const review = "Me pareció una experiencia valiosa y enriquecedora. Aprendí mucho y el contenido fue interesante. ¡Gracias!";
      
     
      await CourseRating.create({
        rating,
        review,
        profileId: userId,
        courseForSaleId: course.id,
      });

      const courseRatings = await CourseRating.findAll({
        where: { courseForSaleId: course.id },
      });
      const newRatingTotal = courseRatings.reduce((acc, curr) => acc + curr.rating, 0);
      const newRatingCount = courseRatings.length;
      const newRatingAverage = newRatingTotal / newRatingCount;

      await course.update({
        totalRating: Math.floor(newRatingTotal),
        totalRatings: newRatingCount,
        ratingAverage: newRatingAverage,
      });
    }
  }
 
};


module.exports = {
  loaderCategory,
  loaderUsers,
  loaderCourseForSale,
  loaderRating,
};
