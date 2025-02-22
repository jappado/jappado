import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CloseIcon from '../../assets/CloseIcon.png';

const AuthLayout = ({ title, children }) => {
  return (
    <Container>
      <Topbar>
        <StyledNavLink to="/">
          <Header>잡파도</Header>
        </StyledNavLink>
        <StyledNavLink to="/">
          <CloseImg src={CloseIcon} alt="Close" />
        </StyledNavLink>
      </Topbar>
      <Title title={title}>{title}</Title>
      {children}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#E4E8FF, #FFFFFF 65%);
`;

const Title = styled.div`
  font-size: 36px;
  position: absolute;
  top: ${({ title }) => (title === '로그인' ? 'calc(50% - 270px)' : 'calc(50% - 310px)')};
`;

const Topbar = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
`;
const StyledNavLink = styled(Link)`
  color: #191919;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 15px;
`;

const CloseImg = styled.img`
  width: 24px;
  height: 24px;
`;

const HomeButtonWrapper = styled(Link)`
  margin-left: 54px;
  display: flex;
  align-items: center;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const HomeTitle = styled.div`
  font-size: 18px;
  margin-left: 4px;
  color: black;
`;

const HomeButtonIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
`;

const CloseButtonWrapper = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 54px;
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
`;

const CloseButtonIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export default AuthLayout;
