import { type FC, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CommerceToolsAuth } from './api/CommerceToolsService';
import { Footer, Header } from './components';
import { Article } from './components/Article/Article';
import { NewsFeed } from './components/News/NewsFeed';
import { Loader, ScrollToTopButton } from './components/Ui';
import { Catalog, Login, Main, RegistrationPage } from './pages';
import { About } from './pages/About/About';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { Profile } from './pages/Profile/Profile';
import { Wishlist } from './pages/Wishlist/Wishlist';
import styles from './styles/main.scss';
import { ScrollToTop } from './utils/ScrollToTop';

export const App: FC = () => {
  const [loading, setLoading] = useState(true);

  const checkAuth = async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      if (refreshToken) {
        await CommerceToolsAuth.refreshToken(refreshToken);
      } else {
        await CommerceToolsAuth.anonymousSession();
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
      <Header />
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<div className={styles['not-found']}>404 Page not found</div>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
};
