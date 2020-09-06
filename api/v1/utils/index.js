module.exports.drawStructureTree = (
  listOrg,
  rootID = "2D51E4D9-0E27-451F-83D8-04DA7D6B9797",
  Tree = {},
) => {
  Tree.data = {};
  Tree.children = [];

  const dataFind = listOrg.find((item) => rootID == item.ID);
  if (!dataFind) {
    return {};
  }

  const childrenFilter = listOrg.filter((item) => rootID == item.ParentID);
  Tree.data = dataFind;

  ////

  const index = listOrg.findIndex((item) => {
    return item.ID === dataFind.ID;
  });
  listOrg.splice(index, 1);

  /////
  if (childrenFilter.length <= 0) {
    Tree.children = null;
    return Tree;
  }

  childrenFilter.forEach((item, index) => {
    Tree.children[index] = {};
    this.drawStructureTree(listOrg, item.ID, Tree.children[index]);
  });

  return Tree;
};

module.exports.getListOrgID = (Tree, listUnit = []) => {
  if (null == Tree.children || [] == Tree.children) {
    if (!Tree.data || Tree.data == {}) {
      return listUnit;
    }
    listUnit.push(Tree.data.ID);
    return listUnit;
  }

  if (!Tree.data || Tree.data == {}) {
    return listUnit;
  }

  listUnit.push(Tree.data.ID);

  Tree.children.forEach((item) => {
    this.getListOrgID(item, listUnit);
  });

  return listUnit;
};
