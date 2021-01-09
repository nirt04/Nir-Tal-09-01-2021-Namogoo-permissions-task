const util = require('../services/util');

function permissions(app) {
  app.get('/get_all_leafs', async (req, res) => {
    try {
      util.getAllLeafs({ a: '1' }, ['hello']);
      const worksheet = util.getWorkSheetsFromFile(`${__dirname}/../data/xlsx/permissions.xlsx`);
      res.status('200').send(worksheet);
    } catch (error) {
      console.log('error', error);
    }
  });
}

module.exports = permissions;
