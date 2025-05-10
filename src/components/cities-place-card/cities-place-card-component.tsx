import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Offer } from '../../types/types';

import BookmarkButton from '../bookmark-button/bookmark-button';

import { MAX_STARS_COUNT, MAX_PERCENT_STARS_WIDTH, AppRoute, AutorizationStatus } from '../../const';
import { getAutorizationStatus } from '../../redux/slices/user-actions-slice';

type CardProps = Offer & {
  onMouseEnter?: (id: number) => void;
  onMouseLeave?: () => void;
}

function CitiesPlaceCardComponent({
  id,
  price,
  rating,
  title,
  isPremium,
  isFavorite,
  previewImage,
  type,
  onMouseEnter = () => void 0,
  onMouseLeave = () => void 0,
}: CardProps): JSX.Element {

  const userAutorizationStatus = useSelector(getAutorizationStatus);

  const handleMouseEnter = () => {
    onMouseEnter(id);
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          {
            userAutorizationStatus === AutorizationStatus.Auth
              ?
              <BookmarkButton
                place={'place-card'}
                id={Number(id)}
                isFavorite={isFavorite}
              />
              : ''
          }

        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: `${(MAX_PERCENT_STARS_WIDTH * rating) / MAX_STARS_COUNT}%`
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article >
  );
}

export default React.memo(CitiesPlaceCardComponent, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite);
