import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './CollectionPage.css';
import bgImage from '../assets/images/purple-landscape.jpg';

const CollectionPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [isCollecting, setIsCollecting] = useState(false);
  const [sessionCans, setSessionCans] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Sẵn sàng để bắt đầu.');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/dang-nhap');
  }, [user, navigate]);

  useEffect(() => {
    let interval;
    if (isCollecting) {
      interval = setInterval(() => {
        const isCan = Math.random() > 0.2;
        if (isCan) {
          setSessionCans(prev => prev + 1);
          setStatusMessage(`Đã nhận 1 lon. Tổng cộng: ${sessionCans + 1}`);
        } else {
          setStatusMessage('Lỗi: Vật thể không phải lon. Vui lòng lấy lại.');
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isCollecting, sessionCans]);

  const startCollection = () => {
    setIsCollecting(true);
    setShowConfirmation(false);
    setSessionCans(0);
    setStatusMessage('Máy đang hoạt động... Vui lòng cho lon vào.');
  };

  const endCollection = () => {
    setIsCollecting(false);
    setShowConfirmation(true);
    setStatusMessage(`Hoàn tất. Bạn đã thu gom được ${sessionCans} lon trong phiên này.`);
  };

  const confirmCollection = () => {
    // Cập nhật số lon và điểm cho user
    if (user) {
      user.cansCollected += sessionCans;
      user.points += sessionCans;
    }
    setShowConfirmation(false);
    setSessionCans(0);
    setStatusMessage('Đã cập nhật thông tin. Sẵn sàng cho lần thu gom tiếp theo.');
  };

  const redeemVoucher = () => {
    if (user && user.points >= 80) {
      user.points -= 80;
      alert('Chúc mừng! Bạn đã đổi thành công voucher 10,000 VND. Điểm đã được trừ.');
    } else {
      alert('Bạn không đủ điểm để đổi voucher.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="collection-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="machine-panel" style={{ margin: '0 auto' }}>
        <h2>Hệ Thống Thu Gom</h2>
        <div className="status-display">
          <p>{statusMessage}</p>
        </div>
        <div className="session-counter">
          <p>Lon trong phiên này: <span>{sessionCans}</span></p>
        </div>
        <div className="controls">
          {!isCollecting && !showConfirmation && (
            <button onClick={startCollection} className="control-btn start">Bắt Đầu Thu Gom</button>
          )}
          {isCollecting && (
            <button onClick={endCollection} className="control-btn end">Kết Thúc</button>
          )}
          {showConfirmation && (
            <button onClick={confirmCollection} className="control-btn confirm">Xác Nhận</button>
          )}
        </div>
        <button 
          className={`voucher-btn ${user.points < 80 ? 'disabled' : ''}`}
          onClick={redeemVoucher}
          disabled={user.points < 80}
          style={{ marginTop: 32 }}
        >
          Đổi Voucher 10,000 VND (80 điểm)
        </button>
      </div>
    </div>
  );
};

export default CollectionPage;
