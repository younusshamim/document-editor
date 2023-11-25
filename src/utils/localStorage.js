export const getLocalStorageItems = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const setOnLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorageItem = (key, item) => {
  const storedItems = getLocalStorageItems(key);
  localStorage.clear();
  const filtered = storedItems.filter((pdf) => pdf.id !== item.id);
  setOnLocalStorage(key, filtered);
};
