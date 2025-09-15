import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import LoginPage from './components/LoginPage';
import PhotosPage from './components/PhotosPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/photos"
            element={
              <ProtectedRoute>
                <PhotosPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/photos" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
