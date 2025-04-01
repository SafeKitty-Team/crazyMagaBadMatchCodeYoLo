import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
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
        <li><a href="#" className="nav-link bounce">ПРОФИЛЬ</a></li>
        <li><a href="#" className="nav-link rotate">ДРУЗЬЯ</a></li>
        <li><a href="#" className="nav-link skew">СООБЩЕНИЯ <span className="notification">99+</span></a></li>
        <li><a href="#" className="nav-link glitch">НАСТРОЙКИ</a></li>
      </ul>
      
      <div className="search-bar">
        <input type="text" placeholder="ПОИСК ЧЕГО-ТО..." className="search-input" />
        <button className="search-button">НАЙТИ!</button>
      </div>
      
      <div className="user-info">
        <span className="username rainbow-text">П0ЛЬЗ0ВАТЕЛЬ_123</span>
        <div className="avatar">
          <img src="https://via.placeholder.com/40" alt="Аватар" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar