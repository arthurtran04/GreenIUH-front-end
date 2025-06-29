import React from 'react';
import './ContactPage.css';
import backgroundImage from '../assets/images/background/2d-wallpaper.jpg';

const contactInfo = {
  name: 'Phan Hoàng Thiên',
  studentId: '',
  email: '',
  phone: '',
  projectRole: 'Trưởng dự án GreenIUH'
};

const ContactPage = () => {
  return (
    <div 
      className="contact-page" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="contact-card">
        <h1>Thông Tin Liên Hệ</h1>
        <div className="contact-details">
          <p><strong>Họ và Tên:</strong> {contactInfo.name}</p>
          <p><strong>MSSV:</strong> {contactInfo.studentId}</p>
          <p><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
          <p><strong>Điện thoại:</strong> {contactInfo.phone}</p>
          <p><strong>Vai trò:</strong> {contactInfo.projectRole}</p>
        </div>
        <p className="contact-message">
          Nếu có bất kỳ thắc mắc hay góp ý nào về dự án, đừng ngần ngại liên hệ với chúng tôi!
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
