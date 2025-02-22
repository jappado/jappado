import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getItem, setItem, removeItem } from '../../utils/localStorage';

const Logout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false); // 로그아웃 상태 관리
  const isLoggedin = getItem("isLoggedin");
  const URL = 'http://43.202.117.62:8080';

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${URL}/auth/logout`);
        setItem('isLoggedin', false); // 로그아웃 상태 로컬스토리지에 저장
        removeItem('Role');
        removeItem('userId');
        setIsLoggedOut(true); // 로그아웃 완료 후 상태 업데이트
      } catch (error) {
        console.error("Logout failed", error);
        alert("로그아웃에 실패했어요. 다시 시도해주세요.");
      }
    };

    if (isLoggedin) { // 로그인 상태에서만 로그아웃 진행
      logout();
    }
  }, [isLoggedin]); // isLoggedin 값이 변경될 때마다 실행

  // 로그아웃 후 리다이렉션
  return isLoggedOut ? <Navigate to="/" /> : null;
};

export default Logout;
