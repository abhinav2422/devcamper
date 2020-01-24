const Bootcamp = require('../models/Bootcamps');

// GET api/v1/bootcamps
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show' });
};

// GET api/v1/bootcamps/:id
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show ${req.params.id}` });
};

// POST api/v1/bootcamp
exports.createtBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// PUT api/v1/bootcamps/:id
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update ${req.params.id}` });
};

// DELETE api/v1/bootcamps/:id
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete ${req.params.id}` });
};
