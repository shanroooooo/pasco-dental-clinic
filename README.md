# Dental Clinic Management System

A comprehensive dental clinic management system built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## Features

### Frontend (React)
- **Patient Portal**: Complete patient profile management
- **Admin Dashboard**: Staff and clinic management
- **Appointment Scheduling**: Book and manage appointments
- **Medical Records**: View treatment history and documents
- **Document Management**: Upload and download medical documents
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

### Backend (Node.js/Express)
- **Authentication**: JWT-based secure authentication
- **User Management**: Role-based access control (admin, dentist, staff, patient)
- **Patient Management**: Complete patient profiles and medical history
- **Appointment System**: Full scheduling and management
- **Document Storage**: File upload/download with security
- **RESTful APIs**: Comprehensive API endpoints
- **Database Integration**: MongoDB with Mongoose ODM

## Tech Stack

### Frontend
- React 19
- React Router 7
- Tailwind CSS 4
- Lucide React (Icons)
- Recharts (Charts)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)
- bcryptjs (Password Hashing)

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (installed and running)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dental_clinic
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   JWT_EXPIRE=7d
   ```

4. **Seed the database with sample data:**
   ```bash
   npm run seed
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to root directory:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

## Default Login Credentials

After seeding the database, you can use these credentials:

### Admin Access
- **Email**: admin@dentalclinic.com
- **Password**: admin123

### Dentist Access
- **Email**: sarah.johnson@dentalclinic.com
- **Password**: dentist123

### Staff Access
- **Email**: alice.smith@dentalclinic.com
- **Password**: staff123

### Patient Access
- **Email**: john.doe@email.com
- **Password**: patient123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/dentists/list` - Get all dentists

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/profile` - Get current patient profile
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create patient profile
- `PUT /api/patients/:id` - Update patient profile

### Appointments
- `GET /api/appointments` - Get appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `GET /api/appointments/available-slots/:dentistId` - Get available time slots

### Documents
- `GET /api/documents/patient/:patientId` - Get patient documents
- `GET /api/documents/:id` - Get document by ID
- `POST /api/documents` - Upload document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document
- `GET /api/documents/:id/download` - Download document

## Project Structure

```
dental-clinic/
├── server/                 # Backend application
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── scripts/           # Database scripts
│   ├── uploads/           # File upload directory
│   └── server.js          # Main server file
├── src/                   # Frontend application
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── main.jsx           # App entry point
├── public/                # Static assets
└── package.json           # Frontend dependencies
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- File upload security
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Helmet.js for security headers

## Development

### Running in Development Mode

1. **Start MongoDB** (if not running)
2. **Start Backend Server:**
   ```bash
   cd server && npm run dev
   ```
3. **Start Frontend Server:**
   ```bash
   npm run dev
   ```

### Building for Production

1. **Build Frontend:**
   ```bash
   npm run build
   ```

2. **Start Backend in Production:**
   ```bash
   cd server && npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
