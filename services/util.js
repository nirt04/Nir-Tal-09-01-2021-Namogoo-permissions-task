const XLSX = require('xlsx');
const path = require('path');

const GET_APP_DIR = () => {
  return path.dirname(require.main.filename);
};

const getWorkSheetsFromFile = (path) => {
  const workbot = XLSX.readFile(path);
  let worksheets = {};
  for (const sheetName of workbot.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbot.Sheets[sheetName]);
  }
  return worksheets;
};

const getAllLeafs = (tree, kinds) => {
 // TODO 


  
};
module.exports = {
  getAllLeafs,
  getWorkSheetsFromFile,
  GET_APP_DIR,
};
