import axios from 'axios';

const URL = 'http://43.202.117.62:8080';

export const registerCandidate = async (candidateData) => {
  try {
    const response = await axios.post(`${URL}/candidates/register`, candidateData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("등록 실패:", error);
    throw error;
  }
};

export const getCandidateById = async (id) => {
  try {
    const response = await axios.get(`${URL}/candidates/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch candidate:', error);
    throw error;
  }
};

export const getCandidates = async () => {
  try {
    const response = await axios.get(`${URL}/candidates/candidateInfo`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch candidates:', error);
    throw error;
  }
};

// Companies API
export const registerCompany = async (data) => {
  try {
    const response = await axios.post(`${URL}/companies/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("등록 실패:", error);
    throw error;
  }
};

export const getCompanyById = async (id) => {
  try {
    const response = await axios.get(`${URL}/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch company:', error);
    throw error;
  }
};

export const getCompanyInfo = async () => {
  try {
    const response = await axios.get(`${URL}/companies/companies`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch company info:', error);
    throw error;
  }
};

// Offers API
export const createOffer = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`${URL}/offers`, data);
    return response.data;
  } catch (error) {
    console.error('Offer creation failed:', error);
    throw error;
  }
};

export const respondToOffer = async (offerId, responseType) => {
  try {

    const response = await axios.put(
      `${URL}/offers/1/respond`, 
      { responseType }, // 요청 본문에 responseType을 포함
      {
        headers: {
          'Content-Type': 'text/plain', // 필요한 경우 추가 헤더 설정
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to respond to offer:', error);
    throw error;
  }
};


export const getOffersByCompanyId = async (companyId) => {
  try {
    const response = await axios.get(`${URL}/offers/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch offers for company:', error);
    throw error;
  }
};

export const getOffersByCandidateId = async (candidateId) => {
  try {
    const response = await axios.get(`${URL}/offers/candidate/1`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch offers for candidate:', error);
    throw error;
  }
};
