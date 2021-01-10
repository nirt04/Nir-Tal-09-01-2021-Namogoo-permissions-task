const util = require('../services/util');

const permissions_worksheet = util.getWorkSheetsFromFile(
  `${__dirname}/../data/xlsx/permissions.xlsx`
);
const users_worksheet = util.getWorkSheetsFromFile(
  `${__dirname}/../data/xlsx/user_permissions.xlsx`
);

function permissions(app) {
  app.get('/get-permission-of-users', async (req, res) => {
    try {
      const USER_PERMISSIONS = util.getAllUsersPermissions(
        permissions_worksheet.authTree,
        users_worksheet.userPermissions
      );
      res.status('200').send(USER_PERMISSIONS);
    } catch (error) {
      debugger;
      console.log('error', error);
    }
  });
}

module.exports = permissions;
