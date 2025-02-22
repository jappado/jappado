import styled from 'styled-components';
import AuthForm from '../common/AuthForm';
import AuthLayout from '../common/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setItem } from '../../utils/localStorage';

const Signup = () => {
  const URL = 'http://43.202.117.62:8080';
  const navigate = useNavigate();

  const handleSignup = async (email, password, name, role) => {
    try {
      const response = await axios.post(URL + '/auth/signup', {
        email,
        password,
        name,
        role,
      });
      const loginResponse = await axios.post(URL + '/auth/login', {
        email,
        password,
      }, { withCredentials: true });
      console.log(loginResponse.data);
      const { message } = loginResponse.data;
      console.log(loginResponse.data.role);
      if (message === "로그인 성공") {
        // 로그인 성공 시 상태 업데이트
        setItem('isLoggedin', true);
        setItem('Role', loginResponse.data.role);
        navigate('/');  // 메인 페이지로 리디렉션
      } else {
        setItem('isLoggedin', false);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }

    } catch (error) {
      console.error("Regi failed", error);
      alert('이미 가입된 이메일이에요.');
    }
  };

  return (
    <AuthLayout title="회원가입">
      <AuthForm mode="signup" onAuthSubmit={handleSignup}>
        <GotoLogin to="/login">
          로그인 하러가기
        </GotoLogin>
      </AuthForm>
    </AuthLayout>
  );
}

const GotoLogin = styled(Link)`
  color: #3081F6;
  margin-top: 34px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

export default Signup;