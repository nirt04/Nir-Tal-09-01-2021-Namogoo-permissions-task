const premissions = require('./permissions');

function router(app) {
  app.get('/', (req, res) => {
    res.send('hello backend server');
  });
  premissions(app);
}

module.exports = router;
