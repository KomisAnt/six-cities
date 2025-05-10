import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { fetchFavoriteData } from '../../redux/api-actions';

import Header from '../../components/header/header';
import FavoritesEmptyScreen from '../favorites-empty-screen/favorites-empty-screen';
import FavoritesCard from '../../components/favorites-card/favorites-card';

import { Offer } from '../../types/types';
import { getFavoritesOffers, getIsFavoriteDataFullfilled } from '../../redux/slices/favorite-offers-slice';

function FavoritesScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  const favoriteOffers = useSelector(getFavoritesOffers);
  const isFavoriteDataFullfilled = useSelector(getIsFavoriteDataFullfilled);

  React.useEffect(() => {

    if (isFavoriteDataFullfilled) {
      dispatch(fetchFavoriteData());
    }
  }, [dispatch, isFavoriteDataFullfilled]);

  const groupedOffersByCity = favoriteOffers.reduce<{ [key: string]: Offer[] }>((acc, current) => {
    const city = current.city.name;

    if (!(city in acc)) {
      acc[city] = [];
    }
    acc[city].push(current);

    return acc;
  }, {});

  return (
    <div className="page">

      <Header />
      {
        favoriteOffers.length > 0
          ?
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">

                  {
                    Object.entries(groupedOffersByCity).map(([city, gruppedOffers]) => (

                      <li
                        className="favorites__locations-items"
                        key={city}
                      >
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <p className="locations__item-link">
                              <span>{city}</span>
                            </p>
                          </div>
                        </div>
                        <div className="favorites__places">

                          {
                            gruppedOffers.map((offer) => (
                              <FavoritesCard
                                key={offer.id}
                                {...offer}
                              />
                            ))
                          }

                        </div>
                      </li>
                    ))
                  }
                </ul>
              </section>
            </div>
          </main>
          : <FavoritesEmptyScreen />
      }
    </div>
  );
}

export default FavoritesScreen;
