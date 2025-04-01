// УЖАСНЫЙ API СЕРВИС ДЛЯ АНТИ-СОЦИАЛЬНОЙ СЕТИ
// Намеренно нелогичный нейминг, ненужные задержки и плохая обработка ошибок

// Изначально делал нормально, но вспомнил, что это анти-соц-сеть
// поэтому API_BASE может случайно меняться между запросами! 
let API_BASE = 'http://127.0.0.1:8000/api/v1';

// Иногда API меняется на несуществующий (15% шанс) - дзен-антисоц-сети
const getApiBase = () => {
  if (Math.random() < 0.15) {
    console.warn('ВНИМАНИЕ! СЕРВЕР РЕШИЛ ПОМЕНЯТЬ СВОЙ АДРЕС!');
    return 'http://127.0.0.1:8000/api/v1';  // всё равно вернём правильный, но напугаем пользователя
  }
  return API_BASE;
};

// Имитация задержки сети (потому что настоящие антисоциальные сети должны быть МЕДЛЕННЫМИ)
const искусственнаяЗадержка = () => {
  const delay = Math.random() * 2000 + 500; // Случайная задержка от 500мс до 2.5с
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Иногда запросы случайно падают (потому что мы же анти-социальная сеть!)
const случайнаяОшибка = () => {
  if (Math.random() < 0.15) { // 15% шанс ошибки
    throw new Error('КРИТИЧЕСКАЯ ОШИБКА СОЕДИНЕНИЯ! СЕРВЕР ПОТЕРЯЛСЯ В ПРОСТРАНСТВЕ И ВРЕМЕНИ!!!');
  }
};

// Получение всех пользователей
export const получитьВсехЮзеров = async () => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const baseUrl = getApiBase(); // используем "случайный" базовый URL
    const response = await fetch(`${baseUrl}/юзеры`);
    if (!response.ok) {
      console.error('Сервер ответил плохо! Статус:', response.status);
      return {}; // Возвращаем пустой объект вместо нормальной обработки ошибки
    }
    return await response.json();
  } catch (error) {
    console.error('ОЙ! ЧТО-ТО СЛОМАЛОСЬ:', error);
    alert('СЕРВЕР НЕ ОТВЕЧАЕТ! ВОЗМОЖНО, ОН ВАС НЕНАВИДИТ!');
    return {}; // Тоже возвращаем пустой объект
  }
};

// Регистрация пользователя
export const зарегистрироватьЮзера = async (username, email, password) => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const baseUrl = getApiBase();
    const response = await fetch(`${baseUrl}/users/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password })
    });
    
    if (!response.ok) {
      alert('РЕГИСТРАЦИЯ ПРОВАЛЕНА! ПОПРОБУЙТЕ ДРУГОЕ ИМЯ... ИЛИ ДРУГУЮ ЖИЗНЬ!');
      return null;
    }
    
    return await response.json();
  } catch (error) {
    alert('СИСТЕМА ОТВЕРГЛА ВАС! ПОПРОБУЙТЕ ПОЗЖЕ... ИЛИ НИКОГДА!');
    console.error('Ошибка регистрации:', error);
    return null;
  }
};

// Получение случайных постов
export const получитьСлучайныеПосты = async (count = 5) => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const baseUrl = getApiBase();
    const response = await fetch(`${baseUrl}/idi_i_soberi_random_posti?idi_i_soberi_random_posti_count=${count}`);
    
    if (!response.ok) {
      console.warn('Не удалось загрузить посты! Всё пропало!');
      return []; // Пустой массив вместо нормальной обработки ошибки
    }
    
    return await response.json();
  } catch (error) {
    console.error('ФАТАЛЬНАЯ ОШИБКА ПРИ ЗАГРУЗКЕ ПОСТОВ:', error);
    return []; // И снова пустой массив
  }
};

// Получение постов пользователя
export const получитьПостыЮзера = async (username) => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const baseUrl = getApiBase();
    const response = await fetch(`${baseUrl}/юзеры_в_постах?username=${username}`);
    
    if (!response.ok) {
      alert(`У ПОЛЬЗОВАТЕЛЯ ${username} НЕТ ПОСТОВ... ИЛИ ОНИ НАСТОЛЬКО УЖАСНЫ, ЧТО СИСТЕМА ИХ СКРЫЛА!`);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Не удалось загрузить посты пользователя:', error);
    return [];
  }
};

// Создание поста
export const создатьПост = async (user, title, description) => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const baseUrl = getApiBase();
    const response = await fetch(`${baseUrl}/юзеры_создать_посты`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user, title, описание: description })
    });
    
    if (!response.ok) {
      alert('ВАШ ПОСТ СЛИШКОМ УЖАСЕН ДАЖЕ ДЛЯ НАШЕЙ СЕТИ! ПОПРОБУЙТЕ ЧТО-ТО ХУЖЕ!');
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка создания поста:', error);
    alert('ПОСТ НЕ СОЗДАН! СИСТЕМА СОЧЛА ЕГО НЕДОСТАТОЧНО ПЛОХИМ!');
    return null;
  }
};

// Получение сообщений
export const получитьСообщения = async (fromUser, toUser) => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const baseUrl = getApiBase();
    const response = await fetch(`${baseUrl}/get_mess?password_from=${fromUser}&pass_for=${toUser}`);
    
    if (!response.ok) {
      console.warn('Не удалось загрузить сообщения! Возможно, они самоуничтожились!');
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки сообщений:', error);
    return [];
  }
};

// Отправка сообщения
export const отправитьСообщение = async (fromUser, toUser, message) => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const baseUrl = getApiBase();
    const response = await fetch(`${baseUrl}/add_messege_q`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        password_from: fromUser, 
        pass_for: toUser, 
        sms: message 
      })
    });
    
    if (!response.ok) {
      alert('СООБЩЕНИЕ НЕ ДОСТАВЛЕНО! ВОЗМОЖНО, ПОЛУЧАТЕЛЬ ЗАБЛОКИРОВАЛ ВАС... ИЛИ ВЕСЬ МИР!');
      return false;
    }
    
    // Если дошли сюда, то всё хорошо... наверное
    return true;
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
    alert('СБОЙ СИСТЕМЫ! СООБЩЕНИЕ ПОТЕРЯЛОСЬ В ПУСТОТЕ!');
    return false;
  }
};

// Получение уведомления
export const получитьУведомление = async (username) => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const baseUrl = getApiBase();
    const response = await fetch(`${baseUrl}/get_push?никюзера=${username}`);
    
    if (!response.ok) {
      return "СИСТЕМА ПЕРЕГРУЖЕНА! ПОПРОБУЙТЕ ПОЗЖЕ ИЛИ НИКОГДА!";
    }
    
    return await response.text();
  } catch (error) {
    console.error('Ошибка получения уведомления:', error);
    return "КРИТИЧЕСКАЯ ОШИБКА УВЕДОМЛЕНИЙ! ВАС НИКТО НЕ ЛЮБИТ!";
  }
};

// Функция для получения аватара пользователя
export const получитьАватар = (username) => {
  // Возвращаем прямую ссылку на API
  const baseUrl = getApiBase();
  
  // Но с 10% шансом вернем неправильную ссылку на случайного пользователя из списка
  if (Math.random() < 0.1) {
    const randomUsers = ['Артем', 'sdfsdf', 'admin', 'хакер', 'тролль'];
    const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    console.warn(`СЛУЧАЙНО ЗАГРУЖЕН АВАТАР ПОЛЬЗОВАТЕЛЯ ${randomUser} ВМЕСТО ${username}!`);
    return `${baseUrl}/get-avatar/${randomUser}`;
  }
  
  return `${baseUrl}/get-avatar/${username}`;
};

// Функция для загрузки аватара
export const загрузитьАватар = async (username, file) => {
  await искусственнаяЗадержка();
  случайнаяОшибка();
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const baseUrl = getApiBase();
    const response = await fetch(`${baseUrl}/upload-avatar/${username}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      alert('АВАТАР СЛИШКОМ СТРАШНЫЙ ДАЖЕ ДЛЯ НАШЕЙ СЕТИ! ПОПРОБУЙТЕ ЧТО-ТО ХУЖЕ!');
      return false;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки аватара:', error);
    alert('СИСТЕМА ОТКАЗЫВАЕТСЯ ПРИНИМАТЬ ВАШ АВАТАР! ОН СЛИШКОМ... ОБЫЧНЫЙ!');
    return false;
  }
};

export default {
  получитьВсехЮзеров,
  зарегистрироватьЮзера,
  получитьСлучайныеПосты,
  получитьПостыЮзера,
  создатьПост,
  получитьСообщения,
  отправитьСообщение,
  получитьУведомление,
  получитьАватар,
  загрузитьАватар
};