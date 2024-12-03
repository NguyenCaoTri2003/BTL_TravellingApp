import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Lưu thông tin người dùng đã đăng nhập
  const [userFavorites, setUserFavorites] = useState([]); // Lưu danh sách yêu thích

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userFavorites,    // Cung cấp danh sách yêu thích cho các thành phần con
        setUserFavorites, // Cung cấp hàm cập nhật danh sách yêu thích
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
