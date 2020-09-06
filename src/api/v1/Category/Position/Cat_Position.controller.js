const mongoose = require("mongoose");
//const Cat_PositionModel = require("./Cat_Position.model"); //Model Current Folder
const Cat_PositionModel = require("../../../../../api/v1/models/Cat_Position.model"); //Model Outside Folder
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
