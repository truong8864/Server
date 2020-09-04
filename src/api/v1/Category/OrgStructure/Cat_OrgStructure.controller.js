const mongoose = require("mongoose");
const Cat_OrgStructureModel = require("./Cat_OrgStructure.model");

const BaseController = require("../../utils/BaseController");

class Cat_OrgStructureController extends BaseController {
  constructor(Model = {}) {
    if (Model.schema instanceof mongoose.Schema) {
      super(Model);
      return this;
    }
    super(Cat_OrgStructureModel);
  }
}

module.exports = Cat_OrgStructureController;
