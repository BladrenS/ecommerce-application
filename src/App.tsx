import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CommerceToolsService } from './api/CommerceToolsService';
import { Loader } from './components/Ui';
import { Login, Main, Register } from './pages';

export const App: FC = () => {
  const [loading, setLoading] = useState(true);

  const checkAuth = async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      if (refreshToken) {
        await CommerceToolsService.refreshToken(refreshToken);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<div>404 Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
