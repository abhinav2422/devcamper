const express = require('express');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/Bootcamp');
const Course = require('../models/Course');

// Require authorization middleware
const {
  protect,
  authorize,
  checkExistenceOwnership
} = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  .post(
    protect,
    authorize('publisher', 'admin'),
    checkExistenceOwnership(Bootcamp),
    createCourse
  );

router
  .route('/:id')
  .get(getCourse)
  .put(
    protect,
    authorize('publisher', 'admin'),
    checkExistenceOwnership(Course),
    updateCourse
  )
  .delete(
    protect,
    authorize('publisher', 'admin'),
    checkExistenceOwnership(Course),
    deleteCourse
  );

module.exports = router;
