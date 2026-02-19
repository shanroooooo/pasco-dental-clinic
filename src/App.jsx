import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PatientLayout from './components/PatientLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import ScheduleInquiry from './pages/ScheduleInquiry';
import Appointments from './pages/Appointments';
import PatientProfile from './pages/PatientProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="schedule" element={<ScheduleInquiry />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="profile" element={<PatientProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

