import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getProfile, updateProfile, getLinks, createLink, updateLink, deleteLink } from '../mock-data.js';

const router = Router();

router.get('/profile', (req, res) => {
  const profile = getProfile();
  res.json(profile);
});

router.put('/profile', auth, (req, res) => {
  const { name, bio, avatar } = req.body;
  const profile = updateProfile({ name, bio, avatar });
  res.json(profile);
});

router.get('/links', (req, res) => {
  const links = getLinks(false);
  res.json(links);
});

router.get('/links/all', auth, (req, res) => {
  const links = getLinks(true);
  res.json(links);
});

router.post('/links', auth, (req, res) => {
  const link = createLink(req.body);
  res.status(201).json(link);
});

router.put('/links/:id', auth, (req, res) => {
  const link = updateLink(req.params.id, req.body);
  if (!link) return res.status(404).json({ message: 'Link not found' });
  res.json(link);
});

router.delete('/links/:id', auth, (req, res) => {
  const ok = deleteLink(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Link not found' });
  res.json({ message: 'Link deleted' });
});

export default router;
