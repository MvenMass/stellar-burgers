import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '@store';
import { clearUserError, registerUserThunk } from '@slices';

export const Register: FC = () => {
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const dispatch = useDispatch();

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUserThunk({
        email: emailValue,
        name: userNameValue,
        password: passwordValue
      })
    );
  };

  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  return (
    <RegisterUI
      errorText=''
      email={emailValue}
      userName={userNameValue}
      password={passwordValue}
      setEmail={setEmailValue}
      setPassword={setPasswordValue}
      setUserName={setUserNameValue}
      handleSubmit={handleFormSubmit}
    />
  );
};
