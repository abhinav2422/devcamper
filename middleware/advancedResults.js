const advancedResults = (model, populate) => async (req, res, next) => {
  let { select, sort, page, limit, ...reqQuery } = { ...req.query };

  // Create operators such as lte, gt, etc
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(lt|lte|gt|gte|in)\b/g,
    (match) => `$${match}`
  );

  // Select out certain fields
  if (select) {
    var fields = select.replace(/,/g, ' ');
    // query.select(fields);
  }

  if (sort) {
    sort = sort.replace(/,/g, ' ');
  } else {
    sort = '-createdAt';
  }

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 2;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  // let query = Bootcamp.find(JSON.parse(queryStr), fields, { sort });
  // query.sort(sort);

  const results = await model
    .find(JSON.parse(queryStr))
    .select(fields)
    .sort(sort)
    .limit(limit)
    .skip(startIndex)
    .populate(populate);

  pagination = {};

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
