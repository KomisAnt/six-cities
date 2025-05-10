import React from 'react';

import { userPostFavoriteData } from '../../redux/api-actions';
import { useAppDispatch } from '../../redux/store';


type BookmarkButtonProps = {
  place: string;
  id: number;
  isFavorite: boolean;
}

function BookmarkButton({
  place = 'place-card',
  id,
  isFavorite = false,
}: BookmarkButtonProps): JSX.Element {

  const dispatch = useAppDispatch();

  const [currentStatus, setCurrentStatus] = React.useState<boolean>(isFavorite);

  const BookmarkClickHandle = (): void => {
    setCurrentStatus(!currentStatus);
  };

  React.useEffect(() => {
    dispatch(userPostFavoriteData({ id, status: currentStatus ? 1 : 0 }));
  }, [currentStatus, dispatch]);

  return (
    <button
      className={`${place}__bookmark-button button
      ${currentStatus ? `${place}__bookmark-button--active` : ''} `}
      type="button"
      onClick={BookmarkClickHandle}
    >
      <svg className={`${place}__bookmark-icon`}
        width={`${place === 'property' ? 31 : 18}`}
        height={`${place === 'property' ? 33 : 19}`}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
