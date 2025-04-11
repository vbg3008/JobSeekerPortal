# Student Job Tracker - Codebase Index

This document provides a comprehensive overview of the Student Job Tracker application codebase, explaining the purpose and functionality of each component and file.

## Project Structure

```
StudentJobTracker/
├── frontend/                  # Frontend React application
│   ├── public/                # Static assets
│   ├── src/                   # Source code
│   │   ├── assets/            # Images and other assets
│   │   ├── components/        # React components
│   │   ├── context/           # React context providers
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Main application component
│   │   ├── main.jsx           # Application entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── vite.config.js         # Vite build configuration
├── backend/                   # Backend Node.js application (planned)
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Express middleware
│   ├── models/                # Database models
│   └── .env                   # Environment variables
├── screenshots/               # Application screenshots
├── LICENSE                    # MIT License
└── README.md                  # Project documentation
```

## Frontend Components

### Core Components

| Component | File | Description |
|-----------|------|-------------|
| **App** | `frontend/src/App.jsx` | Main application component that sets up routing and layout |
| **Navbar** | `frontend/src/components/Navbar.jsx` | Navigation bar with app title, theme toggle, and add job button |
| **JobList** | `frontend/src/components/JobList.jsx` | Container for displaying job applications in either card or table view |
| **JobCard** | `frontend/src/components/JobCard.jsx` | Card component for displaying individual job applications |
| **JobTable** | `frontend/src/components/JobTable.jsx` | Table component for displaying job applications in a sortable table |
| **AddJob** | `frontend/src/components/AddJob.jsx` | Form for adding new job applications |
| **EditJob** | `frontend/src/components/EditJob.jsx` | Form for editing existing job applications |
| **ThemeToggle** | `frontend/src/components/ThemeToggle.jsx` | Toggle switch for dark/light mode |
| **KeyboardShortcutsModal** | `frontend/src/components/KeyboardShortcutsModal.jsx` | Modal displaying available keyboard shortcuts |

### Context Providers

| Context | File | Description |
|---------|------|-------------|
| **ThemeContext** | `frontend/src/context/ThemeContext.jsx` | Manages application theme (dark/light mode) |
| **KeyboardShortcutsContext** | `frontend/src/context/KeyboardShortcutsContext.jsx` | Manages keyboard shortcuts throughout the application |
| **FormContext** | `frontend/src/context/FormContext.jsx` | Manages form state for mobile view toggle functionality |

### Utility Functions

| Utility | File | Description |
|---------|------|-------------|
| **animations** | `frontend/src/utils/animations.js` | GSAP animation functions for UI elements |
| **disableTransitionsOnLoad** | `frontend/src/utils/disableTransitionsOnLoad.js` | Prevents animations during initial page load |

## Backend Structure (Planned)

| Component | Description |
|-----------|-------------|
| **config/db.js** | Database connection configuration |
| **controllers/jobController.js** | Job application CRUD operations |
| **middleware/errorMiddleware.js** | Error handling middleware |
| **models/jobModel.js** | Job application data model |

## Key Features Implementation

### 1. Job Application Management

The application allows users to:
- Add new job applications via `AddJob.jsx`
- Edit existing applications via `EditJob.jsx`
- View applications in card or table format via `JobList.jsx`
- Sort and filter applications via `JobTable.jsx`
- Delete applications with animated transitions

### 2. Responsive Design

The application is fully responsive with:
- Mobile-first approach using Tailwind CSS
- Different layouts for mobile, tablet, and desktop
- Special handling for mobile navigation with the "+" button that transforms to "X"
- Optimized table view with horizontal scrolling on small screens

### 3. Theme Support

Dark and light themes are implemented via:
- `ThemeContext.jsx` for state management
- `ThemeToggle.jsx` for user control
- Tailwind CSS classes for styling based on theme

### 4. Animations

The application uses GSAP for smooth animations:
- Navbar animations on page load
- Button hover effects
- Card and table row transitions
- Form animations
- Delete animations with scale effects

### 5. Keyboard Shortcuts

Power users can navigate the app using:
- Keyboard shortcuts defined in `KeyboardShortcutsContext.jsx`
- Modal help screen in `KeyboardShortcutsModal.jsx`
- Shortcuts for adding jobs, switching views, and toggling theme

## Data Flow

1. User interactions trigger component state changes or context updates
2. Context providers (Theme, Keyboard, Form) manage global state
3. Components react to state changes with UI updates
4. Animations enhance the visual feedback of state changes
5. Future backend integration will handle data persistence

## Styling Approach

The application uses:
- Tailwind CSS for utility-based styling
- Dynamic class names based on theme state
- GSAP for animations
- Responsive design patterns with mobile-first approach
- Consistent color schemes across components

## Future Development Areas

1. Backend implementation with Express and MongoDB
2. User authentication and accounts
3. Data visualization and statistics
4. Email notifications for application updates
5. Calendar integration for interview scheduling
6. Export functionality for data portability

This index provides a comprehensive overview of the Student Job Tracker codebase, helping developers understand the structure and functionality of the application.
