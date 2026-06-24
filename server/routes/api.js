import { Router } from 'express';
import Profile from '../models/Profile.js';
import Link from '../models/Link.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'No profile found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const profile = await Profile.findOneAndUpdate(
      {},
      { name, bio, avatar },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/links', async (req, res) => {
  try {
    const links = await Link.find({ active: true }).sort({ order: 1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/links/all', auth, async (req, res) => {
  try {
    const links = await Link.find().sort({ order: 1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/links', auth, async (req, res) => {
  try {
    const link = await Link.create(req.body);
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/links/:id', auth, async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/links/:id', auth, async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.json({ message: 'Link deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
