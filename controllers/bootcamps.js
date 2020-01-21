// GET api/v1/bootcamps
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show' });
};

// GET api/v1/bootcamps/:id
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show ${req.params.id}` });
};

// POST api/v1/bootcamp
exports.createtBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create' });
};

// PUT api/v1/bootcamps/:id
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update ${req.params.id}` });
};

// DELETE api/v1/bootcamps/:id
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete ${req.params.id}` });
};
