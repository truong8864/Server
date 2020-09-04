const qs = require("qs");

module.exports.parseURL = async (req, res, next) => {
  try {
    const {
      filters = {},
      fields = { BlaBla: 0 },
      sort = { _id: -1 },
    } = qs.parse(req.query, { allowDots: true });

    const isAll = parseInt(req.query.all || 0, { allowDots: true });

    const page = parseInt(req.query.page || 1);
    const perPage = parseInt(req.query.limit || 25);

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        fields[key] = parseInt(fields[key]);
      }
    }

    req.filters = filters;
    req.sort = sort;
    req.fields = fields;
    req.isAll = isAll;
    req.page = page;
    req.perPage = perPage;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
