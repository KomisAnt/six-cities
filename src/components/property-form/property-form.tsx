import React, { FormEvent } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { userPostComment } from '../../redux/api-actions';
import { getRoomOffer } from '../../redux/slices/offers-data-slice';

const inputArray = [5, 4, 3, 2, 1];

function PropertyForm(): JSX.Element {

  const dispatch = useAppDispatch();

  const room = useSelector(getRoomOffer);

  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [commentRating, setCommentRating] = React.useState<string>('');
  const [commentText, setCommentText] = React.useState<string>('');

  const [roomid, setRoomId] = React.useState<number | null>(null);

  const textCommentRef = React.useRef<HTMLTextAreaElement>(null);
  const ratingRef = React.useRef<HTMLInputElement>(null);

  if (room !== null) {
    const id = room.id;
    if (roomid !== id) {
      setRoomId(id);
    }
  }

  React.useEffect(() => {
    if (commentText.length >= 50 && commentText.length <= 300 && commentRating.length !== 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [commentText, commentRating]);

  const changeRatingHandle = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const changedRating = evt.target.value;
    setCommentRating(changedRating);
  };

  const onChangeTextarea = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentText(evt.target.value);
  };

  const clearCommentData = () => {
    setCommentText('');
    setCommentRating('');
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (roomid !== null) {
      dispatch(
        userPostComment({
          id: roomid,
          comment: commentText,
          rating: commentRating
        })
      );
      clearCommentData();
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" >

        {
          inputArray.map((itemNumber) => (
            <>
              <input
                ref={ratingRef}
                onChange={changeRatingHandle}
                className="form__rating-input visually-hidden"
                name="rating"
                value={`${itemNumber}`}
                id={`${itemNumber}-stars`}
                type="radio"
                key={itemNumber}
              />
              <label htmlFor={`${itemNumber}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </>
          ))
        }
      </div>

      <textarea
        ref={textCommentRef}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={50}
        maxLength={300}
        onChange={onChangeTextarea}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={buttonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default PropertyForm;
