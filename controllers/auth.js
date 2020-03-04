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

  sendTokenRes(user, 200, res);
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

  sendTokenRes(user, 200, res);
});

// Create and send token and cookie
const sendTokenRes = (user, statusCode, res) => {
  const token = user.getSignedJwt();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

// Get logged in user details
exports.getMe = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};
