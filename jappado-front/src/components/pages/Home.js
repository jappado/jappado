import Nav from "../common/Nav";
import { useState } from "react";
import CompanyInfo from "../common/Home/CompanyInfo";
import CandidatesInfo from "../common/Home/CandidatesInfo";
import styled from "styled-components";

const Home = () => {
  const [selectedRole, setSelectedRole] = useState("COMPANY");

  const handleRoleSelect = (role) => {
    if (selectedRole === role) {
      // 같은 기업을 클릭하면 다시 불러오게 하기 위해 key를 변경
      setSelectedRole(null);  // 먼저 null로 설정
      setTimeout(() => setSelectedRole(role), 0);  // 바로 role로 다시 설정
    } else {
      setSelectedRole(role);  // 다른 역할을 선택하면 그냥 설정
    }
  };

  return (
    <div>
      <Nav />
      <Main>
        <ContentsWrapper>
          <RoleSelector>
            <ButtonWrapper>
              <RoleButton 
                onClick={() => handleRoleSelect("COMPANY")} 
                active={selectedRole === "COMPANY"}
              >
                기업
              </RoleButton>
              <UnderLine active={selectedRole === "COMPANY"} />
            </ButtonWrapper>
            <ButtonWrapper>
              <RoleButton 
                onClick={() => handleRoleSelect("CANDIDATE")} 
                active={selectedRole === "CANDIDATE"}
              >
                구직자
              </RoleButton>
              <UnderLine active={selectedRole === "CANDIDATE"} />
            </ButtonWrapper>
          </RoleSelector>
          {selectedRole === "COMPANY" && <CompanyInfo key="company" />}
          {selectedRole === "CANDIDATE" && <CandidatesInfo key="candidate" />}
        </ContentsWrapper>
      </Main>
    </div>
  );
};


export default Home;

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;
const ContentsWrapper = styled.div`
  width: 1280px;
`;
const RoleSelector = styled.div`
  margin: 20px;
  display: flex;
  gap: 10px;
`;
const ButtonWrapper = styled.div`
`;
const RoleButton = styled.button`
  padding: 5px 10px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ active }) => (active ? "black" : "#757f8c")};
  cursor: pointer;

`;
const UnderLine = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};;
  background-color: black;
  width: 100%;
  height: 4px;
  border-radius: 10px;
`;
