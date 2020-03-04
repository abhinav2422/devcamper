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
