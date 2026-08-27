const express = require('express');
const router = express.Router();

// Hardcoded user store — temporary
const users = [
  { id: 1, name: 'Admin', role: 'admin', password: 'admin123' },
  { id: 2, name: 'Guest', role: 'guest', password: 'guest' },
];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/login', (req, res) => {
  const { name, password } = req.body;
  const user = users.find(u => u.name === name && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: Buffer.from(`${user.id}:${user.role}`).toString('base64') });
});

module.exports = router;
