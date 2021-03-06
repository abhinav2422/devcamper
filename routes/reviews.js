const express = require('express');

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/Bootcamp');
const Review = require('../models/Review');

// Require authorization middleware
const {
  protect,
  authorize,
  checkExistenceOwnership
} = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getReviews
  )
  .post(protect, authorize('admin', 'user'), createReview);

router
  .route('/:id')
  .get(getReview)
  .put(
    protect,
    authorize('admin', 'user'),
    checkExistenceOwnership(Review),
    updateReview
  )
  .delete(
    protect,
    authorize('admin', 'user'),
    checkExistenceOwnership(Review),
    deleteReview
  );

module.exports = router;
