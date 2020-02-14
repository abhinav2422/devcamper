const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createtBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsByRadius
} = require('../controllers/bootcamps');
const router = express.Router();

router.route('/:zipcode/:distance').get(getBootcampsByRadius);

router
  .route('/')
  .get(getBootcamps)
  .post(createtBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
