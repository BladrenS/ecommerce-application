import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CommerceToolsService } from './api/CommerceToolsService';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Loader } from './components/Ui';
import { Login, Main } from './pages';
import { RegistrationPage } from './pages/registrationPage/RegistrationPage';
import { ScrollToTop } from './utils/ScrollToTop';

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
      <ScrollToTop />
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<div>404 Page not found</div>} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};
