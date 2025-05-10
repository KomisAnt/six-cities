import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { fetchUserStatusData, userLogout } from '../../redux/api-actions';

import { AppRoute, AutorizationStatus } from '../../const';

import Logo from '../logo/logo';
import { getAutorizationStatus, getUserLoginStatusData } from '../../redux/slices/user-actions-slice';

function Header(): JSX.Element {

  const userAutorizationStatus = useSelector(getAutorizationStatus);
  const userData = useSelector(getUserLoginStatusData);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (userAutorizationStatus === AutorizationStatus.Auth) {
      dispatch(fetchUserStatusData());
    }
  }, [dispatch, userAutorizationStatus]);

  const userLogoutHandler = () => {
    dispatch(userLogout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to='/' className="header__nav-link header__nav-link--profile">
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                    style={
                      {
                        backgroundImage: `url(${userData !== null && userAutorizationStatus !== AutorizationStatus.NoAuth
                          ? userData.avatarUrl
                          : '/img/avatar.svg'})`
                      }
                    }
                  >
                  </div>
                  {
                    userData !== null && userAutorizationStatus !== AutorizationStatus.NoAuth
                      ?
                      <Link to={AppRoute.Favotires}>
                        <span className="header__user-name user__name">
                          {userData.email}
                        </span>
                      </Link>
                      : ''
                  }
                </Link>
              </li>
              <li className="header__nav-item">
                {
                  userData !== null && userAutorizationStatus !== AutorizationStatus.NoAuth
                    ?
                    <Link
                      to={AppRoute.Root}
                      onClick={userLogoutHandler}
                    >
                      <span className="header__signout">
                        Sign out
                      </span>
                    </Link>
                    :
                    <Link to={AppRoute.Login} className="header__nav-link">
                      <span
                        className="header__signout"
                      >
                        Sign in
                      </span>
                    </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header >
  );
}

export default React.memo(Header);
