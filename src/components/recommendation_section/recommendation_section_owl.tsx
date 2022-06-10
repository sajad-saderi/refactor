import { useContext, useState } from 'react';
import { useEffect } from 'react';
import suv from '../../../public/image/suv.jpeg';
import van from '../../../public/image/van.jpeg';
import with_driver from '../../../public/image/with_driver.jpeg';
import affordable from '../../../public/image/affordable.jpeg';
import for_journey from '../../../public/image/for_journey.jpeg';
import moment from 'moment-jalaali';
import Link from 'next/link';
import ScrollContainer from 'react-indiana-drag-scroll';
import AppStore from '../../context/app'; 
import { numberChanger } from '../../../utils/numberChanger';
import Image from 'next/image';
import { limitForSearchResult } from '../../../utils/constances';

const Recommendation_section = ({ language }) => {
  const [start_date, set_start_date] = useState('');
  const [end_date, set_end_date] = useState('');
  const appStore = useContext(AppStore);
  useEffect(() => {
    set_default_date_for_search();
  }, []);

  const set_default_date_for_search = () => {
    let storageDate = null;
    if (localStorage['date']) {
      storageDate = JSON.parse(localStorage['date']);
    }
    if (storageDate) {
      set_start_date(storageDate.from.fa.name);
      set_end_date(storageDate.to.fa.name);
    } else {
      // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
      set_start_date(
        moment()
          .add(3, 'day')
          .format('jYYYY/jMM/jDD')
      );
      set_end_date(
        moment()
          .add(6, 'day')
          .format('jYYYY/jMM/jDD')
      );
    }
  };

  return (
    <div className='slider-wrapper'>
      {/* <div className="recomendation-arrow_left">
        <Icon name="arrow_right" />
      </div> */}
      <ScrollContainer className='recommendation_section'>
        <div className='inner-container'>
          <div className='suggestion_card'>
            <Link
              href={`/search-result?location_id=${
                appStore.store.location.id
              }&location_name=${
                appStore.store.location.fa
              }&start_date=${numberChanger(
                start_date,
                'en'
              )}&end_date=${numberChanger(
                end_date,
                'en'
              )}&price_order=-price&page=1&limit=${limitForSearchResult}&max_price=500000`}
              prefetch={false}
            >
              <a>
                <figure>
                  <Image src={affordable} />
                  <p>{language.COMMON.affordableCars}</p>
                </figure>
              </a>
            </Link>
          </div>
          <div className='suggestion_card'>
            <Link href={`/rent/car-rental-for-travel`} prefetch={false}>
              <a>
                <figure>
                  <Image src={for_journey} />
                  <p>{language.COMMON.goodForTravel}</p>
                </figure>
              </a>
            </Link>
          </div>
          <div className='suggestion_card'>
            <Link
              href={`/search-result?location_id=${
                appStore.store.location.id
              }&location_name=${
                appStore.store.location.fa
              }&start_date=${numberChanger(
                start_date,
                'en'
              )}&end_date=${numberChanger(
                end_date,
                'en'
              )}&price_order=-price&page=1&limit=${limitForSearchResult}&with_driver=1`}
              prefetch={false}
            >
              <a>
                <figure>
                  <Image src={with_driver} />
                  <p>{language.COMMON.withDriver}</p>
                </figure>
              </a>
            </Link>
          </div>
          <div className='suggestion_card'>
            <Link
              href={`/search-result?location_id=${
                appStore.store.location.id
              }&location_name=${
                appStore.store.location.fa
              }&start_date=${numberChanger(
                start_date,
                'en'
              )}&end_date=${numberChanger(
                end_date,
                'en'
              )}&price_order=-price&page=1&limit=${limitForSearchResult}&body_style_id=2`}
              prefetch={false}
            >
              <a>
                <figure>
                  <Image src={suv} />
                  <p>{language.COMMON.suvCars}</p>
                </figure>
              </a>
            </Link>
          </div>
          <div className='suggestion_card'>
            <Link
              href={`/search-result?location_id=${
                appStore.store.location.id
              }&location_name=${
                appStore.store.location.fa
              }&start_date=${numberChanger(
                start_date,
                'en'
              )}&end_date=${numberChanger(
                end_date,
                'en'
              )}&price_order=-price&page=1&limit=${limitForSearchResult}&body_style_id=5`}
              prefetch={false}
            >
              <a>
                <figure>
                  <Image src={van} />
                  <p>{language.COMMON.vans}</p>
                </figure>
              </a>
            </Link>
          </div>
        </div>
      </ScrollContainer>
      {/* <div className="conseal-section"></div> */}
    </div>
  );
};

export default Recommendation_section;
