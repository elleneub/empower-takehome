# A simple project using React, Typescript, Express, and MySQL

This was started with Create React App, who's README documentation is below. I am using Cursor's Auto model to help code this!

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Initial Setup

1. Install project dependencies:

   ```bash
   npm install
   ```

### Database Setup

1. Install MySQL if you haven't already:

   ```bash
   # On macOS with Homebrew
   brew install mysql
   ```

2. Start MySQL:

   ```bash
   brew services start mysql
   ```

3. Set up your database credentials:
   Create a `.env` file in the project root with the following content:

   ```
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=empower_db
   DB_PORT=3306
   ```

   Replace `your_password` with your MySQL root password.

4. Create the database and tables:

   ```bash
   # Create the database
   mysql -u root -p
   # Enter your password when prompted
   CREATE DATABASE empower_db;
   exit;

   # Run the setup script to create tables
   npm run setup-db
   ```

### Running the Application

You'll need two terminal windows to run both the frontend and backend:

Terminal 1 (Backend - http://localhost:3001):

```bash
npm run serve
```

Terminal 2 (Frontend - http://localhost:3000):

```bash
npm start
```

## Project Structure

- `/src` - Frontend React application
- `/server` - Backend Express server
- `/public` - Static files
- `server/db.config.js` - Database configuration
- `server/db.setup.js` - Database setup script

## Available Scripts

- `npm start` - Start the frontend development server
- `npm run serve` - Start the backend server
- `npm run setup-db` - Set up the database tables
- `npm run build` - Build the frontend for production
- `npm test` - Run frontend tests

## Todo

- Tests
- Linting
- CI/CD Code Quality (linting, run tests, etc.)
- Clean up README
- Break the notes into two separate pages

## Assignment notes

Your assignment is to make a minimal canvassing web app.

## Bonus Points

Some ideas for enhancements to make to your project if you finish early:

- Implement users and authentication
- Allow editing the canvassing notes
- Add an email field, and add some validation on that email
- Make it possible to search across canvassing notes
- Make it possible to export the canvassing results as CSV
- Make the pages look nice
- Make the pages look nice on mobile
- Actually deploy it on a server somewhere

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
