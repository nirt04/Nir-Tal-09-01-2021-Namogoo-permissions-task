const XLSX = require('xlsx');

const getWorkSheetsFromFile = (path) => {
  const workbot = XLSX.readFile(path);
  let worksheets = {};
  for (const sheetName of workbot.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbot.Sheets[sheetName]);
  }
  return worksheets;
};

const getPremissionOfUser = (userPermissons, tree) => {
  let userPremissionsExpanded = {

  };
  const getAllLeafsOfNode = (node) => {
    // TODO RUN OVER BINARY TREE AND GET ALL LEAFS
  };

  // TODO Loop over tree and for each node loop the userPermissons and ask:

  // a. is it match? Great lets continue.
  // b. is it leaf? OK GO TO userPremissionsExpanded! 
  // c. is it root? OK EXCUTE getAllLeafsOfNode(<NODE>) and store all of them in userPremissionsExpanded but before:... 
  // d. since we expanded all the node and got all his leafs there is a big chance that on of the next user premissions that we attend to loop over, is already added to userPremissionsExpanded. 
  //    so before we store all of them in userPremissionsExpanded we delete all of them from userPermissons so we wont have to loop over things we got.

  return { userPermissons, tree };
};

const getAllLeafs = (tree, kinds) => {
  // TODO
};
module.exports = {
  getAllLeafs,
  getWorkSheetsFromFile,
  getPremissionOfUser,
};
