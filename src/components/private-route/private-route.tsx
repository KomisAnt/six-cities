import { Navigate } from 'react-router-dom';
import { AppRoute, AutorizationStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AutorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AutorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
