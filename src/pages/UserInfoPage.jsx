import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './UserInfoPage.css';
import bgImage from '../assets/images/purple-landscape.jpg';

const UserInfoPage = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // if (!token) {
    //   setError('Bạn chưa đăng nhập.');
    //   setLoading(false);
    //   return;
    // }

    const fetchProfile = async () => {
      try {
        const response = await fetch('https://greeniuh-backend.onrender.com/api/User/me/detail', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Lỗi khi tải thông tin.');
        }

        setProfile(data);
      } catch (err) {
        setError(err.message || 'Lỗi không xác định.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="user-info-page">
        <h2>Đang tải thông tin...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-info-page">
        <h2>{error}</h2>
      </div>
    );
  }

return (
  <div className="user-info-page" style={{ backgroundImage: `url(${bgImage})` }}>
    <div className="user-info-card">
      <h2>Thông Tin Người Dùng</h2>
      <div className="user-info-detail">
        <p><strong>Số điện thoại:</strong> {profile.phoneNumber || 'Không có'}</p>
        <p><strong>Email:</strong> {profile.email || 'Không có'}</p>
        <p><strong>Điểm tích lũy:</strong> {profile.point}</p>

        {profile.records?.length > 0 ? (
          profile.records.map((record, index) => (
            <p key={index}>
              <strong>{record.materialName}:</strong> {record.quantity}
            </p>
          ))
        ) : (
          <p><strong>Đã góp:</strong> Chưa có dữ liệu góp lon/chai.</p>
        )}
      </div>
    </div>
  </div>
);

};

export default UserInfoPage;
