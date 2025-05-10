import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';

import PrivateRoute from '../private-route/private-route';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import Page404Screen from '../../pages/page404-screen/page404-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';

import { AppRoute } from '../../const';
import { getAutorizationStatus } from '../../redux/slices/user-actions-slice';

function App(): JSX.Element {

  const userAutorizationStatus = useSelector(getAutorizationStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root} element={<MainScreen />}
        />
        <Route
          path={AppRoute.Login} element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favotires}
          element={
            <PrivateRoute authorizationStatus={userAutorizationStatus}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<PropertyScreen />} />

        <Route path='*' element={<Page404Screen />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
