function* draw(Root, List, Tree) {
  Tree.ID = Root.ID;
  Tree.OrgStructureName = Root.OrgStructureName;
  Tree.Code = Root.Code;
  Tree.children = [];
  const childrenList = [];
  const ListNew = List.reduce((accumulator, OrgStructure) => {
    if (OrgStructure.ParentID == Root.ID) {
      childrenList.push(OrgStructure);
      return accumulator;
    }
    return [...accumulator, OrgStructure];
  }, []);
  if (childrenList.length <= 0) {
    Tree.children = null;
  }
  for (let i = 0; i < childrenList.length; i++) {
    Tree.children[i] = {};
    yield* draw(childrenList[i], ListNew, Tree.children[i]);
  }
  yield Root.ID;
}

function* drawTree(Root, List, Tree) {
  yield* draw(Root, List, Tree);
}

module.exports.getTreeDraw = (Root, List) => {
  const Tree = {};
  const [...listOrgStructureTree] = drawTree(Root, List, Tree);
  return [Tree, listOrgStructureTree];
};

function* getID(Tree) {
  yield Tree.ID;
  if (Tree.children) {
    for (let index = 0; index < Tree.children.length; index++) {
      const element = Tree.children[index];
      yield* getID(element);
    }
  }
  return;
}

module.exports.getID = getID;

module.exports.drawTree = drawTree;
