import { useState, useEffect, useContext } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Feed from './components/Feed'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Messages from './components/Messages'
import SupportChat from './components/SupportChat'
import { AuthContext, AuthProvider } from './context/AuthContext'
import './App.css'

// Компонент-обертка для защищенного контента
function ProtectedContent() {
  const { isAuthenticated, showAuth, setShowAuth, login } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('feed'); // 'feed', 'profile' или 'messages'
  
  // Функция для закрытия окна авторизации
  const handleCloseAuth = () => {
    // 20% шанс того, что окно не закроется (для раздражения)
    if (Math.random() < 0.2) {
      alert('ОШИБКА ЗАКРЫТИЯ ОКНА! ПОЖАЛУЙСТА, ПОПРОБУЙТЕ ЕЩЕ РАЗ!');
    } else {
      setShowAuth(false);
    }
  };
  
  // Эффект для случайной смены страницы (для раздражения)
  useEffect(() => {
    const randomPageInterval = setInterval(() => {
      // 5% шанс случайной смены страницы
      if (Math.random() < 0.05 && isAuthenticated) {
        // Выбираем случайную страницу
        const pages = ['feed', 'profile', 'messages'];
        // Убираем текущую страницу из списка
        const availablePages = pages.filter(page => page !== currentPage);
        // Выбираем случайную страницу из доступных
        const newPage = availablePages[Math.floor(Math.random() * availablePages.length)];
        setCurrentPage(newPage);
        
        // Раздражающее уведомление
        let pageName = '';
        if (newPage === 'feed') pageName = 'ГЛАВНУЮ';
        else if (newPage === 'profile') pageName = 'ПРОФИЛЬ';
        else if (newPage === 'messages') pageName = 'СООБЩЕНИЯ';
        alert(`СТРАНИЦА ВНЕЗАПНО ИЗМЕНИЛАСЬ! ДОБРО ПОЖАЛОВАТЬ НА ${pageName}!`);
      }
    }, 60000); // Проверять каждую минуту
    
    return () => clearInterval(randomPageInterval);
  }, [currentPage, isAuthenticated]);
  
  return (
    <>
      <Navbar onNavigate={(page) => setCurrentPage(page)} />
      <marquee scrollamount="6" className="announcement">
        ДОБРО ПОЖАЛОВАТЬ В САМУЮ ХУДШУЮ СОЦИАЛЬНУЮ СЕТЬ В МИРЕ!!! НАЖМИТЕ СЮДА, ЧТОБЫ ВЫИГРАТЬ ПРИЗ!!!
      </marquee>
      <main>
        {currentPage === 'feed' && (
          <>
            <h1 className="main-title rainbow-text">Анти Соц Сеть</h1>
            <h2 className="main-subtitle">Здесь вам точно НЕ понравится</h2>
          </>
        )}
        
        {/* Всплывающее окно подписки (не зависит от авторизации) */}
        <div className="popup" id="annoying-popup">
          <h3>ПОДПИШИСЬ НА РАССЫЛКУ</h3>
          <button className="close-btn" onClick={() => document.getElementById('annoying-popup').style.display = 'none'}>X</button>
          <input type="email" placeholder="ВВЕДИ ПОЧТУ ТУТ" />
          <button className="submit-btn">ПОДПИСАТЬСЯ!</button>
        </div>
        
        {isAuthenticated ? (
          // Показываем соответствующую страницу авторизованным пользователям
          <>
            {currentPage === 'feed' && <Feed />}
            {currentPage === 'profile' && <Profile />}
            {currentPage === 'messages' && <Messages />}
          </>
        ) : (
          // Для неавторизованных пользователей показываем сообщение
          <div className="unauthorized-message">
            <h2 className="blink">ВЫ НЕ АВТОРИЗОВАНЫ!</h2>
            <p className="glitch">Чтобы увидеть "лучший" контент нашей социальной сети, необходимо войти в систему или зарегистрироваться!</p>
            <button className="auth-button wobble" onClick={() => setShowAuth(true)}>
              АВТОРИЗОВАТЬСЯ СЕЙЧАС!
            </button>
            <p className="warning-text tilted">
              ВНИМАНИЕ: При регистрации вы соглашаетесь с нашими <span className="rainbow-text">несуществующими правилами</span> и <span className="blink">отсутствующей политикой конфиденциальности</span>.
            </p>
            
            {/* Кнопка временной авторизации для тестирования */}
            <button 
              className="test-auth-button shake" 
              onClick={() => {
                localStorage.setItem('antisoc_user', JSON.stringify({ login: 'ТестовыйПользователь', email: 'test@antisoc.net' }));
                login({ login: 'ТестовыйПользователь', email: 'test@antisoc.net' });
                alert('ВЫ АВТОРИЗОВАНЫ КАК ТЕСТОВЫЙ ПОЛЬЗОВАТЕЛЬ! ЭТО ВРЕМЕННАЯ ФУНКЦИЯ!');
              }}
            >
              ТЕСТОВАЯ АВТОРИЗАЦИЯ (ВРЕМЕННО)
            </button>
          </div>
        )}
      </main>
      <Footer />
      
      {/* Показываем окно авторизации при необходимости */}
      {showAuth && <Auth onLogin={login} onClose={handleCloseAuth} />}
      
      {/* Добавляем компонент чата поддержки */}
      <SupportChat />
    </>
  );
}

// Главный компонент приложения
function App() {
  const [isLoading, setIsLoading] = useState(true)
  
  // Задержка загрузки страницы уменьшена
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  // Раздражающий курсор (модифицирован для лучшей производительности)
  useEffect(() => {
    // Вместо курсора wait используем малозаметный custom cursor
    document.body.style.cursor = 'default'
  }, [])

  return (
    <AuthProvider>
      <div className="app-container">
        {isLoading ? (
          <div className="loading">
            <h1 className="blink">ЗАГРУЗКА...</h1>
            <div className="spinner"></div>
          </div>
        ) : (
          <ProtectedContent />
        )}
      </div>
    </AuthProvider>
  )
}

export default App