import React, { useState, ReactNode } from 'react';
import Header from '../components/includes/header';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div>
      <Header />
      <div className="main_content_fluid">
        {children}
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default DefaultLayout;
