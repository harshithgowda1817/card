import bcrypt from 'bcryptjs';

let profile = {
  name: 'Harshit Gowda B M',
  bio: 'Developer & Creator',
  avatar: '',
};

let links = [
  { _id: '1', title: 'GitHub', url: 'https://github.com/harshithgowda1817', platform: 'github', order: 1, active: true },
  { _id: '2', title: 'X (Twitter)', url: 'https://x.com/Harshithg1817', platform: 'x', order: 2, active: true },
  { _id: '3', title: 'LinkedIn', url: 'https://www.linkedin.com/in/harshith-gowda-8783382a7/', platform: 'linkedin', order: 3, active: true },
  { _id: '4', title: 'Email', url: 'mailto:harshithgowda1817@gmail.com', platform: 'email', order: 4, active: true },
];

const ADMIN_USERNAME = 'admin';
let adminPasswordHash = null;

let nextId = 5;

async function initAdmin() {
  adminPasswordHash = await bcrypt.hash('admin@123', 12);
}

await initAdmin();

export function getProfile() {
  return { ...profile };
}

export function updateProfile(data) {
  profile = { ...profile, ...data };
  return getProfile();
}

export function getLinks(all = false) {
  const sorted = [...links].sort((a, b) => a.order - b.order);
  if (all) return sorted;
  return sorted.filter((l) => l.active);
}

export function createLink(data) {
  const link = { _id: String(nextId++), ...data };
  links.push(link);
  return { ...link };
}

export function updateLink(id, data) {
  const idx = links.findIndex((l) => l._id === id);
  if (idx === -1) return null;
  links[idx] = { ...links[idx], ...data };
  return { ...links[idx] };
}

export function deleteLink(id) {
  const idx = links.findIndex((l) => l._id === id);
  if (idx === -1) return false;
  links.splice(idx, 1);
  return true;
}

export async function verifyAdmin(username, password) {
  if (username !== ADMIN_USERNAME) return false;
  return bcrypt.compare(password, adminPasswordHash);
}
