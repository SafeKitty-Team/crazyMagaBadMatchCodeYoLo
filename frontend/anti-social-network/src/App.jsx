import { useState, useEffect, useContext } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Feed from './components/Feed'
import Auth from './components/Auth'
import SupportChat from './components/SupportChat'
import { AuthContext, AuthProvider } from './context/AuthContext'
import './App.css'

// Компонент-обертка для защищенного контента
function ProtectedContent() {
  const { isAuthenticated, showAuth, setShowAuth, login } = useContext(AuthContext);
  
  // Функция для закрытия окна авторизации
  const handleCloseAuth = () => {
    // 20% шанс того, что окно не закроется (для раздражения)
    if (Math.random() < 0.2) {
      alert('ОШИБКА ЗАКРЫТИЯ ОКНА! ПОЖАЛУЙСТА, ПОПРОБУЙТЕ ЕЩЕ РАЗ!');
    } else {
      setShowAuth(false);
    }
  };
  
  return (
    <>
      <Navbar />
      <marquee scrollamount="6" className="announcement">
        ДОБРО ПОЖАЛОВАТЬ В САМУЮ ХУДШУЮ СОЦИАЛЬНУЮ СЕТЬ В МИРЕ!!! НАЖМИТЕ СЮДА, ЧТОБЫ ВЫИГРАТЬ ПРИЗ!!!
      </marquee>
      <main>
        <h1 className="main-title rainbow-text">Анти Соц Сеть</h1>
        <h2 className="main-subtitle">Здесь вам точно НЕ понравится</h2>
        
        {/* Всплывающее окно подписки (не зависит от авторизации) */}
        <div className="popup" id="annoying-popup">
          <h3>ПОДПИШИСЬ НА РАССЫЛКУ</h3>
          <button className="close-btn" onClick={() => document.getElementById('annoying-popup').style.display = 'none'}>X</button>
          <input type="email" placeholder="ВВЕДИ ПОЧТУ ТУТ" />
          <button className="submit-btn">ПОДПИСАТЬСЯ!</button>
        </div>
        
        {isAuthenticated ? (
          // Показываем ленту только авторизованным пользователям
          <Feed />
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