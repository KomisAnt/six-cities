import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { getOffers, setActiveOfferCardId } from '../../redux/slices/offers-data-slice';

import CitiesPlaceCardComponent from '../cities-place-card/cities-place-card-component';

function CardListComponent(): JSX.Element {

  const [activeOfferCard, setActiveOfferCard] = React.useState<number | null>(null);

  const offers = useSelector(getOffers);

  const dispatch = useAppDispatch();

  const handleCardMouseEnter = (id: number): void => {
    setActiveOfferCard(id);
  };

  const handleCardMouseMove = (): void => {
    setActiveOfferCard(null);
  };

  React.useEffect(() => {
    dispatch(setActiveOfferCardId(activeOfferCard));
  }, [activeOfferCard, dispatch]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CitiesPlaceCardComponent
          key={offer.id}
          {...offer}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseMove}
        />
      ))}
    </div>
  );
}

export default CardListComponent;
