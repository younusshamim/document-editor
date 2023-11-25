export const getLocalStorageItems = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
