import { useState, useEffect, useRef, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { sendMessage } from '../api'
import './SupportChat.css'

function SupportChat() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const messagesEndRef = useRef(null);
  const chatButtonRef = useRef(null);
  
  // Используем useRef для отслеживания монтирования компонента
  const isMounted = useRef(true);
  
  // Очистка рефа при размонтировании
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Закрытие чата с шансом неудачи
  const handleClose = () => {
    if (Math.random() < 0.3) {
      alert('ОШИБКА ЗАКРЫТИЯ ЧАТА! ПОПРОБУЙТЕ СНОВА!');
    } else {
      setIsOpen(false);
    }
  };
  
  // Отправка сообщения
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Добавление сообщения пользователя
    const userMessage = { text: inputValue, fromUser: true, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Если пользователь авторизован, пытаемся отправить сообщение на сервер
    if (isAuthenticated && user) {
      try {
        // Отправляем сообщение в службу поддержки (на сервер)
        await sendMessage(user.login, 'support', inputValue);
      } catch (error) {
        console.error('ОШИБКА ОТПРАВКИ СООБЩЕНИЯ ПОДДЕРЖКИ:', error);
      }
    }
    
    // Начало "печатания" через 2 секунды
    setTimeout(() => {
      if (isMounted.current) {
        setIsTyping(true);
        
        // Через 3-5 секунд показываем ответ оператора
        setTimeout(() => {
          if (isMounted.current) {
            setIsTyping(false);
            
            // Генерация случайного ответа оператора
            const supportResponses = [
              "Извините, но наши операторы в данный момент заняты игнорированием других пользователей.",
              "Ваше сообщение было отправлено в черную дыру. Спасибо за обращение!",
              "Ха-ха! Вы действительно подумали, что вам кто-то ответит?",
              "Ваше сообщение было помечено как 'Неважное'. Больше не пишите нам.",
              "Поддержка временно не работает. Если честно, она никогда не работала.",
              "Спасибо за сообщение! Оно будет удалено через 3... 2... 1...",
              "Ваше обращение находится в очереди #999999. Примерное время ответа: никогда.",
              "Мы ценим ваше мнение! Но не настолько, чтобы отвечать на него.",
              "Сервер поддержки упал и не может подняться. Как и ваша самооценка.",
              "Ваш запрос был отклонен из-за наличия слишком большого количества смысла."
            ];
            
            // Выбираем случайный ответ
            const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
            
            setMessages(prev => [...prev, { text: randomResponse, fromUser: false, time: new Date().toLocaleTimeString() }]);
          }
        }, Math.random() * 2000 + 3000);
      }
    }, 2000);
  };
  
  // Скролл к последнему сообщению
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);
  
  // Обработчик прокрутки страницы для привлечения внимания к кнопке
  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen) {
        setIsScrolled(true);
        
        if (chatButtonRef.current) {
          // Сначала удаляем класс для перезапуска анимации
          chatButtonRef.current.classList.remove('support-chat-button-scrolled');
          
          // Триггерим перерисовку DOM
          void chatButtonRef.current.offsetWidth;
          
          // Добавляем класс обратно для запуска анимации
          chatButtonRef.current.classList.add('support-chat-button-scrolled');
          
          // 10% шанс показать всплывающее сообщение при прокрутке
          if (Math.random() < 0.1) {
            const messages = [
              "ВАМ НУЖНА ПОМОЩЬ?",
              "ЧТО-ТО ИЩЕТЕ?",
              "МЫ ВИДИМ, ЧТО ВЫ ПРОКРУЧИВАЕТЕ СТРАНИЦУ!",
              "НАПИШИТЕ НАМ, МЫ ВАМ НЕ ОТВЕТИМ!",
              "ПОДДЕРЖКА ЖДЕТ ВАШИХ СООБЩЕНИЙ!"
            ];
            setTimeout(() => {
              alert(messages[Math.floor(Math.random() * messages.length)]);
            }, 500);
          }
        }
        
        // Сбрасываем через некоторое время
        setTimeout(() => {
          if (isMounted.current) {
            setIsScrolled(false);
          }
        }, 2000);
      }
    };

    // Добавление throttle для улучшения производительности
    let timeout;
    const throttledScroll = () => {
      if (!timeout) {
        timeout = setTimeout(() => {
          handleScroll();
          timeout = null;
        }, 300);
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isOpen]);

  // Генерация случайных звуков чата
  useEffect(() => {
    if (isOpen) {
      const soundInterval = setInterval(() => {
        if (Math.random() < 0.2 && isMounted.current) {
          // Имитируем звуковой эффект через вызов alert с небольшим шансом
          if (Math.random() < 0.1) {
            alert('ЗВУКОВОЕ УВЕДОМЛЕНИЕ: БИП-БИП!');
          }
        }
      }, 10000);
      
      return () => clearInterval(soundInterval);
    }
  }, [isOpen]);
  
  return (
    <>
      {/* Кнопка чата */}
      {!isOpen && (
        <button 
          ref={chatButtonRef}
          className={`support-chat-button blink ${isScrolled ? 'support-chat-button-scrolled' : ''}`}
          onClick={() => setIsOpen(true)}
        >
          ПОМОЩЬ КОТОРАЯ НЕ ПОМОЖЕТ!
        </button>
      )}
      
      {/* Окно чата */}
      {isOpen && (
        <div className="support-chat-container">
          <div className="support-chat-header">
            <h3 className="support-chat-title rainbow-text">ЧАТ ПОДДЕРЖКИ НЕЛЮДЕЙ</h3>
            <button 
              className="support-chat-close shake" 
              onClick={handleClose}
            >
              X
            </button>
          </div>
          
          <div className="support-chat-body">
            {/* Приветственное сообщение */}
            <div className="system-message">
              <p>ДОБРО ПОЖАЛОВАТЬ В ЧАТ ПОДДЕРЖКИ, ГДЕ ВАМ НИКТО НЕ ПОМОЖЕТ!</p>
              <p>НАПИШИТЕ ВАШЕ СООБЩЕНИЕ В ПУСТОТУ НИЖЕ.</p>
              <p className="small">Время ожидания ответа: ∞</p>
            </div>
            
            {/* Сообщения */}
            <div className="support-chat-messages">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.fromUser ? 'user-message' : 'agent-message'}`}
                >
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                  
                  {/* Индикаторы статуса для сообщений пользователя */}
                  {msg.fromUser && (
                    <div className="message-status">
                      {Math.random() < 0.5 ? '✓' : '✓✓'}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Индикатор "печатания" */}
              {isTyping && (
                <div className="typing-indicator">
                  <p>Агент поддержки печатает<span className="dot-one">.</span><span className="dot-two">.</span><span className="dot-three">.</span></p>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Ввод сообщения */}
          <div className="support-chat-footer">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="НАПИШИТЕ СООБЩЕНИЕ В НИКУДА..."
              className="support-chat-input wobble"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="support-chat-submit rotate"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              ОТПРАВИТЬ В ПУСТОТУ
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SupportChat;