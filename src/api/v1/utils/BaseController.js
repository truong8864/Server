const qs = require("qs");

const httpStatus = require("http-status");

class BaseController {
  constructor(Model) {
    this.Model = Model;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const result = await this.Model.create(data);
      res.status(httpStatus.CREATED).json({
        method: "POST",
        path: req.originalUrl,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  get = async (req, res, next) => {
    try {
      const filters = qs.parse(req.query.filters || {}, { allowDots: true });
      const sort = qs.parse(req.query.sort || { _id: -1 }, { allowDots: true });
      const fields = qs.parse(req.query.fields || { BlaBla: 0 }, {
        allowDots: true,
      });

      const isAll = parseInt(req.query.all || 0, { allowDots: true });

      const page = parseInt(req.query.page || 1);
      const perPage = parseInt(req.query.limit || 25);

      if (isAll) {
        const data = await this.Model.find(filters).sort(sort).select(fields);

        if (0 >= data.length) {
          return res.status(httpStatus.RESET_CONTENT).json({
            method: "GET",
            path: req.originalUrl,
          });
        }

        const totalDocuments = data.length;
        const totalPages = Math.ceil(totalDocuments / perPage);

        return res.status(httpStatus.OK).json({
          method: "GET",
          path: req.originalUrl,
          meta: {
            page,
            perPage,
            totalDocuments,
            totalPages,
          },
          data,
        });
      }

      const data = await this.Model.find(filters)
        .sort(sort)
        .select(fields)
        .skip((page - 1) * perPage)
        .limit(perPage);

      if (0 === data.length) {
        return res.status(httpStatus.RESET_CONTENT).json({
          method: "GET",
          path: req.originalUrl,
        });
      }

      const totalDocuments = await this.Model.find(filters)
        .sort(sort)
        .countDocuments();
      const totalPages = Math.ceil(totalDocuments / perPage);

      res.status(httpStatus.OK).json({
        method: "GET",
        path: req.originalUrl,
        meta: {
          page,
          perPage,
          totalDocuments,
          totalPages,
        },
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getByID = async (req, res, next) => {
    try {
      const { ID } = req.params;
      const data = await this.Model.findById(ID);

      if (!data) {
        return res.status(httpStatus.RESET_CONTENT).json({
          method: "GET",
          path: req.originalUrl,
        });
      }

      res.status(httpStatus.OK).json({
        method: "GET",
        path: req.originalUrl,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { ID } = res.params;
      const data = req.body;
      const result = await this.Model.findByIdAndUpdate(ID, data, {
        new: true,
      });
      res.json({
        method: "PUT",
        path: req.originalUrl,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { ID } = res.params;
      const result = await this.Model.findByIdAndRemove(ID);
      res.json({
        method: "DELETE",
        path: req.originalUrl,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = BaseController;
