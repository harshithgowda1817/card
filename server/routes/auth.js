import { Router } from 'express';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import { verifyAdmin } from '../mock-data.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const valid = await verifyAdmin(username, password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: 'admin', username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, expiresIn: '7d' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/verify', auth, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

export default router;
