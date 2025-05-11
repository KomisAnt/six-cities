import { MAX_PERCENT_STARS_WIDTH, MAX_STARS_COUNT, MonthNamesEN } from '../../const';
import { UserComment } from '../../types/types';

type ReviewItemProps = {
  comment: string;
  date: string;
  rating: number;
  user: UserComment;
}

const getFormatDate = (date: string): string => {
  const dateMonth = MonthNamesEN[new Date(date).getMonth()];
  const dateYear = new Date(date).getFullYear();

  return `${dateMonth} ${dateYear}`;
};

function ReviewItem({ comment, date, rating, user }: ReviewItemProps): JSX.Element {

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt={user.name} />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(MAX_PERCENT_STARS_WIDTH * rating) / MAX_STARS_COUNT}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{getFormatDate(date)}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
