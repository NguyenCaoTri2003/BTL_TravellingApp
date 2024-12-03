import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy dữ liệu người dùng từ API khi ứng dụng khởi động
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://6722030b2108960b9cc28724.mockapi.io/loginApp');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Chỉ gọi một lần khi ứng dụng khởi động

  // Thêm người dùng vào danh sách (sau khi đăng ký hoặc đăng nhập)
  const addUser = async (user) => {
    setLoading(true);
    try {
      const response = await fetch('https://6722030b2108960b9cc28724.mockapi.io/loginApp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setCurrentUser(data); // Đặt user vừa đăng ký vào state currentUser
    } catch (err) {
      setError('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  // Hàm cập nhật người dùng
  const updateUser = async (updatedUser) => {
    setLoading(true);
    try {
      const response = await fetch(`https://6722030b2108960b9cc28724.mockapi.io/loginApp/${updatedUser.phoneNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      setUsers((prevUsers) => prevUsers.map(user => user.phoneNumber === updatedUser.phoneNumber ? data : user));
      setCurrentUser(data); // Cập nhật lại currentUser sau khi thay đổi
    } catch (err) {
      setError('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${API_URL}/${userId}`);
      const userData = await response.json();
      if (Array.isArray(userData.listFavorateHotel)) {
        setFavoriteHotels(userData.listFavorateHotel);
      } else {
        console.error('Invalid favorite hotels data:', userData);
      }
    } catch (error) {
      console.error('Error fetching favorite hotels:', error);
    }
  };

  return (
    <ApiContext.Provider value={{ users, currentUser, addUser, updateUser, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};
