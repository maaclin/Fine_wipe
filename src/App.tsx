import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthCheck } from './components/AuthCheck';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<AuthPage mode="signin" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route
          path="/dashboard"
          element={
            <AuthCheck>
              <DashboardPage />
            </AuthCheck>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;