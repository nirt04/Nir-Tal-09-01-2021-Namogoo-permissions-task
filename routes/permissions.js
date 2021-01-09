const util = require('../services/util');

function permissions(app) {
  app.get('/get_all_leafs', async (req, res) => {
    util.getAllLeafs({ a: '1' }, ['hello']);
    const worksheet = util.getWorkSheetsFromFile('../data/permissions.xlsx');
    res.send('hello permissions worksheet:', worksheet);
  });
}

module.exports = permissions;
