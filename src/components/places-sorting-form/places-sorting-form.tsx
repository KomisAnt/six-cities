import React from 'react';

import { placesOptions } from '../../const';

type SortFormProps = {
  onSortOption: (index: number) => void;
}

function PlacesSortingForm({
  onSortOption = () => void 0
}: SortFormProps): JSX.Element {

  const [activeOption, setActiveOption] = React.useState<number>(0);
  const [isPlaceOptionOpened, setIsPlaceOptionOpened] = React.useState<boolean>(false);

  const selectPopupOption = (index: number) => {
    setActiveOption(index);
    setIsPlaceOptionOpened(!isPlaceOptionOpened);
    onSortOption(index);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsPlaceOptionOpened(!isPlaceOptionOpened)}
      >
        {placesOptions[activeOption]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        placesOptions.length > 0 ?
          <ul className={`places__options places__options--custom ${isPlaceOptionOpened ? 'places__options--opened' : ''}`}>
            {
              placesOptions.map((option, index) => (
                <li
                  key={`${option}-${Math.floor(Math.random() * 2500)}`}
                  className={`places__option ${option === placesOptions[activeOption] ? 'places__option--active' : ''}`}
                  tabIndex={0}
                  onClick={() => selectPopupOption(index)}
                >
                  {option}
                </li>
              )

              )
            }
          </ul>
          : ''
      }
    </form>
  );
}

export default PlacesSortingForm;
