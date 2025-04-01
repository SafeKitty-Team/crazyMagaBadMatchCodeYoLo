import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Ужасный пользовательский курсор через JavaScript, но менее раздражающий
document.addEventListener('mousemove', (e) => {
  // Ограничиваем количество элементов курсора для улучшения производительности
  if (document.querySelectorAll('.custom-cursor').length > 5) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
  cursor.style.position = 'absolute';
  cursor.style.width = '15px';
  cursor.style.height = '15px';
  cursor.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  cursor.style.borderRadius = '50%';
  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = '9999';
  cursor.style.opacity = '0.5';
  
  document.body.appendChild(cursor);
  
  setTimeout(() => {
    cursor.remove();
  }, 300);
});

// Раздражающие оповещения, но реже
const annoyingPopups = () => {
  const messages = [
    'Добро пожаловать в худшую соцсеть!',
    'Вы точно хотите продолжить?',
    'Внимание! Ваша учетная запись будет удалена через 10 минут!',
    'Ваш компьютер заражен 153 вирусами! Нажмите ОК, чтобы узнать подробности!',
    'Поздравляем! Вы выиграли ничего!',
    'НЕ ЗАКРЫВАЙТЕ ЭТО ОКНО!!!'
  ];
  
  if (Math.random() < 0.05) {
    setTimeout(() => {
      alert(messages[Math.floor(Math.random() * messages.length)]);
      annoyingPopups();
    }, Math.random() * 120000 + 30000);
  }
};

// Задержка загрузки страницы (уменьшена до 2 секунд)
setTimeout(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  
  // Запуск раздражающих оповещений
  annoyingPopups();
}, 2000);

// Показ экрана загрузки
const loadingDiv = document.createElement('div');
loadingDiv.className = 'loading';
loadingDiv.innerHTML = `
  <h1 class="blink">ЗАГРУЗКА...</h1>
  <div class="spinner"></div>
`;
document.body.appendChild(loadingDiv);

// Удаление экрана загрузки после рендера приложения
setTimeout(() => {
  loadingDiv.remove();
}, 2000);