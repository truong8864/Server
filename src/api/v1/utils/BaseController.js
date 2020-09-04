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
      const { filters, sort, fields, isAll, page, perPage } = req;

      console.log("haha", fields);

      if (isAll) {
        const data = await this.Model.find(filters).sort(sort).select(fields);

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

  getByCode = async (req, res, next) => {
    try {
      const { Code } = req.params;
      const data = await this.Model.findOne({ Code: Code });
      res.json({
        method: "GET",
        path: req.originalUrl,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateByCode = async (req, res, next) => {
    try {
      const { Code } = res.params;
      const data = req.body;
      const result = await this.Model.findOneAndUpdate({ Code: Code }, data, {
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

  deleteByCode = async (req, res, next) => {
    try {
      const { Code } = res.params;
      const result = await this.Model.findOneAndRemove({ Code: Code });
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
