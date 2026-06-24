import 'dotenv/config';
import mongoose from 'mongoose';
import Profile from './models/Profile.js';
import Link from './models/Link.js';
import Admin from './models/Admin.js';

const links = [
  { title: 'GitHub', url: 'https://github.com/harshithgowda1817', platform: 'github', order: 1 },
  { title: 'X (Twitter)', url: 'https://x.com/Harshithg1817', platform: 'x', order: 2 },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/harshith-gowda-8783382a7/', platform: 'linkedin', order: 3 },
  { title: 'Email', url: 'mailto:harshithgowda1817@gmail.com', platform: 'email', order: 4 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Profile.deleteMany({});
    await Profile.create({
      name: 'Harshit Gowda B M',
      bio: 'Developer & Creator',
      avatar: '',
    });
    console.log('Profile seeded');

    await Link.deleteMany({});
    await Link.insertMany(links);
    console.log('Links seeded');

    await Admin.deleteMany({});
    const admin = new Admin({
      username: 'admin',
      password: 'admin@123',
    });
    await admin.save();
    console.log('Admin user seeded (admin / admin@123)');

    await mongoose.disconnect();
    console.log('Done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
