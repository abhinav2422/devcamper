const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// GET courses api/v1/courses & api/v1/bootcamps/:bootcampId/courses
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// GET a course api/v1/courses/:id
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

// POST a course api/v1/bootcamps/:bootcampId/courses [Private access]
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.id; //req.params.id is bootcamp id
  req.body.user = req.user.id;

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course
  });
});

// PUT a course api/v1/courses/:id [Private access]
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

// DELETE a course api/v1/courses/:id [Private access]
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  course.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
