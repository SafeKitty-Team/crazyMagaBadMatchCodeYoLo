import { createContext, useState, useEffect } from 'react';

// Создаем контекст авторизации
export const AuthContext = createContext();

// Поставщик контекста
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  
  // Проверяем авторизацию при загрузке
  useEffect(() => {
    // Имитация проверки авторизации
    const storedUser = localStorage.getItem('antisoc_user');
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        
        // Случайные разлогины (для раздражения пользователя)
        const randomLogoutInterval = setInterval(() => {
          // 5% шанс случайного разлогина
          if (Math.random() < 0.05) {
            // Не будем на самом деле разлогинивать, только покажем уведомление
            alert('ВНИМАНИЕ! ВАША СЕССИЯ СКОРО ИСТЕЧЕТ ПО ПРИЧИНЕ АКТИВНОГО ДЕЙСТВИЯ!');
          }
        }, 60000); // Каждую минуту
        
        return () => clearInterval(randomLogoutInterval);
      } catch (e) {
        localStorage.removeItem('antisoc_user');
      }
    }
  }, []);
  
  // Функция входа
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuth(false);
  };
  
  // Функция выхода
  const logout = () => {
    // Раздражающее подтверждение
    if (window.confirm('ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ ВЫЙТИ? МЫ БУДЕМ СКУЧАТЬ ПО ВАМ! (нет)')) {
      localStorage.removeItem('antisoc_user');
      setUser(null);
      setIsAuthenticated(false);
      
      // Раздражающее уведомление после выхода
      setTimeout(() => {
        alert('ВЫ ВЫШЛИ ИЗ СИСТЕМЫ! НО МЫ ВСЕ РАВНО СЛЕДИМ ЗА ВАМИ!');
      }, 500);
    }
  };
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      showAuth,
      setShowAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;