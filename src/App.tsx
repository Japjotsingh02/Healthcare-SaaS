import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loader from './components/common/Loader';
import { useAuthStore } from './store/authStore';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const PatientDetailsPage = lazy(() => import('./pages/PatientDetailsPage'));
const PatientDetailPage = lazy(() => import('./pages/PatientDetailPage'));

function AuthBootstrap() {
  useEffect(() => {
    return useAuthStore.getState().initAuth();
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthBootstrap />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="patients" element={<PatientDetailsPage />} />
            <Route path="patients/:id" element={<PatientDetailPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}