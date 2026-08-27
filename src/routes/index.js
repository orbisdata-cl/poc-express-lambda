const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ service: 'poc-express-lambda', status: 'ok' });
});

module.exports = router;
