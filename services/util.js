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
const conta = (target) => {
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
    if (node.value === value) return node;
    else if (node.children) {
      node.children.forEach((child) => {
        recursive(child);
      });
    }
  };
  Object.keys(tree).forEach((key) => {
    if (!result) result = recursive(tree[key]);
  });
  return result;
};
const getAllUsersPermissions = (tree, userPermissons) => {
  const _treeMap = treeMap(tree);
  let results = {};
  const history = {};

  userPermissons.forEach((permission) => {
    const match = findValueInTree(_treeMap, permission.permission);
    if (!results[permission.userId]) results[permission.userId] = {};
    if (match) {
      const aa = conta(match);
      // results = [...results, ...aa];
      aa.forEach((result) => {
        // debugger;
        results[permission.userId][result.value] = permission.role;
      });
    }
  });
  debugger;
  return results;
  tree.forEach((node) => {
    const match = userPermissons.find((e) => e.permission === node.permission);
    if (match) {
      const isLeaf = !node.permission_ref;
      if (results[match.userId] === undefined) results[match.userId] = {};

      results[match.userId][node.permission] = match.role;
      if (history[node.permission_ref]) {
        results[match.userId][node.permission_ref] = match.role;
      }
    } else {
      history[node.permission] = node;
    }
  });
  return { results, tree, userPermissons, _treeMap };
};

module.exports = {
  getWorkSheetsFromFile,
  getAllUsersPermissions,
};
