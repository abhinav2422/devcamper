const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// GET reviews api/v1/reviews & api/v1/bootcamps/:id/reviews
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const reviews = await Review.find({ bootcamp: req.params.id });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// GET review api/v1/reviews/:id
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate({
      path: 'bootcamp',
      select: 'name'
    })
    .populate({
      path: 'user',
      select: 'name'
    });

  if (!review) {
    return next(new ErrorResponse('Review not found', 404));
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

// POST review api/v1/bootcamps/:id/reviews [Private Access]
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.bootcamp = req.params.id;

  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse('Bootcamp not found', 404));
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});
