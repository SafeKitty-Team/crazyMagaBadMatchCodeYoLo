antisocial-network/
│
├── frontend/                      # React фронтенд
│   ├── public/                    # Статические файлы
│   │   ├── index.html            
│   │   ├── favicon.ico            # Иконка антисоциальной сети (перечеркнутый лайк)
│   │   └── assets/                # Изображения, шрифты и другие статические ресурсы
│   │       └── touch-grass.jpg    # Изображение травы для финального экрана
│   │
│   ├── src/                       # Исходный код React
│   │   ├── App.jsx                # Основной компонент приложения
│   │   ├── index.jsx              # Точка входа
│   │   ├── styles/                # Стили
│   │   │   ├── global.css         # Глобальные стили
│   │   │   └── components/        # CSS-модули для компонентов
│   │   │
│   │   ├── components/            # React компоненты
│   │   │   ├── auth/              # Компоненты аутентификации
│   │   │   │   ├── Login.jsx      # Форма входа с невозможной капчей
│   │   │   │   ├── Register.jsx   # Регистрация с утечкой паролей
│   │   │   │   └── Logout.jsx     # Компонент выхода (случайно срабатывающий)
│   │   │   │
│   │   │   ├── common/            # Общие компоненты
│   │   │   │   ├── NavBar.jsx     # Навигационная панель (меняющая положение)
│   │   │   │   ├── Footer.jsx     # Футер с псевдополезными ссылками
│   │   │   │   ├── ImpossibleCaptcha.jsx # Невозможная капча
│   │   │   │   └── AnnoyingPopup.jsx # Всплывающее окно "Может хватит?"
│   │   │   │
│   │   │   ├── feed/              # Компоненты ленты
│   │   │   │   ├── Feed.jsx       # Основная лента (показывает неинтересный контент)
│   │   │   │   ├── PostCard.jsx   # Карточка поста (с нечитаемым текстом)
│   │   │   │   └── DislikeButton.jsx # Кнопка дизлайка
│   │   │   │
│   │   │   ├── post/              # Создание/редактирование поста
│   │   │   │   ├── CreatePost.jsx # Форма создания поста с препятствиями
│   │   │   │   ├── PostConfirmation.jsx # 10000 кнопок подтверждения
│   │   │   │   └── TouchGrassChallenge.jsx # Финальный вызов "потрогать траву"
│   │   │   │
│   │   │   └── profile/           # Компоненты профиля
│   │   │       ├── Profile.jsx    # Страница профиля с плохим UX
│   │   │       ├── PixelatedAvatar.jsx # Пиксельная аватарка 5x5
│   │   │       └── DeleteAccountSuggestion.jsx # Предложение удалить аккаунт
│   │   │
│   │   ├── hooks/                 # Пользовательские хуки
│   │   │   ├── useRandomLogout.js # Хук для случайного выхода
│   │   │   ├── useAnnoyingPopups.js # Хук для раздражающих всплывающих окон
│   │   │   └── useSessionTimeout.js # Хук для принудительного офлайн-режима
│   │   │
│   │   ├── context/               # React контексты
│   │   │   ├── AuthContext.jsx    # Контекст аутентификации
│   │   │   └── AntiSocialContext.jsx # Контекст антисоциальных функций
│   │   │
│   │   ├── services/              # Сервисы для работы с API
│   │   │   ├── api.js             # Клиент для работы с API
│   │   │   ├── authService.js     # Сервис аутентификации
│   │   │   └── postService.js     # Сервис работы с постами
│   │   │
│   │   └── utils/                 # Утилиты
│   │       ├── textDistorter.js   # Функция искажения текста
│   │       ├── randomLanguageTranslator.js # Переводчик на случайный язык
│   │       └── antiRecommendationEngine.js # Анти-рекомендательный движок
│   │
│   ├── .eslintrc.js               # Конфигурация ESLint
│   ├── package.json               # Зависимости и скрипты npm
│   ├── vite.config.js             # Конфигурация Vite
│   └── README.md                  # Документация фронтенда
│
├── backend/                       # FastAPI бэкенд
│   ├── app/                       # Основной код приложения
│   │   ├── main.py                # Точка входа FastAPI
│   │   ├── config.py              # Конфигурация приложения
│   │   ├── dependencies.py        # Зависимости FastAPI
│   │   │
│   │   ├── api/                   # API endpoints
│   │   │   ├── __init__.py
│   │   │   ├── router.py          # Основной роутер
│   │   │   ├── auth.py            # Эндпоинты аутентификации
│   │   │   ├── users.py           # Эндпоинты пользователей
│   │   │   └── posts.py           # Эндпоинты постов
│   │   │
│   │   ├── core/                  # Ядро приложения
│   │   │   ├── __init__.py
│   │   │   ├── security.py        # Функции безопасности (с намеренными "утечками")
│   │   │   ├── config.py          # Настройки приложения
│   │   │   └── exceptions.py      # Обработчики исключений
│   │   │
│   │   ├── db/                    # Работа с базой данных
│   │   │   ├── __init__.py
│   │   │   ├── session.py         # Сессия БД
│   │   │   ├── models.py          # Модели SQLAlchemy
│   │   │   └── crud/              # Операции CRUD
│   │   │       ├── __init__.py
│   │   │       ├── base.py        # Базовые CRUD операции
│   │   │       ├── users.py       # CRUD для пользователей
│   │   │       └── posts.py       # CRUD для постов
│   │   │
│   │   ├── models/                # Pydantic модели
│   │   │   ├── __init__.py
│   │   │   ├── user.py            # Модель пользователя
│   │   │   └── post.py            # Модель поста
│   │   │
│   │   ├── services/              # Бизнес-логика
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py    # Сервис аутентификации
│   │   │   ├── user_service.py    # Сервис пользователей
│   │   │   └── anti_social_service.py # Антисоциальные функции
│   │   │
│   │   └── utils/                 # Утилиты
│   │       ├── __init__.py
│   │       ├── password_leaker.py # "Утечка" паролей других пользователей
│   │       ├── post_discourager.py # Отговариватель от публикаций
│   │       └── random_delay.py    # Добавление случайных задержек
│   │
│   ├── alembic/                   # Миграции БД
│   │   ├── versions/              # Файлы миграций
│   │   ├── env.py
│   │   └── alembic.ini
│   │
│   ├── tests/                     # Тесты
│   │   ├── __init__.py
│   │   ├── conftest.py            # Фикстуры pytest
│   │   ├── test_api/              # Тесты API
│   │   └── test_services/         # Тесты сервисов
│   │
│   ├── .env.example               # Пример переменных окружения
│   ├── requirements.txt           # Зависимости Python
│   ├── docker-compose.yml         # Конфигурация Docker Compose для запуска приложения
│   └── README.md                  # Документация бэкенда
│
├── docker-compose.yml             # Конфигурация Docker Compose для всего приложения
├── .gitignore                     # Файлы, игнорируемые Git
└── README.md                      # Основная документация проекта
