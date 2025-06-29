import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} GreenIUH. All Rights Reserved.</p>
        <p>Một dự án vì môi trường xanh từ sinh viên IUH.</p>
      </div>
    </footer>
  );
};

export default Footer;


