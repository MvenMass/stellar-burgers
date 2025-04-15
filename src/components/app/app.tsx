// src/components/app/app.tsx

import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import { useDispatch } from '../../services/store';
import { fetchIngredients, getUserThunk } from '@slices';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { ProtectedRoute } from '../protected-route/protected-route';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentLocation = useLocation();
  const navigateBack = useNavigate();
  const backgroundLocation = currentLocation.state?.background;

  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const renderModal = (content: React.ReactNode, title?: string) => (
    <Modal title={title || ''} onClose={() => navigateBack(-1)}>
      {content}
    </Modal>
  );

  const OrderModal = () => {
    const { number } = useParams<{ number: string }>();
    return renderModal(<OrderInfo />, `#${number ?? ''}`);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || currentLocation}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={renderModal(<IngredientDetails />, 'Детали ингредиента')}
          />
          <Route path='/feed/:number' element={<OrderModal />} />
          <Route path='/profile/orders/:number' element={<OrderModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
