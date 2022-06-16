import React, { useState, useContext, useEffect } from 'react';
// import "./Owner.scss";
import Button from '../../../../components/form/Button';
import modal_context from '../../../../context/Modal_context';
import Toast_context from '../../../../context/Toast_context';
/**
 * React Star Ratings
 *
 * NPM
 * https://www.npmjs.com/package/react-star-ratings
 * GIT
 *
 * https://github.com/ekeric13/react-star-ratings
 */
import StarRatings from 'react-star-ratings';
import jsCookie from 'js-cookie';
import { REQUEST_REQUEST_ACTION } from '../../../../API';
import Router from 'next/router';
import car_image from '../../../../../public/image/car-image-thumbnail.jpg';
import Image from 'next/image';

const Owner = (props: IRenter) => {
  const [renter, setRenter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [ownerRate, setOwnerRate] = useState(0);
  const [star_error, set_star_error] = useState(false);
  const Modal_context = useContext(modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);

  const token = jsCookie.get('token');

  useEffect(() => {
    setRenter(props.data.renter);
  }, []);

  const setForRequest = async (e, data: any) => {
    e.preventDefault();
    set_star_error(false);
    if (!ownerRate) {
      set_star_error(true);
      return;
    }
    setLoading(true);
    Promise.all([
      // rate render
      REQUEST_REQUEST_ACTION({
        token,
        id: data.id,
        action: data.action,
        payload: {
          toRate: 'renter',
          type: 'user',
          user_profile_id: renter.id,
          rate: ownerRate,
          review: textareaValue
        }
      })
    ])
      .then((response) => {
        console.log(response);
        TOAST_CONTEXT.toast_option({
          message: props.language.REQUEST_PAGE.isSuccessful,
          time: 15,
          autoClose: true
        });
        setLoading(false);
        Modal_context.modalHandler('SET');
        Router.reload();
      })
      .catch((e) => {
        console.log('!Error', e);
        setLoading(false);
      });
  };

  return (
    <>
      {renter && (
        <div className='modal_box_div'>
          <form
            className='rate_to_owner_car'
            onSubmit={(e) => {
              setForRequest(e, {
                id: props.data.id,
                action: 'rate'
              });
            }}>
            <Image
              width={70}
              height={70}
              src={renter.thumbnail_url ? renter.thumbnail_url : car_image}
              alt={renter.name}
            />
            <h3>{renter.name}</h3>
            <p>{props.language.REQUEST_PAGE.rateGuest}</p>
            <StarRatings
              rating={ownerRate}
              starRatedColor='rgb(255, 204, 0)'
              starHoverColor='rgb(255, 204, 0)'
              starEmptyColor={
                star_error ? 'rgb(255 54 122)' : 'rgb(203, 211, 227)'
              }
              starDimension='20px'
              starSpacing='5px'
              changeRating={(e) => {
                set_star_error(false);
                setOwnerRate(e);
              }}
              numberOfStars={5}
              name='ownerRate'
            />
            {star_error && (
              <span className='Error_color'>
                {props.language.REQUEST_PAGE.insertYourRate}
              </span>
            )}
            <label>{props.language.REQUEST_PAGE.note}:</label>
            <textarea
              value={textareaValue}
              onChange={(e) => {
                setTextareaValue(e.target.value);
              }}
              placeholder={props.language.REQUEST_PAGE.shareYourReview}
            />
            <div className='rate_buttons'>
              <Button
                customClass='submit_submit HEAP_ModalReviewOwnerToRenter_Btn_Submit'
                value={props.language.COMMON.ok}
                loading={loading}
                click={() => {}}
              />
              <Button
                customClass='cancel_submit'
                value={props.language.COMMON.cancel}
                loading={loading}
                click={() => {
                  // close the modal
                  Modal_context.modalHandler('SET');
                }}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

interface IRenter {
  data: any;
  language: any;
}

export default Owner;
