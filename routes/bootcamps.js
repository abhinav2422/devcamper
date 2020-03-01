const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createtBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsByRadius,
  uploadBootcampPhoto
} = require('../controllers/bootcamps');

//Include other resources
const courseRouter = require('./courses');

const router = express.Router();

//Re-route to other resources
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(getBootcamps)
  .post(createtBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/:zipcode/:distance').get(getBootcampsByRadius);

router.route('/:id/photo').put(uploadBootcampPhoto);

module.exports = router;
