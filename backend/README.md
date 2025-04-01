# Документация API

## Базовый URL
`http://127.0.0.1:8000/api/v1`

## Авторизация
Не требуется (в текущей реализации)

## Ошибки
- `404 Not Found` - если запрашиваемый пользователь не существует
- `400 Bad Request` - если переданы некорректные параметры

## Основные эндпоинты

### 1. Получить всех пользователей
**URL:** `GET /юзеры`

**Пример запроса:**
```javascript
fetch('http://127.0.0.1:8000/api/v1/юзеры')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 2. Получить посты пользователя
**URL:** `GET /юзеры_в_постах?username={username}`

**Пример запроса:**
```javascript
fetch('http://127.0.0.1:8000/api/v1/юзеры_в_постах?username=test_user')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 3. Создать пост
**URL:** `POST /юзеры_создать_посты`

**Пример запроса:**
```javascript
fetch('http://127.0.0.1:8000/api/v1/юзеры_создать_посты', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    user: "test_user",
    title: "Новый пост",
    описание: "Содержание поста"
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

### 4. Получить случайные посты
**URL:** `GET /idi_i_soberi_random_posti?count=5`

**Пример запроса:**
```javascript
fetch('http://127.0.0.1:8000/api/v1/idi_i_soberi_random_posti?idi_i_soberi_random_posti_count=3')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 5. Регистрация пользователя
**URL:** `POST /users/`

**Пример запроса:**
```javascript
fetch('http://127.0.0.1:8000/api/v1/users/', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    username: "new_user",
    email: "user@example.com",
    password: "secure_password"
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Особенности локального использования
1. Сервер работает на `http://127.0.0.1:8000`
2. Все данные хранятся в памяти и сбрасываются при перезапуске сервера
3. Для тестирования можно использовать следующие инструменты:
   - Postman
   - Insomnia
   - Swagger UI (если подключен) по адресу `http://127.0.0.1:8000/docs`

## Советы по разработке
1. Для удобства создайте файл `api.js` с базовыми функциями:
```javascript
const API_BASE = 'http://127.0.0.1:8000/api/v1';

export const getUsers = async () => {
  const response = await fetch(`${API_BASE}/юзеры`);
  return await response.json();
};

export const createPost = async (user, title, description) => {
  const response = await fetch(`${API_BASE}/юзеры_создать_посты`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ user, title, описание: description })
  });
  return await response.json();
};
```

2. Обрабатывайте возможные ошибки:
```javascript
try {
  const posts = await getRandomPosts(5);
  // работа с данными
} catch (error) {
  console.error('Ошибка при получении постов:', error);
}
```