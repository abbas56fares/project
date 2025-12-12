# HabitFlow Backend

Backend server for the HabitFlow application with MySQL database integration.

## Prerequisites

- Node.js installed
- XAMPP installed and running (Apache and MySQL)
- phpMyAdmin accessible at http://localhost/phpmyadmin

## Setup Instructions

### 1. Database Setup

1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. The database `habitflow` should already exist
4. Select the `habitflow` database
5. Go to the SQL tab
6. Copy and paste the contents of `database_setup.sql` file
7. Click "Go" to execute the queries

This will create three tables:
- `users` - stores user accounts
- `habits` - stores user habits
- `contact_messages` - stores contact form submissions

### 2. Start the Server

```bash
cd server
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on http://localhost:5000

### 3. Test the Connection

Visit http://localhost:5000/api/test to verify database connection.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Habits
- `GET /api/habits/:userId` - Get all habits for a user
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)

## Database Configuration

The database connection is configured in `config/db.js`:
- Host: localhost
- User: root
- Password: 
- Database: habitflow


