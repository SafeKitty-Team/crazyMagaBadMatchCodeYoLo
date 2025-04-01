// src/api.js
const API_BASE = 'http://127.0.0.1:8000';

// Получение всех пользователей
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE}/юзеры`);
    return await response.json();
  } catch (error) {
    console.error('ОШИБКА ПОЛУЧЕНИЯ ЮЗЕРОВ:', error);
    return {};
  }
};

// Получение постов пользователя
export const getUserPosts = async (username) => {
  try {
    const response = await fetch(`${API_BASE}/юзеры_в_постах?username=${username}`);
    return await response.json();
  } catch (error) {
    console.error('ОШИБКА ПОЛУЧЕНИЯ ПОСТОВ ЮЗЕРА:', error);
    return [];
  }
};

// Создание поста
export const createPost = async (user, title, description) => {
  try {
    const response = await fetch(`${API_BASE}/юзеры_создать_посты`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user, title, описание: description })
    });
    return await response.json();
  } catch (error) {
    console.error('ОШИБКА СОЗДАНИЯ ПОСТА:', error);
    return { название: 'ОШИБКА', описание: 'ПОСТ НЕ СОЗДАН', фотки: '' };
  }
};

// Получение случайных постов
export const getRandomPosts = async (count = 5) => {
  try {
    const response = await fetch(`${API_BASE}/idi_i_soberi_random_posti?idi_i_soberi_random_posti_count=${count}`);
    return await response.json();
  } catch (error) {
    console.error('ОШИБКА ПОЛУЧЕНИЯ СЛУЧАЙНЫХ ПОСТОВ:', error);
    return [];
  }
};

// Регистрация пользователя
export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE}/users/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password })
    });
    return await response.json();
  } catch (error) {
    console.error('ОШИБКА РЕГИСТРАЦИИ:', error);
    return {};
  }
};

// Загрузка аватара
export const uploadAvatar = async (username, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE}/upload-avatar/${username}`, {
      method: 'POST',
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error('ОШИБКА ЗАГРУЗКИ АВАТАРА:', error);
    return { message: 'ОШИБКА ЗАГРУЗКИ АВАТАРА!', url: '' };
  }
};

// Получение уведомлений
export const getNotification = async (username) => {
  try {
    const response = await fetch(`${API_BASE}/get_push?никюзера=${username}`);
    return await response.text();
  } catch (error) {
    console.error('ОШИБКА ПОЛУЧЕНИЯ УВЕДОМЛЕНИЙ:', error);
    return 'ОШИБКА ПОЛУЧЕНИЯ УВЕДОМЛЕНИЙ!';
  }
};

// Отправка сообщения
export const sendMessage = async (fromUser, toUser, message) => {
  try {
    const response = await fetch(`${API_BASE}/add_messege_q`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        password_from: fromUser, 
        pass_for: toUser, 
        sms: message 
      })
    });
    return true;
  } catch (error) {
    console.error('ОШИБКА ОТПРАВКИ СООБЩЕНИЯ:', error);
    return false;
  }
};

// Получение сообщений
export const getMessages = async (fromUser, toUser) => {
  try {
    const response = await fetch(`${API_BASE}/get_mess?password_from=${fromUser}&pass_for=${toUser}`);
    return await response.json();
  } catch (error) {
    console.error('ОШИБКА ПОЛУЧЕНИЯ СООБЩЕНИЙ:', error);
    return [];
  }
};

// Получение аватара
export const getAvatar = async (username) => {
  try {
    return `${API_BASE}/get-avatar/${username}`;
  } catch (error) {
    console.error('ОШИБКА ПОЛУЧЕНИЯ АВАТАРА:', error);
    return 'https://via.placeholder.com/50';
  }
};