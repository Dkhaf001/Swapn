const categoriesData = require("./src/lib/data/categories.json");
const followingsData = require("./src/lib/data/following.json");
const offersData = require("./src/lib/data/offer.json");
const postsData = require("./src/lib/data/posts.json");
const usersData = require("./src/lib/data/users.json");
const watchersData = require("./src/lib/data/watchers.json");

const Tables = require('./src/lib/SQL/index.js');


const create = async () => {
  try {
    await Categorys.bulkCreate(categoriesData);
    await Teachers.bulkCreate(teachersData);
    await Classes.bulkCreate(classesData);
    await Lectures.bulkCreate(lecturesData);
    await Topics.bulkCreate(topicsData);
    await Quizzes.bulkCreate(quizzesData);
    await Students.bulkCreate(studentsData);
    await StudentsClasses.bulkCreate(studentsClassesData);
    await StudentsQuizzes.bulkCreate(studentsQuizzesData);
    await StudentsTeachers.bulkCreate(studentsTeachersData);
    console.log('done inserting data');
  } catch (err) {
    console.log('error inserting data');
    throw err;
  }
};

create();