const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const errorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if(req.cookies.token) {
  //     token = req.cookies.token;
  // }

  if (!token) {
    return next(new errorResponse('Not authorized', 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new errorResponse('User not authorized to access this route', 403)
    );
  }

  return next();
};

exports.checkExistenceOwnership = model => async (req, res, next) => {
  let resource = await model.findById(req.params.id);

  if (!resource) {
    return next(
      new errorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is resource owner
  if (req.user.id !== resource.user.toString() && req.user.role !== 'admin') {
    return next(new errorResponse('User not authorized to do this task', 401));
  }

  next();
};
