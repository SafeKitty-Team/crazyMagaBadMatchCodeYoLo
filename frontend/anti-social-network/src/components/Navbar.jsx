import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, user, logout, setShowAuth } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Функция для обработки клика по ссылкам, требующим авторизации
  const handleAuthRequiredClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ ДЛЯ ДОСТУПА К ЭТОЙ ФУНКЦИИ!');
      setShowAuth(true);
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
        <li><a href="#" className="nav-link shake">ГЛАВНАЯ</a></li>
        <li>
          <a 
            href="#" 
            className="nav-link bounce" 
            onClick={handleAuthRequiredClick}
          >
            ПРОФИЛЬ
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="nav-link rotate" 
            onClick={handleAuthRequiredClick}
          >
            ДРУЗЬЯ
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="nav-link skew" 
            onClick={handleAuthRequiredClick}
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
      
      <div className="search-bar">
        <input type="text" placeholder="ПОИСК ЧЕГО-ТО..." className="search-input" />
        <button className="search-button" onClick={() => {
          if (!isAuthenticated) {
            alert('НЕЛЬЗЯ ИСКАТЬ БЕЗ АВТОРИЗАЦИИ! МЫ ДОЛЖНЫ ЗНАТЬ, КТО ВЫ!');
            setShowAuth(true);
          } else {
            alert('ПОИСК СЛОМАН! ПОПРОБУЙТЕ ПОЗЖЕ... ИЛИ НИКОГДА!');
          }
        }}>НАЙТИ!</button>
      </div>
      
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