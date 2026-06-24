# Harshith Card

Personal link-in-bio page built with React, Express, and MongoDB. Features a skeuomorphic dark UI and an admin dashboard for managing links and profile.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Express, Mongoose, JWT
- **Database:** MongoDB
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Install

```bash
npm run install:all
```

### Seed Database

```bash
npm run seed
```

This populates the database with your profile, links, and an admin user.

### Run Locally

```bash
npm run dev
```

- Client: http://localhost:3000
- Server: http://localhost:5000

## Routes

| Path | Description |
|---|---|
| `/` | Public profile page |
| `/admin` | Admin dashboard (protected) |
| `/admin/login` | Admin login |

Admin panel is only accessible via direct URL — no public navigation to it.

## Admin Credentials

- **Username:** `admin`
- **Password:** `admin@123`
- **Token expiry:** 7 days

## API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/profile` | No | Get profile |
| PUT | `/api/profile` | Yes | Update profile |
| GET | `/api/links` | No | Get active links |
| GET | `/api/links/all` | Yes | Get all links |
| POST | `/api/links` | Yes | Create link |
| PUT | `/api/links/:id` | Yes | Update link |
| DELETE | `/api/links/:id` | Yes | Delete link |
| POST | `/api/auth/login` | No | Admin login |

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for signing JWT tokens |

## License

MIT
