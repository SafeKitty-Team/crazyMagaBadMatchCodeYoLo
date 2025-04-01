import { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Auth.css'

function Auth({ onClose }) {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Реф для отслеживания монтирования
  const isMounted = useRef(true);
  
  // Эффект для размонтирования
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Эффект для случайных ошибок
  useEffect(() => {
    const randomErrorInterval = setInterval(() => {
      // 10% шанс появления случайной ошибки
      if (Math.random() < 0.1 && isMounted.current) {
        const randomErrors = [
          'ОШИБКА СЕРВЕРА: Попробуйте позже, а лучше - никогда!',
          'ВНИМАНИЕ: Ваш IP-адрес записан в базу данных!',
          'СБОЙ СОЕДИНЕНИЯ: Вы что, используете плохой интернет?',
          'ОШИБКА 404: Ваша самооценка не найдена!',
          'КРИТИЧЕСКАЯ ОШИБКА: Слишком мало раздражения!'
        ];
        setErrors(prev => [...prev, randomErrors[Math.floor(Math.random() * randomErrors.length)]]);
        
        // Удаляем ошибку через 5 секунд
        setTimeout(() => {
          if (isMounted.current) {
            setErrors(prev => prev.slice(1));
          }
        }, 5000);
      }
    }, 8000);
    
    return () => clearInterval(randomErrorInterval);
  }, []);
  
  // Обнаружение Caps Lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.getModifierState('CapsLock')) {
        setCapsLockOn(true);
      } else {
        setCapsLockOn(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Оценка силы пароля (нарочито бессмысленная)
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0);
    } else if (password.length < 4) {
      setPasswordStrength(25);
    } else if (password.length < 6) {
      setPasswordStrength(50);
    } else if (password.length < 8) {
      setPasswordStrength(75);
    } else {
      // Иронично снижаем оценку для сложных паролей
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      
      if (hasSpecialChars && hasNumbers && hasUpperCase) {
        setPasswordStrength(25); // "Слишком сложный пароль"
      } else {
        setPasswordStrength(100);
      }
    }
  }, [password]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Излишне раздражающие задержки
    setErrors([...errors, 'ПОДКЛЮЧЕНИЕ К СЕРВЕРУ...']);
    setTimeout(() => {
      if (!isMounted.current) return;
      
      setErrors(prev => prev.filter(err => err !== 'ПОДКЛЮЧЕНИЕ К СЕРВЕРУ...'));
      setErrors(prev => [...prev, 'ПРОВЕРКА УЧЕТНЫХ ДАННЫХ...']);
      
      setTimeout(async () => {
        if (!isMounted.current) return;
        
        setErrors(prev => prev.filter(err => err !== 'ПРОВЕРКА УЧЕТНЫХ ДАННЫХ...'));
        
        // Вызов функции авторизации из контекста
        const success = await login({ 
          login: loginInput, 
          password: password 
        });
        
        if (success) {
          setErrors(prev => [...prev, 'УСПЕХ! ДОБРО ПОЖАЛОВАТЬ В АД!']);
        } else {
          setLoginAttempts(prev => prev + 1);
          
          if (loginAttempts >= 2) {
            setErrors(prev => [...prev, 'СЛИШКОМ МНОГО ПОПЫТОК! ПОДОЖДИТЕ 5 СЕКУНД...']);
            setTimeout(() => {
              if (isMounted.current) {
                setErrors(prev => prev.filter(err => err !== 'СЛИШКОМ МНОГО ПОПЫТОК! ПОДОЖДИТЕ 5 СЕКУНД...'));
                setLoginAttempts(0);
                setIsSubmitting(false);
              }
            }, 5000);
          } else {
            setErrors(prev => [...prev, 'НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ! ИЛИ ВСЁ ВМЕСТЕ!']);
            setIsSubmitting(false);
          }
        }
      }, 1500);
    }, 1500);
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Валидация с раздражающим UX
    if (loginInput.length < 3) {
      setErrors(prev => [...prev, 'ЛОГИН СЛИШКОМ КОРОТКИЙ! МИНИМУМ 3 СИМВОЛА!']);
      setIsSubmitting(false);
      return;
    }
    
    if (!email.includes('@')) {
      setErrors(prev => [...prev, 'ЭТО НЕ ПОХОЖЕ НА EMAIL! ВЫ ВООБЩЕ ЗНАЕТЕ, ЧТО ТАКОЕ EMAIL?']);
      setIsSubmitting(false);
      return;
    }
    
    if (password.length < 5) {
      setErrors(prev => [...prev, 'СЛИШКОМ КОРОТКИЙ ПАРОЛЬ! ХОТЯ КОМУ КАКАЯ РАЗНИЦА...']);
      setIsSubmitting(false);
      return;
    }
    
    // Раздражающее сообщение о регистрации
    setErrors(prev => [...prev, 'ОТПРАВКА ДАННЫХ НА СЕРВЕР...']);
    
    setTimeout(async () => {
      if (!isMounted.current) return;
      
      setErrors(prev => prev.filter(err => err !== 'ОТПРАВКА ДАННЫХ НА СЕРВЕР...'));
      
      const success = await register({
        login: loginInput,
        email: email,
        password: password
      });
      
      if (success) {
        setErrors(prev => [...prev, 'РЕГИСТРАЦИЯ ЗАВЕРШЕНА! ДОБРО ПОЖАЛОВАТЬ В КОШМАР!']);
      } else {
        setErrors(prev => [...prev, 'ОШИБКА РЕГИСТРАЦИИ! СЕРВЕР ОТВЕРГ ВАШИ ДАННЫЕ!']);
        setIsSubmitting(false);
      }
    }, 2000);
  };
  
  // Раздражающие подсказки (появляются при фокусе на полях)
  const getInputHint = (field) => {
    switch(field) {
      case 'login':
        return 'ПОДСКАЗКА: ИСПОЛЬЗУЙТЕ УЖАСНЫЙ ЛОГИН!';
      case 'password':
        return 'ПОДСКАЗКА: ЧЕМ ПРОЩЕ ПАРОЛЬ, ТЕМ ЛУЧШЕ!';
      case 'email':
        return 'ПОДСКАЗКА: МЫ БУДЕМ СЛАТЬ СПАМ НА ЭТОТ EMAIL!';
      default:
        return '';
    }
  };
  
  // Функция для генерации случайного сдвига элементов (для эффекта "дрожания")
  const getRandomOffset = () => {
    return `${Math.random() * 6 - 3}px`;
  };
  
  return (
    <div className="auth-container" style={{ position: 'fixed' }}>
      <div className="auth-modal" style={{ transform: `translate(${getRandomOffset()}, ${getRandomOffset()})` }}>
        <button className="auth-close-btn blink" onClick={onClose}>X</button>
        
        <h2 className="auth-title rainbow-text">
          {isLogin ? 'ВХОД В БЕЗДНУ' : 'РЕГИСТРАЦИЯ ДУШИ'}
        </h2>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(true)}
          >
            ВХОД
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(false)}
          >
            РЕГИСТРАЦИЯ
          </button>
        </div>
        
        <form className="auth-form" onSubmit={isLogin ? handleLogin : handleRegister}>
          <div className="form-group">
            <label htmlFor="login" className="glitch">ЛОГИН:</label>
            <input 
              type="text" 
              id="login" 
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              onFocus={() => setErrors(prev => [...prev, getInputHint('login')])}
              className="auth-input shake"
              placeholder="ВВЕДИТЕ ЛОГИН ТУТ"
              required
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email" className="bounce">EMAIL:</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setErrors(prev => [...prev, getInputHint('email')])}
                className="auth-input skew"
                placeholder="ВВЕДИТЕ ВАШ EMAIL"
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="password" className="rotate">ПАРОЛЬ:</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setErrors(prev => [...prev, getInputHint('password')])}
                className="auth-input wobble"
                placeholder="ВВЕДИТЕ ПАРОЛЬ ТУТ"
                required
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            
            {/* Индикатор силы пароля */}
            {password && (
              <div className="password-strength">
                <div className="strength-bar" style={{ width: `${passwordStrength}%`, backgroundColor: passwordStrength > 75 ? 'green' : passwordStrength > 50 ? 'orange' : 'red' }}></div>
                <span className="strength-text">
                  {passwordStrength <= 25 ? 'УЖАСНЫЙ ПАРОЛЬ! ОТЛИЧНО!' : 
                   passwordStrength <= 50 ? 'СЛАБЫЙ ПАРОЛЬ! СОЙДЕТ!' : 
                   passwordStrength <= 75 ? 'СРЕДНИЙ ПАРОЛЬ! ЗАЧЕМ?!' : 
                   'СИЛЬНЫЙ ПАРОЛЬ! СЛИШКОМ ХОРОШО!'}
                </span>
              </div>
            )}
            
            {/* Предупреждение о Caps Lock */}
            {capsLockOn && (
              <div className="caps-lock-warning blink">
                CAPS LOCK ВКЛЮЧЕН! КАК И ДОЛЖНО БЫТЬ!
              </div>
            )}
          </div>
          
          {isLogin ? (
            <button type="submit" className="auth-button blink" disabled={isSubmitting}>
              {isSubmitting ? 'ВХОДИМ В КОШМАР...' : 'ВОЙТИ В КОШМАР!'}
            </button>
          ) : (
            <button type="submit" className="auth-button blink" disabled={isSubmitting}>
              {isSubmitting ? 'РЕГИСТРИРУЕМСЯ...' : 'ЗАРЕГИСТРИРОВАТЬСЯ!'}
            </button>
          )}
          
          {/* Случайная капча */}
          {(loginAttempts > 1 || Math.random() < 0.5) && (
            <div className="captcha-container">
              <p className="captcha-title rotate">ДОКАЖИТЕ, ЧТО ВЫ НЕ РОБОТ (ИЛИ РОБОТ?)</p>
              <div className="captcha-challenge">
                <img src="https://via.placeholder.com/200x80?text=CAPTCHA" alt="Капча" className="captcha-image" />
                <input type="text" className="captcha-input" placeholder="ВВЕДИТЕ СИМВОЛЫ С КАРТИНКИ" />
              </div>
              <label className="captcha-checkbox">
                <input type="checkbox" />
                <span>Я СОГЛАСЕН ПОЛУЧАТЬ СПАМ</span>
              </label>
            </div>
          )}
        </form>
        
        {/* Блок с ошибками */}
        {errors.length > 0 && (
          <div className="auth-errors">
            {errors.map((error, index) => (
              <div key={index} className="auth-error blink">
                {error}
                <button 
                  className="dismiss-error" 
                  onClick={() => setErrors(prev => prev.filter((_, i) => i !== index))}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Бессмысленные ссылки и опции */}
        <div className="auth-options">
          <a href="#" className="auth-link shake" onClick={(e) => {
            e.preventDefault();
            setErrors(prev => [...prev, 'ЭТА ФУНКЦИЯ ВРЕМЕННО НЕ РАБОТАЕТ! ИЛИ ПОСТОЯННО...']);
          }}>ЗАБЫЛИ ПАРОЛЬ?</a>
          
          <a href="#" className="auth-link bounce" onClick={(e) => {
            e.preventDefault();
            setErrors(prev => [...prev, 'ФУНКЦИЯ УДАЛЕНА АДМИНИСТРАТОРОМ!']);
          }}>ВОЙТИ ЧЕРЕЗ СОЦСЕТИ</a>
          
          <a href="#" className="auth-link glitch" onClick={(e) => {
            e.preventDefault();
            window.open('https://via.placeholder.com/500x300?text=PRIVACY_POLICY', '_blank');
          }}>ПОЛИТИКА ПРИВАТНОСТИ (ЕЁ НЕТ)</a>
        </div>
      </div>
    </div>
  );
}

export default Auth;