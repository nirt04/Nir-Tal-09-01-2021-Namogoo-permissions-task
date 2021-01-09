const util = require('../services/util');

function permissions(app) {
  app.get('/get_all_leafs', async (req, res) => {
    util.getAllLeafs({ a: '1' }, ['hello']);
    res.send('hello ');
  });
}

module.exports = permissions;
