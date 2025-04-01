import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section footer-logo">
          <h2 className="footer-title blink">АнТи-СОЦ СЕТЬ</h2>
          <p className="footer-slogan">Мы делаем интернет хуже с 2025 года!</p>
        </div>
        
        <div className="footer-section footer-links">
          <h3 className="footer-heading tilted">БЕСПОЛЕЗНЫЕ ССЫЛКИ</h3>
          <ul>
            <li><a href="#" className="footer-link">О НАС (НЕ НАЖИМАТЬ)</a></li>
            <li><a href="#" className="footer-link">НЕНУЖНАЯ ПОМОЩЬ</a></li>
            <li><a href="#" className="footer-link">НАРУШЕНИЕ КОНФИДЕНЦИАЛЬНОСТИ</a></li>
            <li><a href="#" className="footer-link">ПРАВИЛА КОТОРЫХ НЕТ</a></li>
          </ul>
        </div>
        
        <div className="footer-section footer-contact">
          <h3 className="footer-heading upside-down">НИКОМУ НЕ ПИШИТЕ</h3>
          <p className="contact-info">Email: nobody@antisocial.net</p>
          <p className="contact-info">Телефон: НЕ ЗВОНИТЕ</p>
          <p className="contact-info">Адрес: Антарктида, холодно и далеко</p>
        </div>
        
        <div className="footer-section footer-subscribe">
          <h3 className="footer-heading sideways">НЕНУЖНАЯ РАССЫЛКА</h3>
          <div className="subscribe-form">
            <input type="email" placeholder="ВВЕДИТЕ ПОЧТУ И ПОЖАЛЕЕТЕ" className="subscribe-input" />
            <button className="subscribe-button blink">СПАМ!</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#" className="social-icon rotate">📵</a>
          <a href="#" className="social-icon bounce">🙅</a>
          <a href="#" className="social-icon shake">🚫</a>
          <a href="#" className="social-icon skew">⛔</a>
        </div>
        
        <p className="copyright marquee">
          &copy; 2025 АнТи-СОЦ Сеть. Все права защищены... или нет. Нам всё равно!
        </p>
        
        <div className="footer-disclaimer">
          <button className="cookie-button">ПРИНЯТЬ ВСЕ КУКИ (И ВАШИ ДАННЫЕ)</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer