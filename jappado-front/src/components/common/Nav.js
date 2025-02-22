import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { getItem, setItem } from '../../utils/localStorage';

const Nav = () => {
  const isLoggedin = getItem('isLoggedin');
  const role = getItem('Role');
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <StyledNavLink to="/" exact>
            <HeaderIcon>잡파도</HeaderIcon>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/" exact>
            홈
          </StyledNavLink>
          <StyledNavLink to="/housing">
            주거
          </StyledNavLink>
          <StyledNavLink to="/regi">
            등록
          </StyledNavLink>
          {role === 'CANDIDATE' ? (
            <StyledNavLink to="/offer">
              받은 제안
            </StyledNavLink>
          ) : (
            <StyledNavLink to="/sent-offers">
              보낸 제안
            </StyledNavLink>
          )}
        </NavItem>
        <NavItem>
          <AuthBtn to={!isLoggedin ? "/login" : "/logout"} marginLeft={!isLoggedin ? '16px' : '0'}>
            {!isLoggedin ? '로그인' : '로그아웃'}
          </AuthBtn>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.nav`
  height: 60px;
  padding: 0 36px;
`;

const NavList = styled.ul`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.li`
`;

const StyledNavLink = styled(NavLink)`
  height: 54px;
  padding: 15px;
  font-size: 18px;
  color: #757f8c; 
  &:hover {
    color: #191919;
  }

  /* 선택된 링크에 bold 스타일 적용 */
  &.active {
    font-weight: bold;
    color: #191919;
  }
`;
const HeaderIcon = styled.header`
  font-weight: bold;
  padding: 15px;
  color: #191919;
`;
const AuthBtn = styled(NavLink)`
  background-color: #007bff;
  padding: 4px 12px;
  color: white;
  border-radius: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  margin-left: ${(props) => props.marginLeft || '0'}; /* 조건에 따라 margin-left 적용 */

  &:hover {
    background-color: #0056b3;
  }
`;