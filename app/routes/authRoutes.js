const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      console.log("Credenciales incorrectas");
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  });

module.exports = router;
