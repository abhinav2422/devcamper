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

const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/Bootcamp');

// Require authorization middleware
const {
  protect,
  authorize,
  checkExistenceOwnership
} = require('../middleware/auth');

// Include other resources
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

// Re-route to other resources
router.use('/:id/courses', courseRouter); //id is bootcamp id here
router.use('/:id/reviews', reviewRouter);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createtBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(
    protect,
    authorize('publisher', 'admin'),
    checkExistenceOwnership(Bootcamp),
    updateBootcamp
  )
  .delete(
    protect,
    authorize('publisher', 'admin'),
    checkExistenceOwnership(Bootcamp),
    deleteBootcamp
  );

router.route('/:zipcode/:distance').get(getBootcampsByRadius);

router
  .route('/:id/photo')
  .put(
    protect,
    authorize('publisher', 'admin'),
    checkExistenceOwnership(Bootcamp),
    uploadBootcampPhoto
  );

module.exports = router;
