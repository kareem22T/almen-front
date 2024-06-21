import React, { useState, ReactNode } from 'react';
import Header from '../components/includes/header';
import Footer from '../components/includes/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const lang = useSelector((state: RootState) => state.settings.lang);

  return (
    <div  className={lang == 'en' ? "en" : "ar"}>
      <Header />
      <div className="main_content_fluid">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
