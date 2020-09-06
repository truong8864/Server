const OrgStructureModel = require("../models/Cat_OrgStructure.model");

const ProfilesModel = require("../models/Hre_Profile.model");

const OrgStructureTreeModel = require("../models/OrgStructureTree.model");

const { drawStructureTree, getListOrgID } = require("../utils");

module.exports.getStructureTree = async (req, res) => {
  try {
    const { OrgStructureID } = req.params;
    if (!OrgStructureID) {
      const Tree = await OrgStructureTreeModel.findOne({
        rootID: "2D51E4D9-0E27-451F-83D8-04DA7D6B9797",
      });
      return res.json(Tree.StructureTree);
    }

    const Tree = await OrgStructureTreeModel.findOne({
      rootID: OrgStructureID,
    });

    if (Tree) {
      return res.json(Tree);
    }

    const listOrgStructure = await OrgStructureModel.find(
      {},
      { _id: 0, ID: 1, OrgStructureName: 1, ParentID: 1, Code: 1 },
    );

    const TreeCreate = drawStructureTree(listOrgStructure, OrgStructureID);

    await OrgStructureTreeModel.create({
      rootID: OrgStructureID,
      StructureTree: TreeCreate,
    });

    return res.json(TreeCreate);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.getListOrgID = async (req, res) => {
  try {
    //const { OrgStructureID } = req.params;

    const Tree = await OrgStructureTreeModel.find({
      rootID: "2D51E4D9-0E27-451F-83D8-04DA7D6B9797",
    });

    const listOrg = getListOrgID(Tree);
    return res.json(listOrg);
  } catch (err) {
    return res.sendStatus(403);
  }
};

// module.exports.getListProfilePopulate = async (req, res) => {
//   try {
//     const Tree = await OrgStructureTreeModel.findOne({
//       rootID: "2D51E4D9-0E27-451F-83D8-04DA7D6B9797",
//     });

//     const listOrgID = getListOrgID(Tree.StructureTree);
//     const ListProfile = await ProfilesModel.find({
//       OrgStructureID: { $in: listOrgID },
//     }).populate({
//       path: "Position",
//       select: { PositionName: 1 },
//       //justOne: true,
//     });

//     // .populate({
//     //   path: "OrgStructure",
//     //   //select: { _id: 0, E_COMPANY: 1 },
//     //   justOne: true,
//     // })
//     // .populate({
//     //   path: "Unit",
//     //   //select: { _id: 0, E_COMPANY: 1 },
//     //   justOne: true,
//     // });

//     return res.json(ListProfile);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(403);
//   }
// };

module.exports.getListProfile = async (req, res) => {
  try {
    const { OrgStructureID } = req.params;

    var Tree = await OrgStructureTreeModel.findOne({
      rootID: OrgStructureID,
    });

    if (Tree) {
      const listOrg = getListOrgID(Tree.StructureTree);
      const ListProfile = await ProfilesModel.find({
        OrgStructureID: { $in: listOrg },
      })
        .populate({
          path: "OrgStructure",
          select: { _id: 0, OrgStructureName: 1, Code: 1 },
          justOne: true,
        })
        .populate({
          path: "Position",
          select: { PositionName: 1 },
          justOne: true,
        })
        .limit(30);
      return res.json(ListProfile);
    }

    const listOrgStructure = await OrgStructureModel.find(
      {},
      { _id: 0, ID: 1, OrgStructureName: 1, ParentID: 1, Code: 1 },
    );

    Tree = drawStructureTree(listOrgStructure, OrgStructureID);
    if (!Tree.data) return res.json([]);

    const listOrg = getListOrgID(Tree);

    const ListProfile = await ProfilesModel.find({
      OrgStructureID: { $in: listOrg },
    })
      .populate({
        path: "OrgStructure",
        select: { _id: 0, OrgStructureName: 1, Code: 1 },
        justOne: true,
      })
      .populate({
        path: "Position",
        select: { PositionName: 1 },
        justOne: true,
      });

    await OrgStructureTreeModel.create({
      rootID: OrgStructureID,
      StructureTree: Tree,
    });

    return res.json(ListProfile);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};

module.exports.getOrgStructure = async (req, res) => {
  try {
    const { OrgStructureID } = req.params;
    const result = await OrgStructureModel.find(
      !OrgStructureID ? {} : { ID: OrgStructureID },
    );

    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.getWithFilter = async (req, res) => {
  try {
    const filter = req.query;
    const result = await OrgStructureModel.find(filter);
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { data } = req.body;
    const result = await OrgStructureModel.create({ data });
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { ID } = req.params;
    const { data } = req.body;
    const result = OrgStructureModel.findOneAndUpdate({ ID: ID }, data);
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { ID } = req.params;

    const result = await OrgStructureModel.findOneAndUpdate(
      { ID: ID },
      { IsDelete: true },
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.sendStatus(403);
  }
};
