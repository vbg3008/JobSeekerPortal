# Student Job Tracker - Frontend

This is the frontend for the Student Job Tracker application, built with React, Tailwind CSS, and GSAP animations.

## Environment Setup

The application uses environment variables to connect to the backend API. Create the following files in the frontend directory:

### Production Environment (.env)

```
VITE_BACKEND_URL=https://jobseekerportal.onrender.com
```

### Development Environment (.env.development)

```
VITE_BACKEND_URL=http://localhost:5000
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies required for the application.

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Serves the production build locally for preview purposes.

## Features

- Track job applications with company, role, status, and date information
- View applications in card or table format
- Sort and filter applications
- Dark mode support
- Responsive design for mobile, tablet, and desktop
- Keyboard shortcuts for power users
- Smooth animations for a modern user experience

## Technologies Used

- React
- React Router
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- Vite
