const util = require('../services/util');

const permissions_worksheet = util.getWorkSheetsFromFile(
  `${__dirname}/../data/xlsx/permissions.xlsx`
);
const users_worksheet = util.getWorkSheetsFromFile(
  `${__dirname}/../data/xlsx/user_permissions.xlsx`
);

function permissions(app) {
  app.get('/get-premission-of-user', async (req, res) => {
    try {
      const USER_PREMISSIONS = util.getPremissionOfUser(
        users_worksheet.userPermissions,
        permissions_worksheet.authTree
      );
      res.status('200').send(USER_PREMISSIONS);
    } catch (error) {
      console.log('error', error);
    }
  });
}

module.exports = permissions;
