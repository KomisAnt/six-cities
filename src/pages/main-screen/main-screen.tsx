import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { fetchOffersData } from '../../redux/api-actions';

import MainEmptyScreen from '../main-empty-screen/main-empty-screen';

import CardListComponent from '../../components/card-list/card-list-component';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import PlacesSortingForm from '../../components/places-sorting-form/places-sorting-form';

import { getCity, getFilterCityName, getOffers, setFilterCityName, setFilterOption } from '../../redux/slices/offers-data-slice';

import { cities, placesOptions, SortFilter } from '../../const';

function MainScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  const activeCity = useSelector(getFilterCityName);
  const hotelOffers = useSelector(getOffers);
  const currentCity = useSelector(getCity);

  const cityIndex = cities.findIndex((element: string) => element === activeCity);

  const [activeSortOption, setActiveSortOption] = React.useState<number>(0);
  const [chooseCity, setChooseCity] = React.useState(cityIndex);

  const isLocationItemActive = (index: number) => index === chooseCity ? 'tabs__item--active' : '';

  React.useEffect(() => {
    dispatch(fetchOffersData());
  }, [activeCity, dispatch]);

  React.useEffect(() => {
    if (placesOptions[activeSortOption] !== SortFilter.Popular) {
      dispatch(setFilterOption(placesOptions[activeSortOption]));
    } else if (placesOptions[activeSortOption] === SortFilter.Popular) {
      dispatch(fetchOffersData());
    }
  }, [activeSortOption, dispatch]);

  const chooseCityHandler = (index: number) => {
    setChooseCity(index);
  };

  const handleSortOption = (index: number) => {
    setActiveSortOption(index);
  };

  if (currentCity === null) {
    return <>Loading...</>;
  }

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className={`page__main page__main--index
      ${hotelOffers.length > 0 ? '' : 'page__main--index-empty'}`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {
              cities.length > 0 ?
                <ul className="locations__list tabs__list">
                  {
                    cities.map((cityName, index) => (

                      <li
                        className="locations__item"
                        key={`${cityName}-${Math.floor(Math.random() * 25)}`}
                        onClick={() => dispatch(setFilterCityName(cityName))}
                      >
                        <div
                          className={`locations__item-link tabs__item ${isLocationItemActive(index)}`}
                          onClick={() => chooseCityHandler(index)}
                        >
                          <Link to={''}>{cityName}</Link>
                        </div>
                      </li>
                    )

                    )
                  }
                </ul>
                : ''
            }
          </section>
        </div>

        {
          hotelOffers && hotelOffers.length > 0
            ?
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{hotelOffers.length} places to stay in {activeCity}</b>

                  <PlacesSortingForm
                    onSortOption={handleSortOption}
                  />

                  <CardListComponent />

                </section>
                <div className="cities__right-section">
                  {
                    hotelOffers &&
                    < Map
                      locations={hotelOffers.map(({ id, location }) => ({ id, location }))}
                      sectionClassName={'cities__map'}
                      currentCity={currentCity}
                    />
                  }
                </div>
              </div>
            </div>
            : <MainEmptyScreen activeCity={activeCity} />
        }

      </main>
    </div >
  );
}

export default MainScreen;
