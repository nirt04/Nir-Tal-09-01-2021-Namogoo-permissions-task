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
  tree.forEach((node) => {
    const match = userPermissons.find((e) => e.permission === node.permission);
    if (match) {
      if (results[match.userId] === undefined) results[match.userId] = {};

      results[match.userId][node.permission] = match.role;
      if (history[node.permission_ref]) { results[match.userId][node.permission_ref] = match.role; }
    } else {
      history[node.permission] = node;
    }
  });
  return results;
};

module.exports = {
  getWorkSheetsFromFile,
  getAllUsersPermissions,
};
