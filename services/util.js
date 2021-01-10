const XLSX = require('xlsx');

const getWorkSheetsFromFile = (path) => {
  const workbot = XLSX.readFile(path);
  let worksheets = {};
  for (const sheetName of workbot.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbot.Sheets[sheetName]);
  }
  return worksheets;
};

const getAllUsersPermissions = (tree, userPermissons) => {
  let results = {};
  const history = {};
  tree.forEach((treeNode) => {
    const match = userPermissons.find((e) => e.permission === treeNode.permission);
    if (match) {
      if (results[match.userId] === undefined) results[match.userId] = {};

      results[match.userId][treeNode.permission] = match.role;
      if (history[treeNode.permission_ref]) { results[match.userId][treeNode.permission_ref] = match.role; }
    } else {
      history[treeNode.permission] = treeNode;
    }
  });
  return results;
};

module.exports = {
  getWorkSheetsFromFile,
  getAllUsersPermissions,
};
