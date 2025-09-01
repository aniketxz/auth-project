# HighwayDelite Auth Project

A full-stack authentication and notes app using Node.js, Express, MongoDB, React, and Tailwind CSS.

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/aniketxz/auth-project
cd auth-project
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env
npm install
npm start
```

#### Gmail SMTP Setup

To enable email functionality (OTP sending), you need to configure Gmail SMTP:

1. Go to your [Google Account settings](https://myaccount.google.com)
2. Navigate to Security settings
3. Enable 2-Step Verification if not already enabled
4. Go to Security > 2-Step Verification > App passwords
5. Select 'Mail' and your device type
6. Click 'Generate'
7. In your backend `.env` file:
   - Set `SMTP_USER` as your Gmail address
   - Set `SMTP_PASS` as the 16-character app password generated

**Note**: Never use your regular Gmail password. Always use App Password for SMTP.

### 3. Setup Frontend

```bash
cd ../frontend
cp .env.example .env
# Edit .env if needed (API URL)
npm install
npm run dev
```

### 4. Open in Browser

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in terminal)

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
SMTP_USER=your_gmail_address@gmail.com
SMTP_PASS=your_gmail_app_password
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Features

- Email OTP authentication (Gmail SMTP)
- User registration with name, email, and date of birth
- JWT-based session management
- Notes CRUD (Create, Read, Delete)
- Protected routes (frontend & backend)

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, TypeScript, Tailwind CSS, Zustand

---

For any issues, please open an issue or contact the maintainer.
