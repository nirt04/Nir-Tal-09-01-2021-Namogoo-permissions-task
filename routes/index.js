const permissions = require('./permissions');

function router(app) {
  app.get('/', (req, res) => {
    res.send('hello backend server');
  });
  permissions(app);
}

module.exports = router;
