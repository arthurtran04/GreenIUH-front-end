import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 100px)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;


