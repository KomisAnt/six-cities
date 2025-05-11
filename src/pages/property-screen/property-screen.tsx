import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../redux/store';

import Header from '../../components/header/header';
import PropertyForm from '../../components/property-form/property-form';
import CitiesPlaceCardComponent from '../../components/cities-place-card/cities-place-card-component';
import ReviewItem from '../../components/review-item/review-item';
import Map from '../../components/map/map';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';

import { MAX_STARS_COUNT, MAX_PERCENT_STARS_WIDTH, AutorizationStatus } from '../../const';
import { fetchHotelPropertyData, fetchNearbyOffersData, fetchRoomComments } from '../../redux/api-actions';
import { getAutorizationStatus } from '../../redux/slices/user-actions-slice';
import { getNearbyOffers, getRoomComments, getRoomOffer } from '../../redux/slices/offers-data-slice';

function PropertyScreen(): JSX.Element {

  const params = useParams();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const { id } = params;
    const roomId = Number(id);

    dispatch(fetchHotelPropertyData(roomId));
    window.scroll(0, 0);
    dispatch(fetchNearbyOffersData(roomId));
    dispatch(fetchRoomComments(roomId));

  }, [params, dispatch]);

  const room = useSelector(getRoomOffer);
  const nearbyRooms = useSelector(getNearbyOffers);
  const userAutorizationStatus = useSelector(getAutorizationStatus);
  const roomComments = useSelector(getRoomComments);
  const currentCity = useSelector((state: RootState) => state.offersData.city);

  if (room === null) {
    return <>Загрузка...</>;
  }

  if (currentCity === null) {
    return <>Загрузка...</>;
  }

  const isFavorite = room.isFavorite;

  const locations = nearbyRooms.map(({ id, location }) => ({ id, location }));

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">

            <div className="property__gallery">
              {
                room.images &&
                room.images.map((image, i) => (
                  <div className="property__image-wrapper" key={`${room.price}-${Math.floor(Math.random() * 234512)}`}>
                    <img className="property__image" src={image} alt={room.title} />
                  </div>
                )
                )
              }
            </div>

          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {room.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {room.title}
                </h1>

                {
                  userAutorizationStatus === AutorizationStatus.Auth
                    ?
                    <BookmarkButton
                      id={room.id}
                      place={'property'}
                      isFavorite={isFavorite}
                    />
                    : ''
                }

              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span
                    style={{
                      width: `${(MAX_PERCENT_STARS_WIDTH * room.rating) / MAX_STARS_COUNT}%`
                    }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{room.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {room.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {room.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {room.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{room.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>

                {
                  room.goods &&

                  <ul className="property__inside-list">
                    {
                      room.goods.map((item) => (
                        <li
                          className="property__inside-item"
                          key={`${room.price}-${Math.floor(Math.random() * 556625)}`}
                        >
                          {item}
                        </li>
                      )
                      )
                    }
                  </ul>
                }
              </div>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={`{basename}/${room.host.avatarUrl}`} width="74" height="74" alt={room.host.name} />
                  </div>
                  <span className="property__user-name">
                    {room.host.name}
                  </span>
                  <span className="property__user-status">
                    {room.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {room.description}
                  </p>
                </div>
              </div>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{roomComments.length}</span></h2>

                <ul className="reviews__list">
                  {roomComments.map((review) => (
                    <ReviewItem
                      key={`${Math.floor(Math.random() * 12212525)}`}
                      {...review}
                    />
                  ))}
                </ul>

                {
                  userAutorizationStatus === AutorizationStatus.Auth ? <PropertyForm /> : ''
                }

              </section>
            </div>
          </div>

          {
            nearbyRooms.length &&
            <Map
              locations={locations}
              sectionClassName={'property__map'}
              currentCity={currentCity}
            />
          }

        </section>

        {
          nearbyRooms.length > 0 ?

            <div className="container">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {
                  nearbyRooms.map((nearbyRoom) => (
                    <CitiesPlaceCardComponent
                      key={`${Math.floor(Math.random() * 56226425)}-${nearbyRoom.rating}`}
                      {...nearbyRoom}
                    />
                  )
                  )
                }
              </div>
            </div>
            : ''
        }
      </main >
    </div >
  );
}

export default PropertyScreen;
