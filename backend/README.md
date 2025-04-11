# JobSeekerPortal Backend

This is the backend API for the JobSeekerPortal application, which helps users track their job applications.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/jobseekerportal
   NODE_ENV=development
   ```

3. Make sure MongoDB is running on your local machine or update the MONGO_URI to point to your MongoDB instance.

## Running the Server

- Start the server in development mode (with nodemon for auto-reloading):
  ```
  npm run dev
  ```

- Start the server in production mode:
  ```
  npm start
  ```

## Loading Sample Data

- To import sample job data:
  ```
  npm run data:import
  ```

- To delete all data from the database:
  ```
  npm run data:destroy
  ```

## API Endpoints

### Jobs

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get a specific job
- `POST /api/jobs` - Create a new job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job

## Data Model

### Job

- `company` (String, required): Company name
- `role` (String, required): Job role/position
- `status` (String, required): Application status (Applied, Interview, Offer, Rejected)
- `dateApplied` (Date, required): Date when the application was submitted
- `link` (String, optional): URL to the job posting
- `createdAt` (Date): Timestamp when the record was created
- `updatedAt` (Date): Timestamp when the record was last updated
