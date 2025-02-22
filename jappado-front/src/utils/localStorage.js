// utils/localStorage.js

export const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null; // 객체로 저장한 경우를 고려
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value)); // 객체 저장 시 JSON.stringify 사용
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
