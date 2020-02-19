const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config/config.env' });
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

async function importData() {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log('Data created');
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

async function deleteData() {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data deleted');
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
