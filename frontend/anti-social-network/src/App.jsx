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
  const { isAuthenticated, showAuth, setShowAuth, login, isLoading } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('feed');
  
  // Функция для навигации по страницам
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };
  
  // Функция для закрытия окна авторизации
  const handleCloseAuth = () => {
    // 15% шанс того, что окно не закроется (для раздражения)
    if (Math.random() < 0.15) {
      alert('ОШИБКА ЗАКРЫТИЯ ОКНА! ПОЖАЛУЙСТА, ПОПРОБУЙТЕ ЕЩЕ РАЗ!');
    } else {
      setShowAuth(false);
    }
  };
  
  // Рендер соответствующего компонента страницы
  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile />;
      case 'messages':
        return <Messages />;
      case 'feed':
      default:
        return <Feed />;
    }
  };
  
  if (isLoading) {
    return (
      <>
        <Navbar onNavigate={handleNavigate} />
        <div className="loading-container" style={{ 
          textAlign: 'center', 
          padding: '50px', 
          margin: '20px', 
          backgroundColor: 'rgba(255, 0, 255, 0.3)',
          border: '8px ridge #00ffff'
        }}>
          <h2 className="blink" style={{ color: '#ffff00', textShadow: '2px 2px 0 #000000' }}>
            ЗАГРУЗКА АНТИСОЦИАЛЬНОГО КОНТЕНТА...
          </h2>
          <div className="spinner" style={{ 
            display: 'inline-block',
            width: '50px', 
            height: '50px', 
            margin: '20px',
            border: '8px solid #ff00ff', 
            borderTop: '8px solid #00ffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite' 
          }}></div>
          <p className="wobble" style={{ color: '#00ffff' }}>
            Пожалуйста, подождите, пока мы загружаем худший контент в интернете...
          </p>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar onNavigate={handleNavigate} />
      <marquee scrollamount="5" className="announcement">
        ДОБРО ПОЖАЛОВАТЬ В САМУЮ ХУДШУЮ СОЦИАЛЬНУЮ СЕТЬ В МИРЕ!!! НАЖМИТЕ СЮДА, ЧТОБЫ ВЫИГРАТЬ ПРИЗ!!!
      </marquee>
      <main>
        <h1 className="main-title rainbow-text">Анти Соц Сеть</h1>
        
        {/* Всплывающее окно подписки (не зависит от авторизации) */}
        <div className="popup" id="annoying-popup">
          <h3>ПОДПИШИСЬ НА РАССЫЛКУ</h3>
          <button className="close-btn" onClick={() => {
            if (Math.random() < 0.3) {
              alert('ОШИБКА ЗАКРЫТИЯ ОКНА! ПОПРОБУЙТЕ ЕЩЕ РАЗ!');
            } else {
              document.getElementById('annoying-popup').style.display = 'none';
            }
          }}>X</button>
          <input type="email" placeholder="ВВЕДИ ПОЧТУ ТУТ" />
          <button className="submit-btn" onClick={() => alert('СПАСИБО ЗА ПОДПИСКУ! ТЕПЕРЬ МЫ БУДЕМ СЛАТЬ ВАМ СПАМ ВЕЧНО!')}>ПОДПИСАТЬСЯ!</button>
        </div>
        
        {isAuthenticated ? (
          // Показываем текущую страницу авторизованным пользователям
          renderPage()
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
          </div>
        )}
      </main>
      <Footer />
      
      <SupportChat />
      
      {/* Показываем окно авторизации при необходимости */}
      {showAuth && <Auth onLogin={login} onClose={handleCloseAuth} />}
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

export default App;