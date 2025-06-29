import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import backgroundImage from '../assets/images/background/2d-wallpaper.jpg';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

  const validateInput = () => {
    if (isLogin) {
      const isPhone = phoneRegex.test(phoneOrEmail);
      const isEmail = emailRegex.test(phoneOrEmail);
      if (!isPhone && !isEmail) return 'Vui lòng nhập đúng số điện thoại hoặc email.';
      if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
    } else {
      if (!phoneRegex.test(phoneOrEmail)) return 'Số điện thoại không hợp lệ.';
      if (!emailRegex.test(email)) return 'Email không hợp lệ.';
      if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
      if (password !== confirmPassword) return 'Mật khẩu xác nhận không khớp.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const url = isLogin
        ? 'http://localhost:5000/api/User/user-login'
        : 'http://localhost:5000/api/User/create-user';

      const payload = isLogin
        ? { identifier: phoneOrEmail, password }
        : { phoneNumber: phoneOrEmail, email, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('API response:', result);

      if (!response.ok) {
        const message = result?.message || 'Có lỗi xảy ra.';
        setError(message);
        return;
      }

    login({ user: result.user, token: result.token });
    navigate('/thu-gom');
    } catch (err) {
      console.error('Network error:', err);
      setError('Lỗi kết nối đến máy chủ.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setPhoneOrEmail('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <div className="login-logo">GreenIUH</div>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <input
              type="text"
              placeholder={isLogin ? 'Số điện thoại hoặc Email' : 'Số điện thoại'}
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
          </button>

          <p className="toggle-form-text">
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <span onClick={toggleForm} className="toggle-form-link">
              {isLogin ? ' Đăng ký ngay' : ' Đăng nhập'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
