import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import CollectionPage from './pages/CollectionPage';
import UserInfoPage from './pages/UserInfoPage';
import Layout from './components/Layout';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/dang-nhap" />;
}

function GuestRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/thu-gom" /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route
          path="/dang-nhap"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/thu-gom"
          element={
            <ProtectedRoute>
              <CollectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/thong-tin"
          element={
            <ProtectedRoute>
              <UserInfoPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

// ✅ DI CHUYỂN `useContext` lên App (sau khi Provider wrap xong)
function App() {
  return (
    <AuthProvider>
      <WithAuthReady />
    </AuthProvider>
  );
}

// 👇 Tách phần xử lý loading
function WithAuthReady() {
  const { loading } = useContext(AuthContext);

  if (loading) return <div>Đang xác thực...</div>;
  return <AppRoutes />;
}

export default App;
