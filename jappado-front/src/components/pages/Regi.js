import Nav from "../common/Nav";
import styled from "styled-components";
import { registerCandidate, registerCompany } from "../../utils/api";
import Button from '../common/Button';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getItem } from "../../utils/localStorage";

const Recruit = () => {
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    skills: "",
    experience: "",
    category: "",
    profilePicture: null, 
    name: "",
    address: "",
    category: "",
    text: "",
    image: null,
  });
  
  useEffect(() => {
    const storedRole = getItem('Role'); // 'role'을 로컬스토리지에서 가져옴
    setRole(storedRole || '');
    const storedId = getItem('userId');
    setUserId(storedId || '');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0], // 파일 객체 저장
    }));
  };

  const handleCompanyFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0], // 파일 객체 저장
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {};

    // 구직자와 기업에 맞는 payload 설정
    if (role === 'CANDIDATE') {
      payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        skills: formData.skills,
        experience: formData.experience,
        category: formData.category,
        profilePicture: formData.profilePicture,
      };
    } else if (role === 'COMPANY') {
      payload = {
        name: formData.name,
        address: formData.address,
        category: formData.category,
        text: formData.text,
        image: formData.image,
        companyId: userId,
      };
    }

    try {
      // 구직자와 기업에 맞는 API 호출
      console.log(payload)
      const response = await (role === 'CANDIDATE' ? registerCandidate(payload) : registerCompany(payload));
      alert("등록에 성공했어요.");
      navigate('/');
    } catch (error) {
      alert("등록에 실패했어요. 다시 시도해주세요.");
    }
  };
  
  return (
    <RecruitContainer>
      <Nav />
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Header>{role === 'CANDIDATE' ? '구직자 등록' : '기업 등록'}</Header>
          
          {role === 'CANDIDATE' ? (
            <>
              <ImagePreviewContainer onClick={() => document.getElementById('fileInput').click()}>
                {formData.profilePicture ? (
                  <Preview src={URL.createObjectURL(formData.profilePicture)} alt="Preview" />
                ) : (
                  <span>이미지를 클릭하여 업로드</span>
                )}
              </ImagePreviewContainer>
              <FileInput
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </>
          ) : (
            <>
              <ImagePreviewContainer onClick={() => document.getElementById('fileInput').click()}>
                {formData.image ? (
                  <Preview src={URL.createObjectURL(formData.image)} alt="Preview" />
                ) : (
                  <span>이미지를 클릭하여 업로드</span>
                )}
              </ImagePreviewContainer>
              <FileInput
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleCompanyFileChange}
                style={{ display: 'none' }}
              />
            </>
          )}

          {role === 'CANDIDATE' ? (
            <>
              <Input type="text" name="fullName" placeholder="이름" value={formData.fullName} onChange={handleChange} />
              <Input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
              <Input type="text" name="phoneNumber" placeholder="휴대폰 번호" value={formData.phoneNumber} onChange={handleChange} />
              <Input type="text" name="skills" placeholder="스킬" value={formData.skills} onChange={handleChange} />
              <Input type="text" name="experience" placeholder="경력" value={formData.experience} onChange={handleChange} />
              <Input type="text" name="category" placeholder="직군" value={formData.category} onChange={handleChange} />
            </>
          ) : (
            <>
              <Input type="text" name="name" placeholder="기업명" value={formData.name} onChange={handleChange} />
              <Input type="text" name="address" placeholder="주소" value={formData.address} onChange={handleChange} />
              <Input type="text" name="category" placeholder="직군" value={formData.category} onChange={handleChange} />
              <Input type="text" name="text" placeholder="설명" value={formData.text} onChange={handleChange} />
            </>
          )}

          <Button
            type="submit"
            width="352px"
            height="48px"
            backgroundColor="#3081F6"
            color="white"
            fontSize="20px"
            borderRadius="10px"
            marginTop="14px"
          >
            등록
          </Button>
        </Form>
      </FormWrapper>
    </RecruitContainer>
  );
};
export default Recruit;

const RecruitContainer = styled.div``;

const FormWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 24px;
`;

const ImagePreviewContainer = styled.div`
  width: 352px;
  height: 200px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 352px;
  height: 48px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 0 18px;
  font-size: 16px;
  box-sizing: border-box;
  &:focus {
    outline-color: #3081f6;
  }
`;

const FileInput = styled.input``;
