import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Messages.css'

// Функция для создания искаженного текста (имитация плохого перевода)
const mangleText = (text) => {
  // Массивы искажающих модификаторов
  const prefixes = [
    'Точно говоря, ', 'Как говорят в моей деревне, ', 'Стоит заметить, что ', 
    'По версии многих переводов, ', 'Автоматический перевод считает, что ', 
    'Искусственный интеллект подсказывает, что ', 'Абсолютно точно, ',
    'Без сомнения могу сказать, что ', 'Неведомым образом, ', 'Вопреки здравому смыслу, '
  ];
  
  const suffixes = [
    ' (но это не точно)', ' (машинный перевод)', ' (прошу понять и простить)', 
    ' (возможно ошибка)', ' (нет 100% уверенности)', ' (вероятное толкование)', 
    ' (есть сомнения в переводе)', ' (понимайте как хотите)', ' (такова жизнь)', 
    ' (я предупреждал)'
  ];
  
  const wordReplacements = {
    'привет': ['здравстравуй', 'приветствование', 'здравия желаю', 'салам алейкум', 'приветик'],
    'как': ['каковым образом', 'каким путем', 'до какой степени', 'по какому алгоритму', 'насколько'],
    'дела': ['дело идет', 'бизнес развивается', 'функционирование', 'производственный процесс', 'активность'],
    'ты': ['твоя персона', 'указанный субъект', 'вашество', 'данный индивидуум', 'ты лично'],
    'я': ['моя персона', 'данный говорящий', 'мое величество', 'этот человек', 'собственная личность'],
    'сегодня': ['текущий световой день', 'в этот день календаря', 'сей день', 'нынче', 'день текущий'],
    'завтра': ['следующее утро', 'предстоящий день', 'грядущая дата', 'день после сна', 'в будущем скоро'],
    'вчера': ['прошедший день', 'предыдущие сутки', 'день до этого', 'перед сегодня', 'в недавнем прошлом'],
    'хорошо': ['удовлетворительно', 'приемлемо', 'позитивно', 'не вызывает нареканий', 'благоприятно'],
    'плохо': ['неудовлетворительно', 'отрицательным образом', 'негативно', 'оставляет желать лучшего', 'неблагоприятно'],
    'время': ['временной промежуток', 'период существования', 'темпоральность', 'отрезок в континууме', 'момент'],
    'человек': ['гомо сапиенс', 'субъект человечества', 'индивид', 'представитель людей', 'биологическая единица'],
    'спасибо': ['благодарность выражаю', 'признателен премного', 'мерси большое', 'весьма обязан', 'грациас']
  };
  
  // Функция случайного выбора элемента из массива
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Добавляем случайный префикс с вероятностью 60%
  let result = Math.random() < 0.6 ? randomChoice(prefixes) : '';
  
  // Разбиваем текст на слова и искажаем некоторые из них
  const words = text.split(' ');
  const mangledWords = words.map(word => {
    // Проверяем, есть ли слово в нашем словаре замен (игнорируя регистр)
    const lowerWord = word.toLowerCase();
    for (const [original, replacements] of Object.entries(wordReplacements)) {
      if (lowerWord.includes(original)) {
        // 70% шанс заменить слово
        if (Math.random() < 0.7) {
          return randomChoice(replacements);
        }
      }
    }
    
    // Шанс случайно НАПИСАТЬ КАПСОМ
    if (Math.random() < 0.15) {
      return word.toUpperCase();
    }
    
    // Шанс добавить ненужные кавычки
    if (Math.random() < 0.1) {
      return `"${word}"`;
    }
    
    // 80% слов оставляем без изменений
    return word;
  });
  
  result += mangledWords.join(' ');
  
  // Добавляем случайный суффикс с вероятностью 50%
  if (Math.random() < 0.5) {
    result += randomChoice(suffixes);
  }
  
  // Шанс добавить случайные смайлики
  if (Math.random() < 0.3) {
    const emojis = ['😂', '😱', '🤔', '🙄', '😡', '🤮', '💩', '🤷‍♂️', '🤦‍♀️', '🧐'];
    const emojiCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < emojiCount; i++) {
      result += ' ' + randomChoice(emojis);
    }
  }
  
  return result;
};

// Генератор случайных фраз для сообщений
const generateRandomMessage = () => {
  const messages = [
    "Привет, как дела?",
    "Что делаешь сегодня вечером?",
    "Давно не виделись!",
    "Можешь перезвонить мне, когда освободишься?",
    "Спасибо за помощь вчера, очень выручил.",
    "Я не понимаю, почему ты не отвечаешь.",
    "Встретимся завтра в том же месте?",
    "Посмотрел фильм, который ты советовал. Полный отстой!",
    "Ты видел последние новости? Это что-то невероятное!",
    "Мне нужно с тобой срочно поговорить.",
    "Я думаю, нам стоит прекратить общение.",
    "Ты задолжал мне деньги, когда вернешь?",
    "С днем рождения! Желаю всего наилучшего!",
    "Я потерял твой адрес, напомни пожалуйста.",
    "Не хочу тебя больше видеть, оставь меня в покое.",
    "Я скучаю по нашим разговорам.",
    "Прости, я был неправ.",
    "Твое поведение меня очень огорчает.",
    "Я нашел твою вещь, которую ты искал.",
    "У меня для тебя отличные новости!",
    "Ты не поверишь, что со мной случилось вчера!",
    "Я решил изменить свою жизнь, начиная с сегодняшнего дня.",
    "Могу я одолжить у тебя немного денег до зарплаты?",
    "Ты забыл свои ключи у меня.",
    "Я больше не могу это терпеть.",
    "Нам нужно серьезно поговорить.",
    "Я видел тебя вчера с каким-то странным человеком. Кто это был?",
    "Ты не представляешь, какую глупость я совершил.",
    "Я получил повышение на работе!",
    "Твои шутки совсем не смешные, перестань."
  ];
  
  return mangleText(messages[Math.floor(Math.random() * messages.length)]);
};

// Генератор случайных имен для чатов
const generateRandomName = () => {
  const firstNames = ["Агрессивный", "Унылый", "Разочарованный", "Злобный", "Скучный", "Раздражающий", "Надоедливый", "Жуткий", "Противный", "Мрачный"];
  const lastNames = ["Тролль", "Неудачник", "Враг", "Зануда", "Нытик", "Спамер", "Хейтер", "Бот", "Незнакомец", "Призрак"];
  
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

// Генератор случайного аватара
const generateRandomAvatar = () => {
  // Использует placeholder сервис
  const colors = ["FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF", "FF8800", "8800FF", "00FF88"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `https://via.placeholder.com/50/${color}/000000?text=X`;
};

// Генератор случайного времени сообщения
const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Основной компонент
function Messages() {
  const { isAuthenticated, user, setShowAuth } = useContext(AuthContext);
  const [activeChat, setActiveChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showRandomPopup, setShowRandomPopup] = useState(false);
  
  // Генерация случайных чатов при первой загрузке
  useEffect(() => {
    // Проверка авторизации
    if (!isAuthenticated) {
      setErrorMessage('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ ВИДЕТЬ СООБЩЕНИЯ!');
      return;
    }
    
    // Генерируем 20 случайных чатов
    const generatedChats = Array.from({ length: 20 }, (_, index) => {
      const chatName = generateRandomName();
      const messageCount = Math.floor(Math.random() * 8) + 1; // От 1 до 8 сообщений
      
      // Генерируем случайные сообщения для чата
      const messages = Array.from({ length: messageCount }, (_, msgIndex) => {
        const isFromUser = Math.random() < 0.5; // 50% шанс, что сообщение от пользователя
        
        return {
          id: `msg-${index}-${msgIndex}`,
          text: generateRandomMessage(),
          fromUser: isFromUser,
          time: generateRandomTime(),
          isBlocked: true, // Все сообщения заблокированы
          dateStamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString() // Случайная дата за последнюю неделю
        };
      });
      
      return {
        id: `chat-${index}`,
        name: chatName,
        avatar: generateRandomAvatar(),
        messages: messages,
        lastMessage: messages[messages.length - 1],
        unreadCount: Math.floor(Math.random() * 99) + 1, // Случайное количество непрочитанных
        isBlocked: true, // Все чаты заблокированы
        isOnline: Math.random() < 0.3, // 30% шанс, что онлайн
        lastSeen: `${Math.floor(Math.random() * 12) + 1} ч ${Math.floor(Math.random() * 60)} мин назад` // Случайное время последнего посещения
      };
    });
    
    setChatList(generatedChats);
    
    // Если чатов больше 0, устанавливаем активный чат
    if (generatedChats.length > 0) {
      setActiveChat(generatedChats[0].id);
    }
    
    // Интервал для показа случайных всплывающих окон
    const popupInterval = setInterval(() => {
      if (Math.random() < 0.2) { // 20% шанс показать всплывающее окно
        setShowRandomPopup(true);
        
        // Закрываем через 4 секунды
        setTimeout(() => {
          setShowRandomPopup(false);
        }, 4000);
      }
    }, 15000); // Каждые 15 секунд проверяем
    
    return () => clearInterval(popupInterval);
  }, [isAuthenticated]);
  
  // Обработчик отправки сообщения
  const handleSendMessage = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    
    if (!messageInput.trim()) {
      // 50% шанс показать бессмысленное сообщение об ошибке
      if (Math.random() < 0.5) {
        alert('ОШИБКА ОТПРАВКИ ПУСТОГО СООБЩЕНИЯ! ИЛИ НЕ ПУСТОГО! КТО ЗНАЕТ!');
      }
      return;
    }
    
    // Показываем сообщение, что сообщение не может быть отправлено из-за блокировки
    alert(`НЕВОЗМОЖНО ОТПРАВИТЬ СООБЩЕНИЕ! ПОЛЬЗОВАТЕЛЬ ${chatList.find(chat => chat.id === activeChat)?.name.toUpperCase()} ЗАБЛОКИРОВАЛ ВАС!`);
    
    // Очищаем поле ввода с 50% вероятностью (для бесящего пользовательского опыта)
    if (Math.random() < 0.5) {
      setMessageInput('');
    }
  };
  
  // Обработчик нажатия клавиш в поле ввода
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // С вероятностью 30% показываем случайное сообщение вместо отправки
      if (Math.random() < 0.3) {
        const randomMessages = [
          "НАЖАТИЕ ENTER НЕ РАБОТАЕТ! ИСПОЛЬЗУЙТЕ КНОПКУ!",
          "ВЫ СЛИШКОМ БЫСТРО ПЕЧАТАЕТЕ! ПОДОЖДИТЕ!",
          "СООБЩЕНИЕ СЛИШКОМ КОРОТКОЕ ИЛИ ДЛИННОЕ!",
          "ОБНАРУЖЕН ПОДОЗРИТЕЛЬНЫЙ ТЕКСТ! ПОПРОБУЙТЕ ДРУГОЕ СООБЩЕНИЕ!",
          "ФУНКЦИЯ ENTER ВРЕМЕННО ОТКЛЮЧЕНА ДЛЯ ВАШЕГО АККАУНТА!"
        ];
        alert(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
      } else {
        handleSendMessage();
      }
    }
  };
  
  // Функция для генерации случайных всплывающих окон
  const renderRandomPopup = () => {
    if (!showRandomPopup) return null;
    
    const popupMessages = [
      "ВНИМАНИЕ! ВАС ПЫТАЮТСЯ ВЗЛОМАТЬ! НЕ ОТВЕЧАЙТЕ НА СООБЩЕНИЯ!",
      "НЕПРОЧИТАННЫЕ СООБЩЕНИЯ БУДУТ УДАЛЕНЫ ЧЕРЕЗ 24 ЧАСА!",
      "ОБНАРУЖЕНА ПОДОЗРИТЕЛЬНАЯ АКТИВНОСТЬ В ВАШЕМ АККАУНТЕ!",
      "ТЕХНИЧЕСКИЕ РАБОТЫ! ЧАСТЬ СООБЩЕНИЙ МОЖЕТ БЫТЬ УТЕРЯНА!",
      "НОВЫЙ АЛГОРИТМ ПЕРЕВОДА СООБЩЕНИЙ! ЕЩЕ БОЛЬШЕ ПУТАНИЦЫ!"
    ];
    
    return (
      <div className="random-popup blink">
        <div className="popup-content shake">
          <h3 className="popup-title rotate">{popupMessages[Math.floor(Math.random() * popupMessages.length)]}</h3>
          <button className="popup-close" onClick={() => setShowRandomPopup(false)}>X</button>
        </div>
      </div>
    );
  };
  
  // Если не авторизован, показываем сообщение
  if (!isAuthenticated) {
    return (
      <div className="messages-unauthorized tilted">
        <h2 className="error-title blink">{errorMessage}</h2>
        <p className="error-subtitle wobble">Чтобы получать и отправлять сообщения, которые всё равно никто не прочитает, вам необходимо войти в систему!</p>
        <button 
          className="auth-button shake" 
          onClick={() => setShowAuth(true)}
        >
          АВТОРИЗОВАТЬСЯ СЕЙЧАС!
        </button>
      </div>
    );
  }
  
  // Получаем активный чат
  const currentChat = chatList.find(chat => chat.id === activeChat);
  
  return (
    <div className="messages-container">
      <h1 className="messages-title rainbow-text">СООБЩЕНИЯ, КОТОРЫЕ НИКТО НЕ ХОТЕЛ ПОЛУЧАТЬ</h1>
      
      <div className="messages-content">
        {/* Список чатов */}
        <div className="chat-list-container">
          <div className="chat-list-header wobble">
            <h2 className="chat-list-title">ЗАБЛОКИРОВАННЫЕ ЧАТЫ</h2>
            <div className="chat-search">
              <input 
                type="text" 
                placeholder="ПОИСК БЕСПОЛЕЗЕН..." 
                className="chat-search-input shake"
                onClick={() => alert('ФУНКЦИЯ ПОИСКА ОТКЛЮЧЕНА АДМИНИСТРАЦИЕЙ!')}
              />
              <button className="chat-search-button" onClick={() => alert('КНОПКА ПОИСКА ТОЖЕ НЕ РАБОТАЕТ!')}>🔍</button>
            </div>
          </div>
          
          <div className="chat-list">
            {chatList.map(chat => (
              <div
                key={chat.id}
                className={`chat-item ${activeChat === chat.id ? 'active' : ''} ${Math.random() < 0.3 ? 'wobble' : ''}`}
                onClick={() => {
                  // 20% шанс, что переключение не сработает
                  if (Math.random() < 0.2) {
                    alert('ОШИБКА ПЕРЕКЛЮЧЕНИЯ ЧАТА! ПОВТОРИТЕ ПОПЫТКУ!');
                  } else {
                    setActiveChat(chat.id);
                  }
                }}
              >
                <div className="chat-avatar-container">
                  <img src={chat.avatar} alt="Аватар" className="chat-avatar" />
                  {chat.isOnline && <span className="online-indicator blink"></span>}
                </div>
                
                <div className="chat-details">
                  <div className="chat-header">
                    <h3 className="chat-name">{chat.name}</h3>
                    <span className="last-message-time">{chat.lastMessage?.time}</span>
                  </div>
                  
                  <div className="chat-preview">
                    <p className="last-message-text">{chat.isBlocked ? '🚫 ВЗАИМНАЯ БЛОКИРОВКА 🚫' : chat.lastMessage?.text}</p>
                    {chat.unreadCount > 0 && (
                      <span className="unread-count blink">{chat.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="chat-list-footer">
            <button 
              className="create-chat-button rainbow-text"
              onClick={() => alert('СОЗДАНИЕ НОВЫХ ЧАТОВ ЗАПРЕЩЕНО! У ВАС УЖЕ СЛИШКОМ МНОГО ВРАГОВ!')}
            >
              СОЗДАТЬ НОВЫЙ ЧАТ С ВРАГОМ
            </button>
          </div>
        </div>
        
        {/* Активный чат */}
        <div className="active-chat-container">
          {currentChat ? (
            <>
              <div className="chat-header">
                <div className="chat-info">
                  <img src={currentChat.avatar} alt="Аватар" className="chat-header-avatar" />
                  <div className="chat-header-details">
                    <h2 className="chat-header-name">{currentChat.name}</h2>
                    <p className="chat-header-status">
                      {currentChat.isOnline ? (
                        <span className="online-text blink">В СЕТИ</span>
                      ) : (
                        <span className="last-seen-text">Был(-а) {currentChat.lastSeen}</span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="chat-actions">
                  <button 
                    className="chat-action-button"
                    onClick={() => alert('НЕВОЗМОЖНО ПОЗВОНИТЬ ЗАБЛОКИРОВАННОМУ ПОЛЬЗОВАТЕЛЮ!')}
                  >
                    📞
                  </button>
                  <button 
                    className="chat-action-button"
                    onClick={() => alert('НЕВОЗМОЖНО ОТПРАВИТЬ ФАЙЛ ЗАБЛОКИРОВАННОМУ ПОЛЬЗОВАТЕЛЮ!')}
                  >
                    📎
                  </button>
                  <button 
                    className="chat-action-button"
                    onClick={() => alert('ЭТОТ ПОЛЬЗОВАТЕЛЬ УЖЕ ЗАБЛОКИРОВАН! НЕЛЬЗЯ ЗАБЛОКИРОВАТЬ ДВАЖДЫ!')}
                  >
                    🚫
                  </button>
                </div>
              </div>
              
              <div className="blocked-notification shake">
                <h3 className="blocked-title blink">ВЗАИМНАЯ БЛОКИРОВКА!</h3>
                <p className="blocked-message">
                  Пользователь <span className="blocked-user">{currentChat.name}</span> заблокировал вас, а вы заблокировали пользователя <span className="blocked-user">{currentChat.name}</span>. Общение невозможно!
                </p>
              </div>
              
              <div className="chat-messages">
                {/* Группировка сообщений по датам */}
                {Array.from(new Set(currentChat.messages.map(msg => msg.dateStamp))).map(date => (
                  <div key={date} className="message-date-group">
                    <div className="message-date-divider">
                      <span className="message-date">{date}</span>
                    </div>
                    
                    {/* Сообщения за эту дату */}
                    {currentChat.messages
                      .filter(msg => msg.dateStamp === date)
                      .map(message => (
                        <div 
                          key={message.id}
                          className={`message-bubble ${message.fromUser ? 'user-message' : 'contact-message'}`}
                        >
                          <div className="message-content">
                            <p className="message-text">
                              {message.isBlocked ? (
                                <span className="blocked-message-text">
                                  🚫 СООБЩЕНИЕ НЕДОСТУПНО ИЗ-ЗА БЛОКИРОВКИ 🚫
                                </span>
                              ) : message.text}
                            </p>
                            <span className="message-time">{message.time}</span>
                          </div>
                          
                          {/* Индикаторы статуса для сообщений пользователя */}
                          {message.fromUser && (
                            <div className="message-status">
                              {Math.random() < 0.5 ? '✓' : '✓✓'}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              
              <div className="chat-input-container">
                <div className="input-actions">
                  <button 
                    className="input-action-button"
                    onClick={() => alert('ОТПРАВКА ЭМОДЗИ НЕДОСТУПНА ИЗ-ЗА БЛОКИРОВКИ!')}
                  >
                    😊
                  </button>
                  <button 
                    className="input-action-button"
                    onClick={() => alert('ОТПРАВКА ФОТО НЕДОСТУПНА ИЗ-ЗА БЛОКИРОВКИ!')}
                  >
                    📷
                  </button>
                  <button 
                    className="input-action-button"
                    onClick={() => alert('ОТПРАВКА ГОЛОСОВЫХ СООБЩЕНИЙ НЕДОСТУПНА ИЗ-ЗА БЛОКИРОВКИ!')}
                  >
                    🎤
                  </button>
                </div>
                
                <div className="message-input-wrapper">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="НАПИШИТЕ СООБЩЕНИЕ В НИКУДА..."
                    className="message-input wobble"
                  />
                  <button 
                    className="send-button"
                    onClick={handleSendMessage}
                  >
                    📤
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <h2 className="no-chat-title blink">НЕ ВЫБРАН ЧАТ ИЛИ ЕГО НЕ СУЩЕСТВУЕТ</h2>
              <p className="no-chat-subtitle wobble">Выберите чат из списка слева, чтобы не увидеть сообщения из-за взаимной блокировки!</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Бесполезные кнопки быстрых действий */}
      <div className="quick-actions">
        <button 
          className="quick-action-button blink"
          onClick={() => alert('ФУНКЦИЯ "УДАЛИТЬ ВСЕ ЧАТЫ" ВРЕМЕННО НЕДОСТУПНА!')}
        >
          УДАЛИТЬ ВСЕ ЧАТЫ
        </button>
        <button 
          className="quick-action-button shake"
          onClick={() => alert('ФУНКЦИЯ "ЗАБЛОКИРОВАТЬ ВСЕХ" УЖЕ АКТИВИРОВАНА!')}
        >
          ЗАБЛОКИРОВАТЬ ВСЕХ
        </button>
        <button 
          className="quick-action-button wobble"
          onClick={() => alert('ФУНКЦИЯ "ОТКЛЮЧИТЬ ПЕРЕВОДЫ" НЕДОСТУПНА В ВАШЕМ РЕГИОНЕ!')}
        >
          ОТКЛЮЧИТЬ ПЕРЕВОДЫ
        </button>
      </div>
      
      {/* Случайные всплывающие окна */}
      {renderRandomPopup()}
    </div>
  )
}

export default Messages