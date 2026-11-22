import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // Хранилище недоступно или сохранённое значение повреждено.
    }

    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Состояние остаётся доступным в текущей сессии.
    }
  }, [key, value]);

  return [value, setValue];
}
