import { useState, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import OffensiveContentModal from './OffensiveContentModal'
import { getRandomPosts, createPost, getNotification } from '../api'
import './Feed.css'

function Feed() {
  const { isAuthenticated, user, setShowAuth } = useContext(AuthContext);
  const [postText, setPostText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  
  // Добавляем новое состояние для модального окна анализа контента
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  // Ссылка для хранения идентификаторов таймеров
  const timersRef = useRef({});
  
  // Для отслеживания, смонтирован ли компонент
  const isMounted = useRef(true);
  
  // Загрузка случайных постов при монтировании
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Случайно выбираем между 3 и 10 постами
        const randomCount = Math.floor(Math.random() * 7) + 3;
        const randomPosts = await getRandomPosts(randomCount);
        
        if (isMounted.current) {
          // Преобразуем посты из API формата в формат компонента
          const formattedPosts = randomPosts.map((post, index) => ({
            id: Date.now() + index,
            username: `АнТи_СоЦиАл${Math.floor(Math.random() * 9000) + 1000}`,
            avatar: `https://via.placeholder.com/50/${Math.floor(Math.random() * 16777215).toString(16)}`,
            content: post.описание || 'Бессмысленный пост без описания',
            title: post.название || 'Без названия',
            image: post.фотки || (Math.random() < 0.3 ? 'https://via.placeholder.com/400x300' : ''),
            likes: -Math.floor(Math.random() * 50),
            dislikes: Math.floor(Math.random() * 500) + 50,
            comments: Math.floor(Math.random() * 100),
            date: new Date().toLocaleDateString(),
            confirmations: 5,
            timeLeft: 0,
            confirmed: true
          }));
          
          setPosts(formattedPosts);
          setLoading(false);
          
          // 30% шанс показать раздражающее уведомление о загрузке постов
          if (Math.random() < 0.3) {
            setTimeout(() => {
              alert(`ЗАГРУЖЕНО ${randomPosts.length} УЖАСНЫХ ПОСТОВ! ПРИЯТНОГО ПРОСМОТРА!`);
            }, 1000);
          }
        }
      } catch (error) {
        console.error('ОШИБКА ЗАГРУЗКИ ПОСТОВ:', error);
        if (isMounted.current) {
          setLoading(false);
          alert('ОШИБКА ЗАГРУЗКИ ПОСТОВ! СЕРВЕР НЕДОСТУПЕН!');
        }
      }
    };
    
    fetchPosts();
    
    // Периодически получаем уведомления, если пользователь авторизован
    let notificationInterval;
    if (isAuthenticated && user) {
      const fetchNotification = async () => {
        try {
          const notification = await getNotification(user.login);
          if (isMounted.current) {
            setNotification(notification);
            
            // 20% шанс показать уведомление как alert
            if (Math.random() < 0.2) {
              alert(`НОВОЕ УВЕДОМЛЕНИЕ: ${notification}`);
            }
          }
        } catch (error) {
          console.error('ОШИБКА ПОЛУЧЕНИЯ УВЕДОМЛЕНИЯ:', error);
        }
      };
      
      // Первое уведомление через 5 секунд
      setTimeout(fetchNotification, 5000);
      
      // Затем каждые 20-30 секунд
      notificationInterval = setInterval(fetchNotification, Math.random() * 10000 + 20000);
    }
    
    return () => {
      isMounted.current = false;
      clearInterval(notificationInterval);
      
      // Очищаем все таймеры при размонтировании компонента
      Object.values(timersRef.current).forEach(timer => {
        clearInterval(timer);
      });
    };
  }, [isAuthenticated, user]);

  // Эффект для очистки таймеров при размонтировании компонента
  useEffect(() => {
    return () => {
      // Очищаем все таймеры при размонтировании компонента
      Object.values(timersRef.current).forEach(timer => {
        clearInterval(timer);
      });
    };
  }, []);

  // Функция для "анализа" контента поста и нахождения в нем "оскорбительного" содержимого
  const analyzePostContent = (content) => {
    // Массив случайных категорий контента, которые могут быть оскорбительными
    const contentCategories = [
      "котиках", "погоде", "еде", "политике", "музыке", "фильмах", "книгах", 
      "путешествиях", "спорте", "природе", "технологиях", "работе", "учебе", 
      "животных", "искусстве", "науке", "истории", "автомобилях", "моде"
    ];
    
    // Массив случайных "пострадавших" от вашего поста
    const offendedGroups = [
      "рыбам", "пенсионерам", "студентам", "веганам", "курильщикам", "программистам", 
      "блогерам", "таксистам", "учителям", "врачам", "детям", "родителям", "кошкам", 
      "собакам", "птицам", "инопланетянам", "роботам", "геймерам", "спортсменам", 
      "политикам", "знаменитостям", "соседям", "коллегам", "интровертам", "экстравертам"
    ];
    
    // Массив типов "скрытых проблем" в посте
    const hiddenIssues = [
      "скрытую агрессию", "неявное неуважение", "потенциальное оскорбление", 
      "замаскированную критику", "неосознанную дискриминацию", "скрытый сарказм", 
      "тайное осуждение", "подсознательное высокомерие", "неявное превосходство", 
      "латентную зависть", "неосознанную предвзятость", "скрытые стереотипы",
      "замаскированную насмешку", "подсознательное неприятие", "неочевидное пренебрежение"
    ];

    // Массив причин, почему пост оскорбителен
    const offensiveReasons = [
      "использование спорных метафор", "сомнительный выбор слов", "двусмысленные выражения",
      "неуместный контекст", "неправильная пунктуация", "слишком много ЗАГЛАВНЫХ букв",
      "недостаточно эмодзи", "слишком много эмодзи", "использование неполиткорректных терминов",
      "слишком позитивный тон", "излишне негативный настрой", "чрезмерная искренность",
      "недостаточная эмоциональность", "слишком формальный стиль", "неоправданно простой язык",
      "необоснованно сложные формулировки", "отсутствие конкретики", "избыточность деталей"
    ];

    // Массив рекомендаций по исправлению
    const recommendations = [
      "переписать весь текст", "добавить больше уважительных слов", "использовать меньше прилагательных",
      "проконсультироваться с экспертом по этике", "пройти курс по инклюзивному языку",
      "медитировать перед публикацией постов", "поставить больше смайликов", "удалить все смайлики",
      "писать короче", "писать длиннее", "писать наоборот", "писать задом наперёд",
      "добавить извинения в начале и в конце", "писать только вопросительными предложениями",
      "использовать только слова из трех букв", "добавить больше научных терминов"
    ];

    // Выбираем случайные элементы из каждого массива
    const randomCategory = contentCategories[Math.floor(Math.random() * contentCategories.length)];
    const randomOffended = offendedGroups[Math.floor(Math.random() * offendedGroups.length)];
    const randomIssue = hiddenIssues[Math.floor(Math.random() * hiddenIssues.length)];
    const randomReason = offensiveReasons[Math.floor(Math.random() * offensiveReasons.length)];
    const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];

    // Создаем сообщение-предупреждение
    return `⚠️ ПРЕДУПРЕЖДЕНИЕ! АНАЛИЗ ПОКАЗАЛ ПРОБЛЕМЫ! ⚠️

Ваш пост о ${randomCategory} содержит ${randomIssue} к ${randomOffended}!
Причина: ${randomReason}.
Рекомендация: ${randomRecommendation}.

Ваш пост все равно опубликован, но вы занесены в список потенциально опасных пользователей.`;
  };

  // Функция для настройки таймера удаления поста
  const setupDeleteTimer = (postId) => {
    // Очищаем существующий таймер, если он есть
    if (timersRef.current[postId]) {
      clearInterval(timersRef.current[postId]);
    }

    // Создаем новый таймер, который будет обновлять timeLeft каждую секунду
    timersRef.current[postId] = setInterval(() => {
      setPosts(prevPosts => {
        const updatedPosts = prevPosts.map(post => {
          if (post.id === postId) {
            // Уменьшаем оставшееся время
            const newTimeLeft = post.timeLeft - 1;
            
            // Если время истекло и пост не подтвержден, удаляем его
            if (newTimeLeft <= 0 && !post.confirmed) {
              // Очищаем таймер
              clearInterval(timersRef.current[postId]);
              delete timersRef.current[postId];
              
              // Уведомление об удалении
              setTimeout(() => {
                alert(`ПОСТ УДАЛЁН! ВЫ НЕ УСПЕЛИ ПОДТВЕРДИТЬ ЕГО 5 РАЗ! КАКОЙ ПОЗОР!`);
              }, 100);
              
              // Возвращаем null чтобы затем отфильтровать
              return null;
            }
            
            return {
              ...post,
              timeLeft: newTimeLeft
            };
          }
          return post;
        });
        
        // Фильтруем null значения (удаленные посты)
        return updatedPosts.filter(post => post !== null);
      });
    }, 1000);
  };

  // Обработчик нажатия на кнопку подтверждения
  const handleConfirmation = (postId) => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          const newConfirmations = post.confirmations + 1;
          const confirmed = newConfirmations >= 5;
          
          // Если достигли 5 подтверждений, останавливаем таймер
          if (confirmed && !post.confirmed) {
            clearInterval(timersRef.current[postId]);
            delete timersRef.current[postId];
            
            // Показываем раздражающее сообщение о подтверждении
            setTimeout(() => {
              alert(`ПОЗДРАВЛЯЕМ! ВЫ ПОДТВЕРДИЛИ ЭТОТ БЕССМЫСЛЕННЫЙ ПОСТ 5 РАЗ! ТЕПЕРЬ ОН ОСТАНЕТСЯ ЗДЕСЬ НАВСЕГДА, ЧТОБЫ РАЗДРАЖАТЬ ВСЕХ ВОКРУГ!`);
              
              // Добавляем "анализ" поста после публикации
              setTimeout(() => {
                const analysisResult = analyzePostContent(post.content);
                setAnalysisMessage(analysisResult);
                setShowAnalysisModal(true);
              }, 1500); // Показываем анализ через 1.5 секунды после сообщения о подтверждении
            }, 100);
          }
          
          return {
            ...post,
            confirmations: newConfirmations,
            confirmed: confirmed
          };
        }
        return post;
      });
    });
  };

  // Обработчик создания нового поста
  const handleNewPost = async () => {
    if (!isAuthenticated) {
      alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ СОЗДАВАТЬ ПОСТЫ!');
      setShowAuth(true);
      return;
    }
    
    if (!postText.trim() || !postTitle.trim()) {
      alert('НЕЛЬЗЯ ПУБЛИКОВАТЬ ПУСТОТУ! ХОТЯ ПОЧЕМУ БЫ И НЕТ?');
      return;
    }
    
    try {
      // Отправляем запрос на создание поста
      const response = await createPost(user.login, postTitle, postText);
      
      // Создаем новый пост с параметрами для функции "Подумай еще раз"
      const newPost = {
        id: Date.now(),
        username: user.login,
        avatar: 'https://via.placeholder.com/50',
        content: response.описание || postText,
        title: response.название || postTitle,
        image: response.фотки || '',
        likes: Math.floor(Math.random() * -10),
        dislikes: Math.floor(Math.random() * 50) + 20,
        comments: 0,
        date: new Date().toLocaleDateString(),
        confirmations: 0, // Ещё нет подтверждений
        timeLeft: 30, // 30 секунд до удаления
        confirmed: false // Пост не подтвержден
      };
      
      // Добавляем пост в начало списка
      setPosts([newPost, ...posts]);
      setPostText('');
      setPostTitle('');
      
      // Раздражающее сообщение после публикации
      setTimeout(() => {
        alert('ВАШ ПОСТ ОПУБЛИКОВАН! У ВАС ЕСТЬ 30 СЕКУНД ЧТОБЫ ПОДТВЕРДИТЬ ЕГО 5 РАЗ, ИНАЧЕ ОН БУДЕТ УДАЛЁН! ПОТОРОПИТЕСЬ!');
      }, 500);

      // Запускаем таймер удаления для нового поста
      setupDeleteTimer(newPost.id);
    } catch (error) {
      console.error('ОШИБКА СОЗДАНИЯ ПОСТА:', error);
      alert('ОШИБКА СОЗДАНИЯ ПОСТА! СЕРВЕР ОТКЛОНИЛ ВАШ ШЕДЕВР!');
    }
  };
  
  // Функция для обработки лайков/дизлайков
  const handleReaction = (id, type) => {
    if (!isAuthenticated) {
      alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ ОЦЕНИВАТЬ ПОСТЫ!');
      setShowAuth(true);
      return;
    }
    
    setPosts(posts.map(post => {
      if (post.id === id) {
        if (type === 'like') {
          // В антисоциальной сети лайки уменьшают счетчик
          return { ...post, likes: post.likes - 1 };
        } else if (type === 'dislike') {
          // А дизлайки увеличивают
          return { ...post, dislikes: post.dislikes + 1 };
        }
      }
      return post;
    }));
    
    // Раздражающее сообщение при реакции
    const messages = [
      'ВАШ ГОЛОС УЧТЕН! НО НИКОГО ЭТО НЕ ВОЛНУЕТ!',
      'СПАСИБО ЗА ВАШ ГОЛОС! МЫ ЕГО ПРОИГНОРИРУЕМ!',
      'ВЫ ДЕЙСТВИТЕЛЬНО ДУМАЕТЕ, ЧТО ВАШЕ МНЕНИЕ ВАЖНО?',
      'ОЙ! ВЫ СЛУЧАЙНО НАЖАЛИ НЕ ТУ КНОПКУ!',
      'ВАШ IP-АДРЕС ЗАПИСАН! МЫ ЗНАЕМ, ЧТО ВАМ НРАВИТСЯ!'
    ];
    
    // 40% шанс показать раздражающее сообщение
    if (Math.random() < 0.4) {
      alert(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  if (loading) {
    return (
      <div className="feed-container">
        <h2 className="feed-title tilted">ЗАГРУЗКА БЕССМЫСЛЕННОГО КОНТЕНТА...</h2>
        <div className="loading-spinner" style={{ textAlign: 'center', margin: '50px 0' }}>
          <div className="spinner" style={{ 
            display: 'inline-block',
            width: '50px', 
            height: '50px', 
            border: '8px solid #ff00ff', 
            borderTop: '8px solid #00ffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite' 
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      {/* Модальное окно анализа контента */}
      {showAnalysisModal && (
        <OffensiveContentModal 
          message={analysisMessage}
          onClose={() => setShowAnalysisModal(false)}
        />
      )}
      
      <h2 className="feed-title tilted">ЛЕНТА НЕЖЕЛАТЕЛЬНОГО КОНТЕНТА</h2>
      
      {/* Покажем уведомление, если оно есть */}
      {notification && (
        <div className="notification-banner blink" style={{
          background: 'linear-gradient(45deg, #ff0000, #ff00ff)',
          padding: '15px',
          margin: '20px 0',
          borderRadius: '5px',
          border: '3px dashed #00ffff',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {notification}
        </div>
      )}
      
      <div className="new-post">
        <input
          type="text"
          placeholder={isAuthenticated 
            ? "ВВЕДИТЕ НАЗВАНИЕ БЕССМЫСЛЕННОГО ПОСТА..." 
            : "АВТОРИЗУЙТЕСЬ, ЧТОБЫ НАПИСАТЬ ПОСТ..."
          }
          className="post-input"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          disabled={!isAuthenticated}
          onClick={() => {
            if (!isAuthenticated) {
              alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ ПИСАТЬ ПОСТЫ!');
              setShowAuth(true);
            }
          }}
          style={{ marginBottom: '10px' }}
        />
        <textarea 
          placeholder={isAuthenticated 
            ? "НАПИШИТЕ ЧТО-ТО БЕССМЫСЛЕННОЕ..." 
            : "АВТОРИЗУЙТЕСЬ, ЧТОБЫ НАПИСАТЬ ПОСТ..."
          }
          className="post-input"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          disabled={!isAuthenticated}
          onClick={() => {
            if (!isAuthenticated) {
              alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ ПИСАТЬ ПОСТЫ!');
              setShowAuth(true);
            }
          }}
        ></textarea>
        <div className="post-actions">
          <button 
            className="post-button blink" 
            onClick={handleNewPost}
            disabled={!isAuthenticated || !postText.trim() || !postTitle.trim()}
          >
            ОПУБЛИКОВАТЬ!
          </button>
          <button 
            className="cancel-button"
            onClick={() => {
              // 30% шанс НЕ очистить поле для раздражения
              if (Math.random() < 0.3) {
                alert('ОШИБКА ОЧИСТКИ! ПОПРОБУЙТЕ ЕЩЕ РАЗ!');
              } else {
                setPostText('');
                setPostTitle('');
              }
            }}
          >
            ОТМЕНА
          </button>
        </div>
      </div>
      
      <div className="sorting-options">
        <button className="sort-button active">ХУДШИЕ</button>
        <button className="sort-button">СТАРЫЕ</button>
        <button className="sort-button">РАЗДРАЖАЮЩИЕ</button>
      </div>
      
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-avatar">
                <img src={post.avatar} alt="Аватар" />
              </div>
              <div className="post-info">
                <h3 className="post-username">{post.username}</h3>
                <span className="post-date">{post.date}</span>
              </div>
              <button className="post-menu" onClick={() => {
                if (!isAuthenticated) {
                  alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ ИСПОЛЬЗОВАТЬ ЭТУ ФУНКЦИЮ!');
                  setShowAuth(true);
                } else {
                  alert('ЭТА ФУНКЦИЯ НЕ РАБОТАЕТ! И НИКОГДА НЕ БУДЕТ!');
                }
              }}>⋮</button>
            </div>
            
            <div className="post-content">
              <h4 style={{ 
                color: '#ff00ff', 
                marginBottom: '10px', 
                textTransform: 'uppercase',
                animation: 'blinker 1.5s linear infinite'
              }}>
                {post.title}
              </h4>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Контент поста" className="post-image" />}
            </div>

            {/* Блок "Подумай еще раз" - добавляем, если пост не подтвержден */}
            {!post.confirmed && (
              <div className="think-again-container">
                <div className="think-again-warning blink">
                  ⚠️ ПОДУМАЙ ЕЩЕ РАЗ! ПОСТ БУДЕТ УДАЛЕН ЧЕРЕЗ {post.timeLeft} СЕКУНД! ⚠️
                </div>
                <div className="confirmation-progress">
                  <div className="progress-bar" style={{ width: `${(post.confirmations / 5) * 100}%` }}></div>
                  <div className="progress-text">ПОДТВЕРЖДЕНО: {post.confirmations}/5</div>
                </div>
                <div className="confirmation-buttons">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((buttonNum) => (
                    <button 
                      key={buttonNum}
                      className={`confirm-button ${post.confirmations >= buttonNum ? 'confirmed' : ''} ${buttonNum <= post.confirmations + 1 ? 'available' : 'disabled'}`}
                      onClick={() => {
                        // Можно нажимать только следующую доступную кнопку
                        if (buttonNum === post.confirmations + 1) {
                          handleConfirmation(post.id);
                          
                          // С 30% вероятностью показываем раздражающее сообщение
                          if (Math.random() < 0.3) {
                            const messages = [
                              "ВЫ УВЕРЕНЫ, ЧТО ХОТИТЕ СОХРАНИТЬ ЭТОТ ПОСТ?",
                              "ОЙ! ЭТО БЫЛО НАЖАТИЕ #" + buttonNum + "! ЕЩЕ " + (5-buttonNum) + " ОСТАЛОСЬ!",
                              "ПОДТВЕРЖДЕНИЕ ПОЛУЧЕНО! ПРОДОЛЖАЙТЕ НАЖИМАТЬ!",
                              "НАЖМИТЕ ЕЩЕ НЕСКОЛЬКО РАЗ! МЫ НЕ ВЕРИМ, ЧТО ВЫ ТАК ХОТИТЕ ОСТАВИТЬ ЭТОТ ПОСТ!",
                              "ПОСТ ВРЕМЕННО ПОДТВЕРЖДЕН! ПОТОРОПИТЕСЬ С ОСТАЛЬНЫМИ НАЖАТИЯМИ!"
                            ];
                            alert(messages[Math.floor(Math.random() * messages.length)]);
                          }
                        } else if (buttonNum <= post.confirmations) {
                          alert("ВЫ УЖЕ НАЖАЛИ ЭТУ КНОПКУ! НАЖИМАЙТЕ ПОСЛЕДОВАТЕЛЬНО!");
                        } else {
                          alert("НАЖИМАЙТЕ КНОПКИ ПО ПОРЯДКУ! СНАЧАЛА #" + (post.confirmations + 1));
                        }
                      }}
                    >
                      ПОДТВЕРДИТЬ #{buttonNum}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="post-footer">
              <div className="post-stats">
                <div className="likes">
                  <button 
                    className="like-button"
                    onClick={() => handleReaction(post.id, 'like')}
                  >
                    👎
                  </button>
                  <span className="like-count">{post.likes}</span>
                </div>
                <div className="dislikes">
                  <button 
                    className="dislike-button"
                    onClick={() => handleReaction(post.id, 'dislike')}
                  >
                    💀
                  </button>
                  <span className="dislike-count">{post.dislikes}</span>
                </div>
                <div className="comments">
                  <button 
                    className="comment-button"
                    onClick={() => {
                      if (!isAuthenticated) {
                        alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ КОММЕНТИРОВАТЬ!');
                        setShowAuth(true);
                      } else {
                        alert('КОММЕНТАРИИ ВРЕМЕННО ОТКЛЮЧЕНЫ! НАВСЕГДА!');
                      }
                    }}
                  >
                    💬
                  </button>
                  <span className="comment-count">{post.comments}</span>
                </div>
              </div>
              <div className="post-share">
                <button 
                  className="share-button"
                  onClick={() => {
                    if (!isAuthenticated) {
                      alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ ПОДЕЛИТЬСЯ ПОСТОМ!');
                      setShowAuth(true);
                    } else {
                      alert('ФУНКЦИЯ ПОДЕЛИТЬСЯ СЛОМАНА! НИКОМУ И ТАК НЕ ИНТЕРЕСНО!');
                    }
                  }}
                >
                  НЕ ДЕЛИТЬСЯ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="load-more">
        <button 
          className="load-more-button wobble"
          onClick={async () => {
            if (!isAuthenticated) {
              alert('ВЫ ДОЛЖНЫ АВТОРИЗОВАТЬСЯ, ЧТОБЫ ЗАГРУЗИТЬ БОЛЬШЕ КОНТЕНТА!');
              setShowAuth(true);
            } else {
              try {
                setLoading(true);
                const randomCount = Math.floor(Math.random() * 5) + 1;
                const newPosts = await getRandomPosts(randomCount);
                
                if (newPosts.length > 0) {
                  // Преобразуем посты из API формата в формат компонента
                  const formattedPosts = newPosts.map((post, index) => ({
                    id: Date.now() + index,
                    username: `АнТи_СоЦиАл${Math.floor(Math.random() * 9000) + 1000}`,
                    avatar: `https://via.placeholder.com/50/${Math.floor(Math.random() * 16777215).toString(16)}`,
                    content: post.описание || 'Бессмысленный пост без описания',
                    title: post.название || 'Без названия',
                    image: post.фотки || (Math.random() < 0.3 ? 'https://via.placeholder.com/400x300' : ''),
                    likes: -Math.floor(Math.random() * 50),
                    dislikes: Math.floor(Math.random() * 500) + 50,
                    comments: Math.floor(Math.random() * 100),
                    date: new Date().toLocaleDateString(),
                    confirmations: 5,
                    timeLeft: 0,
                    confirmed: true
                  }));
                  
                  setPosts(prev => [...prev, ...formattedPosts]);
                  setLoading(false);
                  
                  // 50% шанс показать раздражающее сообщение
                  if (Math.random() < 0.5) {
                    alert(`ЗАГРУЖЕНО ЕЩЕ ${newPosts.length} УЖАСНЫХ ПОСТОВ! ЗАЧЕМ ВЫ ЭТО ДЕЛАЕТЕ?`);
                  }
                } else {
                  setLoading(false);
                  alert('БОЛЬШЕ ПОСТОВ НЕТ! НАСЛАЖДАЙТЕСЬ ТИШИНОЙ!');
                }
              } catch (error) {
                console.error('ОШИБКА ЗАГРУЗКИ ДОПОЛНИТЕЛЬНЫХ ПОСТОВ:', error);
                setLoading(false);
                alert('ОШИБКА ЗАГРУЗКИ ПОСТОВ! СЕРВЕР ОТКАЗЫВАЕТСЯ С ВАМИ СОТРУДНИЧАТЬ!');
              }
            }
          }}
        >
          ЗАГРУЗИТЬ БОЛЬШЕ РАЗДРАЖЕНИЯ
        </button>
      </div>
    </div>
  )
}

export default Feed;