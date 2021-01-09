// import xlsx from 'node-xlsx';
const xlsx = require('node-xlsx').default;

// Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
// Parse a file
const getWorkSheetsFromFile = (path) => {
  const workSheetsFromFile = xlsx.parse(path);
  return workSheetsFromFile;
};
const getAllLeafs = (tree, kinds) => {
  console.log('hello getAllLeafs');
};
module.exports = {
  getAllLeafs,
  getWorkSheetsFromFile,
};
