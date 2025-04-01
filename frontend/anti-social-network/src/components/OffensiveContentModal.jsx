import React, { useState, useEffect } from 'react';

function OffensiveContentModal({ message, onClose }) {
  const [isShaking, setIsShaking] = useState(false);
  
  // Эффект для случайного потряхивания окна
  useEffect(() => {
    const shakeInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% шанс потрясти окно
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 2000);
    
    return () => clearInterval(shakeInterval);
  }, []);
  
  // Случайный выбор эмодзи для украшения
  const getRandomEmoji = () => {
    const emojis = ['⚠️', '🚫', '⛔', '😱', '🙄', '🤔', '😡', '🤦‍♂️', '👎', '🔥', '💢', '❌'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };
  
  // Разделяем сообщение на части для форматирования
  const messageParts = message.split('\n\n');
  const warningPart = messageParts[0];
  const contentPart = messageParts.slice(1).join('\n\n');
  
  return (
    <div className="offensive-content-alert" onClick={onClose}>
      <div 
        className={`offensive-content-box ${isShaking ? 'shake' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="emoji-decoration emoji-1">{getRandomEmoji()}</div>
        <div className="emoji-decoration emoji-2">{getRandomEmoji()}</div>
        <div className="emoji-decoration emoji-3">{getRandomEmoji()}</div>
        <div className="emoji-decoration emoji-4">{getRandomEmoji()}</div>
        
        <h2 className="offensive-title">{warningPart}</h2>
        <div className="offensive-message">
          {contentPart.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        
        <button 
          className="offensive-button"
          onClick={() => {
            // 20% шанс, что кнопка не сработает с первого раза
            if (Math.random() < 0.2) {
              alert('ОШИБКА ЗАКРЫТИЯ! ПОПРОБУЙТЕ ЕЩЕ РАЗ!');
            } else {
              onClose();
            }
          }}
        >
          Я ПРИЗНАЮ СВОЮ ВИНУ И ОБЕЩАЮ ИСПРАВИТЬСЯ
        </button>
      </div>
    </div>
  );
}

export default OffensiveContentModal;