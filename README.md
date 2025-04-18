# Student Job Tracker

![Student Job Tracker](https://github.com/vbg3008/JobSeekerPortal/raw/main/screenshots/dashboard.png)

A modern, responsive web application designed to help students track their job applications throughout the job search process. Built with React, Tailwind CSS, and GSAP animations.

## Features

- **Track Job Applications**: Keep all your job applications in one place
- **Application Status**: Monitor the status of each application (Applied, Interview, Offer, Rejected)
- **Sortable Data**: Sort your applications by company, role, status, or date
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Animations**: Smooth, modern animations enhance the user experience
- **Keyboard Shortcuts**: Power-user friendly with keyboard navigation

## Tech Stack

### Frontend

- React.js
- Tailwind CSS for styling
- GSAP for animations
- React Router for navigation
- Context API for state management

### Backend (Planned)

- Node.js
- Express
- MongoDB
- JWT Authentication

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository

   ```bash
   git clone https://github.com/vbg3008/JobSeekerPortal.git
   cd JobSeekerPortal
   ```

2. Running the Frontend

   ```bash
   # Navigate to frontend directory
   cd frontend

   # Install dependencies
   npm install

   # Start the frontend development server
   npm run dev
   ```

3. Running the Backend

   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Start the backend development server
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to access the application

## Usage

### Adding a Job Application

1. Click the "Add Job" button in the navigation bar
2. Fill out the form with the job details:
   - Company name
   - Role/position
   - Application status
   - Date applied
   - Job posting URL (optional)
3. Click "Submit" to save the job application

### Tracking Applications

- View all your applications in either card or table view
- Filter applications by status using the dropdown menu
- Sort applications by clicking on column headers
- Click "Edit" to update application details
- Click "Delete" to remove an application

### Keyboard Shortcuts

- `A`: Add a new job application
- `T`: Switch to table view
- `C`: Switch to card view
- `D`: Toggle dark mode

## Customization

### Themes

The application supports both light and dark themes. Toggle between them using the theme switch in the navigation bar or by pressing the `D` key.

### Views

Switch between card and table views using the view toggle buttons or by pressing the `C` or `T` keys.

## Roadmap

- [ ] Backend implementation with MongoDB
- [ ] User authentication and accounts
- [ ] Email notifications for application updates
- [ ] Calendar integration for interview scheduling
- [ ] Data visualization and statistics
- [ ] Export data to CSV/PDF
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)

---

Developed with ❤️ for students navigating the job market
