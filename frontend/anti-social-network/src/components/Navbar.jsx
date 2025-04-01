import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Navbar.css'

function Navbar({ onNavigate }) {
  const { isAuthenticated, user, logout, setShowAuth } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Функция для обработки клика по ссылкам, требующим авторизации
  const handleAuthRequiredClick = (e, page = null) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ ДЛЯ ДОСТУПА К ЭТОЙ ФУНКЦИИ!');
      setShowAuth(true);
      return false;
    }
    
    if (page) {
      e.preventDefault();
      onNavigate && onNavigate(page);
      return true;
    }
    
    return true;
  };
  
  // Функция для перехода на профиль
  const handleProfileClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ ПРОСМАТРИВАТЬ ПРОФИЛЬ!');
      setShowAuth(true);
    } else {
      // 20% шанс показать ошибку перехода
      if (Math.random() < 0.2) {
        alert('ОШИБКА ПЕРЕХОДА! СЕРВЕР ПЕРЕГРУЖЕН ВАШЕЙ БЕСПОМОЩНОСТЬЮ!');
      } else {
        onNavigate && onNavigate('profile');
        // Раздражающее сообщение
        setTimeout(() => {
          alert('ВЫ ПЕРЕШЛИ В СВОЙ ПРОФИЛЬ! ОН УЖАСЕН!');
        }, 500);
      }
    }
  };
  
  // Функция для перехода на главную
  const handleHomeClick = (e) => {
    e.preventDefault();
    // 10% шанс показать ошибку перехода
    if (Math.random() < 0.1) {
      alert('ГЛАВНАЯ СТРАНИЦА ВРЕМЕННО НЕДОСТУПНА! ПОПРОБУЙТЕ ЧЕРЕЗ 5 МИНУТ!');
    } else {
      onNavigate && onNavigate('feed');
      
      // Раздражающее сообщение с 30% шансом
      if (Math.random() < 0.3) {
        setTimeout(() => {
          alert('ВЫ ВЕРНУЛИСЬ НА ГЛАВНУЮ! КАК СКУЧНО И ПРЕДСКАЗУЕМО!');
        }, 500);
      }
    }
  };
  
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-text blink">АнТи-СОЦ</span>
        <img src="https://via.placeholder.com/30" alt="Логотип" className="spinning-logo" />
      </div>
      
      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><a href="#" className="nav-link shake" onClick={handleHomeClick}>ГЛАВНАЯ</a></li>
        <li>
          <a 
            href="#" 
            className="nav-link bounce" 
            onClick={handleProfileClick}
          >
            ПРОФИЛЬ
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="nav-link skew" 
            onClick={(e) => {
              // Проверяем авторизацию и переходим на страницу сообщений
              if (handleAuthRequiredClick(e, 'messages')) {
                // 20% шанс показать ошибку перехода
                if (Math.random() < 0.2) {
                  alert('ОШИБКА ПЕРЕХОДА! СЕРВЕР СООБЩЕНИЙ ПЕРЕГРУЖЕН!');
                } else {
                  // Раздражающее сообщение с 30% шансом
                  if (Math.random() < 0.3) {
                    setTimeout(() => {
                      alert('ВЫ ПЕРЕШЛИ В СООБЩЕНИЯ! ВАМ ВСЕ РАВНО НИКТО НЕ ПИШЕТ!');
                    }, 500);
                  }
                }
              }
            }}
          >
            СООБЩЕНИЯ <span className="notification">99+</span>
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="nav-link glitch" 
            onClick={handleAuthRequiredClick}
          >
            НАСТРОЙКИ
          </a>
        </li>
      </ul>
      
      <div className="user-info">
        {isAuthenticated ? (
          <>
            <span className="username rainbow-text">{user.login}</span>
            <div className="avatar">
              <img src="https://via.placeholder.com/40" alt="Аватар" />
            </div>
            <button 
              className="logout-button" 
              onClick={logout}
              title="Выйти из системы"
            >
              ВЫХОД
            </button>
          </>
        ) : (
          <button 
            className="login-button blink" 
            onClick={() => setShowAuth(true)}
          >
            ВОЙТИ
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar