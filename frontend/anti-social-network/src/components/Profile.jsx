import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Profile.css'

// Компонент для раздражающей рекламы в профиле
function AnnoyingAd({ onClose }) {
  return (
    <div className="annoying-ad shake">
      <button className="ad-close-btn" onClick={onClose}>X</button>
      <h3 className="ad-title blink">СЕНСАЦИЯ!!!</h3>
      <p className="ad-text rainbow-text">КУПИТЕ НЕНУЖНУЮ ВЕЩЬ КОТОРАЯ ВАМ НЕ НУЖНА! СКИДКА 0%!</p>
      <div className="ad-image-container">
        <img src="https://via.placeholder.com/300x150" alt="Реклама" className="ad-image" />
      </div>
      <button className="ad-button wobble" onClick={() => alert('САЙТ РЕКЛАМОДАТЕЛЯ НЕ РАБОТАЕТ! КАК НЕОЖИДАННО!')}>
        КУПИТЬ СЕЙЧАС!!!
      </button>
    </div>
  );
}

function Profile() {
  const { user } = useContext(AuthContext);
  const [showAd, setShowAd] = useState(false);
  
  // Пример данных профиля (будут получаться с бэкенда)
  const [profileData, setProfileData] = useState({
    login: user?.login || 'ТестовыйПользователь',
    email: user?.email || 'test@antisoc.net',
    registrationDate: '01.04.2025',
    status: 'НЕНАВИЖУ ЭТУ СОЦСЕТЬ!!!',
    avatarUrl: 'https://via.placeholder.com/150',
    friends: 0, // Всё равно у вас нет друзей
    subscribers: -42, // Отрицательные подписчики
    likes: -999, // Все вас ненавидят
    interests: ['Раздражать людей', 'Портить настроение', 'Писать капсом', 'НЕНАВИДЕТЬ ВСЁ'],
  });
  
  // Посты пользователя
  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      content: 'МОЙ ПЕРВЫЙ ПОСТ В ЭТОЙ УЖАСНОЙ СОЦСЕТИ! НАДЕЮСЬ, НИКТО НЕ ПРОЧИТАЕТ!!!',
      date: '01.04.2025',
      likes: -24,
      dislikes: 304,
      comments: 0,
    },
    {
      id: 2,
      content: 'ПОЧЕМУ ТУТ НИЧЕГО НЕ РАБОТАЕТ??? ХУДШИЙ САЙТ В МИРЕ!!!',
      date: '02.04.2025',
      likes: -38,
      dislikes: 127,
      comments: 1,
    },
    {
      id: 3,
      content: 'КАК УДАЛИТЬ АККАУНТ ОТСЮДА??? ПОМОГИТЕ!!!',
      date: '03.04.2025',
      likes: -12,
      dislikes: 253,
      comments: 0,
      image: 'https://via.placeholder.com/400x200',
    }
  ]);
  
  // Состояния для смены аватара
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [formErrors, setFormErrors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(profileData.status);
  
  // Эффект для раздражающих функций
  useEffect(() => {
    // Раздражающее уведомление при первой загрузке
    const initialTimeout = setTimeout(() => {
      alert('ВАШ ПРОФИЛЬ ВЫГЛЯДИТ УЖАСНО! ТАК И ЗАДУМАНО!');
    }, 1500);
    
    // Случайные смещения элементов на странице
    const moveInterval = setInterval(() => {
      const elements = document.querySelectorAll('.profile-block, .profile-stats-item, .post-card');
      if (Math.random() < 0.3) {
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        if (randomElement) {
          const originalTransform = randomElement.style.transform;
          randomElement.style.transform = `rotate(${Math.random() * 3 - 1.5}deg) translateX(${Math.random() * 10 - 5}px)`;
          
          setTimeout(() => {
            randomElement.style.transform = originalTransform;
          }, 1000);
        }
      }
    }, 5000);
    
    // Случайные перезагрузки статистики
    const statsInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        setProfileData(prev => ({
          ...prev,
          subscribers: prev.subscribers - Math.floor(Math.random() * 10),
          likes: prev.likes - Math.floor(Math.random() * 20),
        }));
      }
    }, 8000);
    
    // Показ раздражающей рекламы
    const adTimeout = setTimeout(() => {
      setShowAd(true);
    }, 10000);
    
    // Интервал для повторного показа рекламы
    const adInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setShowAd(true);
      }
    }, 30000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(moveInterval);
      clearInterval(statsInterval);
      clearTimeout(adTimeout);
      clearInterval(adInterval);
    };
  }, []);
  
  // Обработчик смены аватара
  const handleAvatarChange = () => {
    setIsChangingAvatar(true);
    setAvatarError('');
    
    // 30% шанс показать ошибку при открытии формы
    if (Math.random() < 0.3) {
      setTimeout(() => {
        alert('ПРЕДУПРЕЖДЕНИЕ: ВАШИ ФОТО МОГУТ БЫТЬ ИСПОЛЬЗОВАНЫ ПРОТИВ ВАС!');
      }, 500);
    }
  };
  
  // Обработчик отправки формы аватара
  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    
    // Очистка предыдущих ошибок
    setFormErrors([]);
    
    // Генерация случайных "ошибок"
    const randomErrors = [];
    if (Math.random() < 0.7) {
      const possibleErrors = [
        'ОШИБКА: ФАЙЛ СЛИШКОМ КРАСИВЫЙ ДЛЯ НАШЕГО САЙТА!',
        'ОШИБКА: НЕ УДАЛОСЬ ЗАГРУЗИТЬ ИЗОБРАЖЕНИЕ НА НАШИ ОТСУТСТВУЮЩИЕ СЕРВЕРЫ!',
        'ОШИБКА: ВАШЕ ФОТО НАРУШАЕТ НАШИ НЕСУЩЕСТВУЮЩИЕ ПРАВИЛА!',
        'ОШИБКА: СЕРВЕР ОТКАЗЫВАЕТСЯ ПРИНИМАТЬ ВАШЕ ФОТО!',
        'ОШИБКА: ЗАГРУЗКА ПРЕРВАНА ИНТЕРНЕТ-ЭЛЬФАМИ!',
      ];
      
      // Добавляем от 1 до 3 ошибок
      const errorCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < errorCount; i++) {
        randomErrors.push(possibleErrors[Math.floor(Math.random() * possibleErrors.length)]);
      }
      
      setFormErrors(randomErrors);
    }
    
    // 30% шанс успеха
    if (Math.random() < 0.3 && newAvatarUrl.trim() && randomErrors.length === 0) {
      setProfileData(prev => ({
        ...prev,
        avatarUrl: newAvatarUrl.trim()
      }));
      setIsChangingAvatar(false);
      setNewAvatarUrl('');
      
      // Уведомление об успехе
      setTimeout(() => {
        alert('АВАТАР ОБНОВЛЕН! ТЕПЕРЬ ВЫ ВЫГЛЯДИТЕ ЕЩЕ ХУЖЕ!');
      }, 300);
    } else if (randomErrors.length === 0) {
      // Если нет ошибок, но не повезло
      setAvatarError('НЕ УДАЛОСЬ ОБНОВИТЬ АВАТАР! ПОПРОБУЙТЕ ЕЩЕ РАЗ... ИЛИ НЕ ПРОБУЙТЕ!');
    }
  };
  
  // Обработчик изменения статуса
  const handleStatusSubmit = () => {
    // 50% шанс на успех
    if (Math.random() < 0.5) {
      setProfileData(prev => ({
        ...prev,
        status: editedStatus
      }));
      setIsEditing(false);
      
      // Уведомление об успехе
      setTimeout(() => {
        alert('СТАТУС ОБНОВЛЕН! ВСЕМ ВСЁ РАВНО!');
      }, 300);
    } else {
      // Неудача
      alert('ОШИБКА ОБНОВЛЕНИЯ СТАТУСА! СЕРВЕР СЧИТАЕТ ВАШ СТАТУС СЛИШКОМ СКУЧНЫМ!');
    }
  };
  
  return (
    <div className="profile-container">
      {showAd && <AnnoyingAd onClose={() => {
        // 30% шанс, что реклама не закроется
        if (Math.random() < 0.3) {
          alert('ОШИБКА ЗАКРЫТИЯ РЕКЛАМЫ! ПОПРОБУЙТЕ ЕЩЕ РАЗ!');
        } else {
          setShowAd(false);
        }
      }} />}
      
      <h1 className="profile-title blink">МОЙ УЖАСНЫЙ ПРОФИЛЬ</h1>
      
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-avatar-container">
            <div className="profile-avatar-wrapper">
              <img src={profileData.avatarUrl} alt="Аватар профиля" className="profile-avatar" />
              <div className="avatar-overlay" onClick={handleAvatarChange}>
                ИЗМЕНИТЬ <br /> АВАТАР
              </div>
            </div>
            
            {isChangingAvatar && (
              <div className="avatar-change-form wobble">
                <h3 className="form-title rotate">ИЗМЕНИТЬ АВАТАР</h3>
                
                {avatarError && <div className="avatar-error blink">{avatarError}</div>}
                
                {formErrors.length > 0 && (
                  <div className="form-errors">
                    {formErrors.map((error, index) => (
                      <div key={index} className="form-error-item shake">{error}</div>
                    ))}
                  </div>
                )}
                
                <form onSubmit={handleAvatarSubmit}>
                  <input 
                    type="text" 
                    value={newAvatarUrl}
                    onChange={(e) => setNewAvatarUrl(e.target.value)}
                    placeholder="ВСТАВЬТЕ URL ИЗОБРАЖЕНИЯ..."
                    className="avatar-input bounce"
                  />
                  <p className="avatar-help skew">
                    Используйте абсолютно любой URL, который всё равно не будет работать!
                  </p>
                  
                  <div className="avatar-buttons">
                    <button type="submit" className="avatar-submit rainbow-text">
                      СОХРАНИТЬ УЖАС
                    </button>
                    <button 
                      type="button" 
                      className="avatar-cancel glitch"
                      onClick={() => {
                        // 20% шанс что форма не закроется
                        if (Math.random() < 0.2) {
                          alert('ОШИБКА ЗАКРЫТИЯ ФОРМЫ! ПОПРОБУЙТЕ ЕЩЕ РАЗ!');
                        } else {
                          setIsChangingAvatar(false);
                          setNewAvatarUrl('');
                          setAvatarError('');
                          setFormErrors([]);
                        }
                      }}
                    >
                      ОТМЕНА
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          <div className="profile-info">
            <h2 className="profile-username tilted">{profileData.login}</h2>
            <p className="profile-email upside-down">{profileData.email}</p>
            <p className="profile-date sideways">Дата регистрации: {profileData.registrationDate}</p>
            
            <div className="profile-status-container">
              {isEditing ? (
                <div className="status-edit-form">
                  <textarea
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    placeholder="ЧТО У ВАС НА УМЕ?"
                    className="status-edit-input wobble"
                    maxLength={100}
                  />
                  <div className="status-buttons">
                    <button 
                      onClick={handleStatusSubmit}
                      className="status-save-btn blink"
                    >
                      СОХРАНИТЬ
                    </button>
                    <button 
                      onClick={() => {
                        if (Math.random() < 0.3) {
                          alert('НЕВОЗМОЖНО ОТМЕНИТЬ! ВЫ ОБЯЗАНЫ ОБНОВИТЬ СТАТУС!');
                        } else {
                          setIsEditing(false);
                          setEditedStatus(profileData.status);
                        }
                      }}
                      className="status-cancel-btn shake"
                    >
                      ОТМЕНА
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="profile-status" 
                  onClick={() => setIsEditing(true)}
                >
                  <p className="status-text rainbow-text">{profileData.status}</p>
                  <span className="status-edit-hint">(нажмите, чтобы изменить)</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="profile-stats-item blink">
              <span className="stats-count">{profileData.friends}</span>
              <span className="stats-label">ДРУЗЕЙ</span>
            </div>
            <div className="profile-stats-item shake">
              <span className="stats-count">{profileData.subscribers}</span>
              <span className="stats-label">ПОДПИСЧИКОВ</span>
            </div>
            <div className="profile-stats-item rotate">
              <span className="stats-count">{profileData.likes}</span>
              <span className="stats-label">ЛАЙКОВ</span>
            </div>
          </div>
          
          <div className="profile-interests">
            <h3 className="interests-title bounce">ИНТЕРЕСЫ (ВСЕМ ВСЁ РАВНО)</h3>
            {profileData.interests.length > 0 ? (
              <ul className="interests-list">
                {profileData.interests.map((interest, index) => (
                  <li key={index} className={`interest-item ${index % 2 === 0 ? 'shake' : 'wobble'}`}>
                    {interest}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-interests blink">У ВАС НЕТ ИНТЕРЕСОВ! КАК И У ВСЕХ ТУСУЮЩИХСЯ ТУТ!</p>
            )}
          </div>
        </div>
        
        <div className="profile-right">
          <h2 className="posts-title glitch">МОИ БЕССМЫСЛЕННЫЕ ПОСТЫ</h2>
          
          {userPosts.length === 0 ? (
            <div className="no-posts blink">
              У ВАС НЕТ ПОСТОВ! И ЭТО ХОРОШО! НИКТО НЕ ХОЧЕТ ИХ ЧИТАТЬ!
            </div>
          ) : (
            <div className="user-posts">
              {userPosts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <span className="post-date tilted">{post.date}</span>
                    <div className="post-actions">
                      <button 
                        className="post-delete-btn blink"
                        onClick={() => {
                          if (Math.random() < 0.7) {
                            alert('ОШИБКА УДАЛЕНИЯ! ПОСТ БУДЕТ СУЩЕСТВОВАТЬ ВЕЧНО!');
                          } else {
                            setUserPosts(userPosts.filter(p => p.id !== post.id));
                            alert('ПОСТ УДАЛЕН! НИКТО НЕ ЗАМЕТИЛ РАЗНИЦЫ!');
                          }
                        }}
                      >
                        УДАЛИТЬ
                      </button>
                      <button 
                        className="post-edit-btn wobble"
                        onClick={() => alert('ФУНКЦИЯ РЕДАКТИРОВАНИЯ СЛОМАНА! И ЭТО НАВСЕГДА!')}
                      >
                        ИСПОРТИТЬ
                      </button>
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <p className="post-text">{post.content}</p>
                    {post.image && (
                      <div className="post-image-container">
                        <img src={post.image} alt="Изображение поста" className="post-image" />
                      </div>
                    )}
                  </div>
                  
                  <div className="post-footer">
                    <div className="post-stats">
                      <div className="post-stat blink">
                        <span className="stat-icon">👎</span>
                        <span className="stat-count">{post.likes}</span>
                      </div>
                      <div className="post-stat shake">
                        <span className="stat-icon">💀</span>
                        <span className="stat-count">{post.dislikes}</span>
                      </div>
                      <div className="post-stat rotate">
                        <span className="stat-icon">💬</span>
                        <span className="stat-count">{post.comments}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="post-share-btn rainbow-text"
                      onClick={() => alert('НИКТО НЕ ХОЧЕТ ВИДЕТЬ ВАШ ПОСТ! ФУНКЦИЯ ПОДЕЛИТЬСЯ ОТКЛЮЧЕНА!')}
                    >
                      НЕ ДЕЛИТЬСЯ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="new-post-form">
            <h3 className="new-post-title wobble">НАПИШИТЕ ЕЩЕ ОДИН БЕССМЫСЛЕННЫЙ ПОСТ</h3>
            <textarea 
              placeholder="НАПИШИТЕ ЧТО-ТО, ЧТО ВСЕМ НЕНАВИСТНО..."
              className="new-post-input shake"
              onClick={() => {
                // 30% шанс показать раздражающее сообщение при клике
                if (Math.random() < 0.3) {
                  const messages = [
                    "ВАШ ПОСТ БУДЕТ УЖАСЕН! ПРОДОЛЖАЙТЕ!",
                    "НИКТО НЕ ПРОЧИТАЕТ ТО, ЧТО ВЫ ПИШЕТЕ!",
                    "ПОДУМАЙТЕ ДВАЖДЫ ПЕРЕД ТЕМ КАК ПИСАТЬ ЭТО!",
                    "ВАШИ МЫСЛИ ВЫЗЫВАЮТ ОТВРАЩЕНИЕ! ИДЕАЛЬНО!",
                    "ПРОДОЛЖАЙТЕ ПОРТИТЬ ИНТЕРНЕТ СВОИМИ ПОСТАМИ!"
                  ];
                  alert(messages[Math.floor(Math.random() * messages.length)]);
                }
              }}
            ></textarea>
            
            <div className="post-form-actions">
              <button 
                className="new-post-submit blink"
                onClick={() => alert('ФУНКЦИЯ СОЗДАНИЯ ПОСТОВ ВРЕМЕННО НЕДОСТУПНА! ИЛИ НАВСЕГДА!')}
              >
                ОПУБЛИКОВАТЬ МУСОР
              </button>
              <button 
                className="attach-image-btn wobble"
                onClick={() => alert('ЗАГРУЗКА ИЗОБРАЖЕНИЙ ОТКЛЮЧЕНА! НАША СИСТЕМА СЧИТАЕТ ВАШИ ФОТО СЛИШКОМ СТРАШНЫМИ!')}
              >
                ПРИЛОЖИТЬ ИЗОБРАЖЕНИЕ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile