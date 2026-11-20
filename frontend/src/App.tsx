import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ScenarioProvider } from './context/ScenarioContext';
import { MapStateProvider } from './context/MapStateContext';
import { AppLayout } from './components/layout/AppLayout';

import { OverviewPage } from './pages/OverviewPage';
import { MapPage } from './pages/MapPage';
import { OperationsPage } from './pages/OperationsPage';
import { LoginPage } from './pages/LoginPage';
import { AboutPage } from './pages/AboutPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RootRedirect: React.FC = () => {
  return <Navigate to="/login" replace />;
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ScenarioProvider>
          <MapStateProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<AppLayout />}>
                  <Route index element={<RootRedirect />} />
                  <Route path="overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
                  <Route path="map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
                  <Route path="operations" element={<ProtectedRoute><OperationsPage /></ProtectedRoute>} />
                  <Route path="about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
                  <Route path="*" element={<RootRedirect />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </MapStateProvider>
        </ScenarioProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
