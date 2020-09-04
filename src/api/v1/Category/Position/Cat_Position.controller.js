const mongoose = require("mongoose");
const Cat_PositionModel = require("./Cat_Position.model");

const BaseController = require("../../utils/BaseController");

class Cat_PositionController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Cat_PositionModel);
  }
}

module.exports = Cat_PositionController;
