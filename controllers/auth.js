const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const sendMail = require('../utils/sendMail');
const asyncHandler = require('../middleware/asyncHandler');
const nodemailer = require('nodemailer');
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

// GET api/v1/auth/me
exports.getMe = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};

// POST api/v1/auth/forgotPassword
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  const token = user.getPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetPassword/${token}`;

  try {
    sendMail({
      email: req.body.email,
      subject: 'Password Reset Mail',
      text: resetUrl
    });

    res.status(200).json({
      success: true,
      data: 'Mail sent'
    });
  } catch (err) {
    console.log(err);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      success: false,
      data: 'Mail could not be sent'
    });
  }

  res.status(200).json({
    success: true,
    data: 'Mail sent'
  });
});

// PUT api/v1/auth/resetPassword/:resetToken
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  let user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token'));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });

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
