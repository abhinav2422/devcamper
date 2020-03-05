const ErrorResponse = require('../utils/errorResponse');

const checkExistenceOwnership = model => async (req, res, next) => {
  let resource = await model.findById(req.params.id);

  if (!resource) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is resource owner
  if (req.user.id !== resource.user.toString() && req.user.role !== 'admin') {
    return next(new ErrorResponse('User not authorized to do this task', 401));
  }

  next();
};

module.exports = checkExistenceOwnership;
