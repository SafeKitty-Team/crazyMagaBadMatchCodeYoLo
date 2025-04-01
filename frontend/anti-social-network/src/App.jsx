import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Feed from './components/Feed'
import './App.css'

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
    <div className="app-container">
      {isLoading ? (
        <div className="loading">
          <h1 className="blink">ЗАГРУЗКА...</h1>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <marquee scrollamount="6" className="announcement">
            ДОБРО ПОЖАЛОВАТЬ В САМУЮ ХУДШУЮ СОЦИАЛЬНУЮ СЕТЬ В МИРЕ!!! НАЖМИТЕ СЮДА, ЧТОБЫ ВЫИГРАТЬ ПРИЗ!!!
          </marquee>
          <main>
            <h1 className="main-title rainbow-text">Анти Соц Сеть</h1>
            <h2 className="main-subtitle">Здесь вам точно НЕ понравится</h2>
            <div className="popup" id="annoying-popup">
              <h3>ПОДПИШИСЬ НА РАССЫЛКУ</h3>
              <button className="close-btn" onClick={() => document.getElementById('annoying-popup').style.display = 'none'}>X</button>
              <input type="email" placeholder="ВВЕДИ ПОЧТУ ТУТ" />
              <button className="submit-btn">ПОДПИСАТЬСЯ!</button>
            </div>
            <Feed />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App