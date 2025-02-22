import styled from "styled-components";
import AuthForm from '../common/AuthForm';
import AuthLayout from '../common/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getItem, setItem } from '../../utils/localStorage';

const Login = () => {
  const URL = 'http://43.202.117.62:8080';
  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(URL + '/auth/login', {
        email,
        password,
      },{withCredentials: true});
      
      const { message, role, userId } = response.data;
      
      if(message=="로그인 성공"){
        setItem('isLoggedin', true);
        setItem('Role', role);
        setItem('userId', userId);
      }else{
        setItem('isLoggedin', false);
      }
      if (getItem('isLoggedin')) {
        navigate('/');  // 로그인 성공 후 메인 페이지로 리디렉션
      } else {
        setItem('isLoggedin', false);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error("Login failed", error);
      setItem('isLoggedin', false);
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <AuthLayout title="로그인">
      <AuthForm mode="login" onAuthSubmit={handleLogin}>
        <GotoSignup to="/signup">
          아직 잡파도 회원이 아니신가요?
        </GotoSignup>
      </AuthForm>
    </AuthLayout>
  );
};
export default Login;

const GotoSignup = styled(Link)`
  color: #3081F6;
  margin-top: 34px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;
