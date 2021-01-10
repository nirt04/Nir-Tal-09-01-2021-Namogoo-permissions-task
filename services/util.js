const XLSX = require('xlsx');

const getWorkSheetsFromFile = (path) => {
  const workbot = XLSX.readFile(path);
  let worksheets = {};
  for (const sheetName of workbot.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbot.Sheets[sheetName]);
  }
  return worksheets;
};

const treeMap = (tree) => {
  const map = {};
  tree.forEach((node) => {
    const isLeaf = !node.permission_ref;
    if (isLeaf)
      map[node.permission] = {
        value: node.permission,
        children: null,
      };
    else {
      if (map[node.permission_ref]) {
        const childrens =
          map[node.permission] && map[node.permission].children
            ? map[node.permission].children
            : [];
        map[node.permission] = {
          value: node.permission,
          children: [...childrens, map[node.permission_ref]],
        };
        delete map[node.permission_ref];
      } else {
        map[node.permission] = {
          value: node.permission,
          children: [],
        };
      }
    }
  });
  return map;
};

const getAllSubPermissions = (target) => {
  const results = [];
  const getAllSubNodes = (node) => {
    if (node.children.length === 0) results.push(node);
    if (node.children) {
      node.children.forEach((child) => {
        getAllSubNodes(child);
      });
    }
  };
  getAllSubNodes(target);
  return results;
};

const findValueInTree = (tree, value) => {
  let result = null;
  const recursive = (node) => {
    if (node.value === value) return (result = node);
    else if (node.children) {
      node.children.forEach((child) => {
        recursive(child);
      });
    }
  };

  Object.keys(tree).forEach((key) => {
    if (!result) recursive(tree[key]);
  });
  return result;
};

const getAllUsersPermissions = (tree, userPermissons) => {
  const _treeMap = treeMap(tree);
  let results = {};
  userPermissons.forEach((permission) => {
    const match = findValueInTree(_treeMap, permission.permission);
    if (!results[permission.userId]) results[permission.userId] = {};
    if (match) {
      const subPermisions = getAllSubPermissions(match);
      subPermisions.forEach((result) => {
        results[permission.userId][result.value] = permission.role;
      });
    }
  });
  return results;
};

module.exports = {
  getWorkSheetsFromFile,
  getAllUsersPermissions,
};
