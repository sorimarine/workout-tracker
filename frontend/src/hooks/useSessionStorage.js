import { useState } from "react";

const useSessionStorage = (key, initialValue) => {
  const [storedValue, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setSessionValue = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      setValue(newValue);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setSessionValue];
};

export default useSessionStorage;
