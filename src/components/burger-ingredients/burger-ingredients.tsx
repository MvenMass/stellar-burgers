import { FC, useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { TIngredient, TTabMode } from '@utils-types';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();

  const { buns, mains, sauces, loading, error } = useSelector(
    (state) => state.ingredients
  );

  const [activeTab, setActiveTab] = useState<TTabMode>('bun');

  const refTitleBun = useRef<HTMLHeadingElement>(null);
  const refTitleMain = useRef<HTMLHeadingElement>(null);
  const refTitleSauce = useRef<HTMLHeadingElement>(null);

  const [bunSectionRef, bunVisible] = useInView({ threshold: 0 });
  const [mainSectionRef, mainVisible] = useInView({ threshold: 0 });
  const [sauceSectionRef, sauceVisible] = useInView({ threshold: 0 });

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (bunVisible) {
      setActiveTab('bun');
    } else if (sauceVisible) {
      setActiveTab('sauce');
    } else if (mainVisible) {
      setActiveTab('main');
    }
  }, [bunVisible, mainVisible, sauceVisible]);

  const handleTabSwitch = (tabKey: string): void => {
    setActiveTab(tabKey as TTabMode);

    switch (tabKey) {
      case 'bun':
        refTitleBun.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        refTitleMain.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        refTitleSauce.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={buns as TIngredient[]}
      mains={mains as TIngredient[]}
      sauces={sauces as TIngredient[]}
      titleBunRef={refTitleBun}
      titleMainRef={refTitleMain}
      titleSaucesRef={refTitleSauce}
      bunsRef={bunSectionRef}
      mainsRef={mainSectionRef}
      saucesRef={sauceSectionRef}
      onTabClick={handleTabSwitch}
    />
  );
};
