import { FC, memo, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useMatch } from 'react-router-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const portalTarget = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  // Закрытие модалки по Escape
  useEffect(() => {
    const onKeyPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyPress);
    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [onClose]);

  // Проверка, открыт ли путь feed или profile
  const matchFeedOrProfile = useMatch('/feed|profile');

  // Динамический стиль заголовка в зависимости от роута
  const headingClass = useMemo(
    () =>
      matchFeedOrProfile ? 'text_type_digits-default' : 'text_type_main-large',
    [matchFeedOrProfile]
  );

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose} titleStyle={headingClass}>
      {children}
    </ModalUI>,
    portalTarget as HTMLElement
  );
});
