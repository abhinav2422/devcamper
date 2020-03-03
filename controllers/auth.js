const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// POST api/v1/auth/register
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  const token = user.getSignedJwt();

  res.status(200).json({
    success: true,
    token
  });
});

// POST api/v1/auth/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please enter details', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const match = await user.matchPass(password);

  if (!match) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = user.getSignedJwt();

  res.status(200).json({
    success: true,
    token
  });
});
