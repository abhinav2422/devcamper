const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// GET api/v1/users [Admin access]
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// GET api/v1/user/:id [Admin access]
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// POST api/v1/user [Admin access]
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user
  });
});

// PUT api/v1/user/:id [Admin access]
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { password, ...otherFields } = { ...req.body };
  const user = await User.findById(req.params.id);

  await user.update(otherFields, {
    new: true,
    runValidators: true
  });

  if (password) {
    user.password = password;
    await user.save();
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// DELETE api/v1/user/:id [Admin access]
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
