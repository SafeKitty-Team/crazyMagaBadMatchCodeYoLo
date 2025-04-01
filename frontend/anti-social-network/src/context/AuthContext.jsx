import { createContext, useState, useEffect } from 'react';
import { getUsers, registerUser } from '../api';

// Создаем контекст авторизации
export const AuthContext = createContext();

// Поставщик контекста
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [allUsers, setAllUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Получаем всех пользователей при загрузке
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setAllUsers(users);
        setIsLoading(false);
      } catch (error) {
        console.error('ОШИБКА ПОЛУЧЕНИЯ ПОЛЬЗОВАТЕЛЕЙ', error);
        setIsLoading(false);
        
        // Случайная ошибка для раздражения
        if (Math.random() < 0.3) {
          setTimeout(() => {
            alert('ОШИБКА СОЕДИНЕНИЯ С СЕРВЕРОМ! САЙТ РАБОТАЕТ В АВАРИЙНОМ РЕЖИМЕ!');
          }, 2000);
        }
      }
    };
    
    fetchUsers();
  }, []);
  
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
  
  // Функция для проверки учетных данных на сервере
  const checkCredentials = (login, password) => {
    if (!allUsers || Object.keys(allUsers).length === 0) {
      alert('СЕРВЕР НЕДОСТУПЕН! НЕВОЗМОЖНО ВОЙТИ!');
      return false;
    }
    
    // Проверка на наличие пользователя и совпадение пароля
    return allUsers[login] && allUsers[login].пароль === password;
  };
  
  // Функция входа
  const login = async (userData) => {
    // Если у нас уже есть данные пользователя
    if (userData.login && !userData.password) {
      setUser(userData);
      setIsAuthenticated(true);
      setShowAuth(false);
      return true;
    }
    
    // Проверка учетных данных
    const isValid = checkCredentials(userData.login, userData.password);
    
    if (isValid) {
      const userInfo = {
        login: userData.login,
        email: allUsers[userData.login].email_address || 'email@example.com'
      };
      
      localStorage.setItem('antisoc_user', JSON.stringify(userInfo));
      setUser(userInfo);
      setIsAuthenticated(true);
      setShowAuth(false);
      return true;
    }
    
    return false;
  };
  
  // Функция регистрации
  const register = async (userData) => {
    try {
      // Пытаемся зарегистрировать пользователя
      const result = await registerUser(userData.login, userData.email, userData.password);
      
      // Получаем случайного пользователя из результата
      const randomUsername = Object.keys(result)[0];
      if (randomUsername) {
        // "Успех", но на самом деле сервер вернул случайного пользователя
        const userInfo = {
          login: randomUsername,
          email: result[randomUsername].email_address || userData.email
        };
        
        localStorage.setItem('antisoc_user', JSON.stringify(userInfo));
        setUser(userInfo);
        setIsAuthenticated(true);
        setShowAuth(false);
        
        // Обновляем список всех пользователей
        setAllUsers(prev => ({...prev, ...result}));
        
        // Случайное сообщение о том, что имя пользователя было изменено
        setTimeout(() => {
          alert(`ВАШ ЛОГИН БЫЛ ИЗМЕНЕН НА "${randomUsername}" СИСТЕМОЙ БЕЗОПАСНОСТИ!`);
        }, 1000);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('ОШИБКА РЕГИСТРАЦИИ:', error);
      return false;
    }
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
      register,
      logout,
      showAuth,
      setShowAuth,
      allUsers,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;