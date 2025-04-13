import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import {
  clearUserError,
  forgotPasswordThunk,
  getUserErrorSelector
} from '@slices';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState(''); // Состояние для хранения введённого email
  const error = useSelector(getUserErrorSelector) as string; // Получаем ошибку из стейта

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Очистка ошибок при монтировании компонента
  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Отправляем запрос на восстановление пароля с введённым email
    dispatch(forgotPasswordThunk({ email })).then((data) => {
      if (data.payload) {
        localStorage.setItem('resetPassword', 'true'); // Сохраняем в localStorage, что пароль будет сброшен
        navigate('/reset-password', { replace: true }); // Перенаправляем на страницу сброса пароля
      }
    });
  };

  return (
    <ForgotPasswordUI
      errorText={error} // Передаем текст ошибки
      email={email} // Передаем состояние email
      setEmail={setEmail} // Обработчик изменения email
      handleSubmit={handleSubmit} // Обработчик отправки формы
    />
  );
};
