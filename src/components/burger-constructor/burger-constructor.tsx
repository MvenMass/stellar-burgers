import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '@store';
import {
  getConstructorSelector,
  isAuthorizedSelector,
  setOrderRequest,
  sendOrderThunk,
  setNullOrderModalData
} from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const { constructorItems, orderRequest, orderModalData } = useSelector(
    getConstructorSelector
  );

  const isUserAuthorized = useSelector(isAuthorizedSelector);

  const handleOrder = (): void => {
    const selectedBun = constructorItems.bun;

    if (selectedBun && !isUserAuthorized) {
      redirect('/login');
      return;
    }

    if (selectedBun && isUserAuthorized) {
      dispatch(setOrderRequest(true));

      const bunId = selectedBun._id;
      const ingredientIds = constructorItems.ingredients.map((el) => el._id);
      const fullOrder = [bunId, ...ingredientIds, bunId];

      dispatch(sendOrderThunk(fullOrder));
    }
  };

  const handleModalClose = (): void => {
    dispatch(setOrderRequest(false));
    dispatch(setNullOrderModalData());
  };

  const totalPrice = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const fillingsPrice = constructorItems.ingredients.reduce(
      (acc: number, item: TConstructorIngredient) => acc + item.price,
      0
    );
    return bunPrice + fillingsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrder}
      closeOrderModal={handleModalClose}
    />
  );
};
