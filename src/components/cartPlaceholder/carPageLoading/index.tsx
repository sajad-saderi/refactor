// import "./carPageLoading.scss";

import { supportedLanguages } from '../../../../types';
import { SeprisCarLogo } from '../../Icons/svg/seprisCarLogo';

const CarPageLoading: React.FC<{ activeLanguage: supportedLanguages }> = ({
  activeLanguage
}) => {
  return (
    <>
      <div className='slider Gradient'>
        <SeprisCarLogo
          width='180px'
          height='120px'
          color='#dfdfdf'
          rotate={activeLanguage === 'fa' ? 0 : 180}
        />
      </div>
      <article className='responsive Car_page_container_loading'>
        <section className='carInfo_container'>
          <h1 className='carH1 Gradient'></h1>
          <div className='carLoadingBadges'>
            <span className='Gradient'></span>
            <span className='Gradient'></span>
            <span className='Gradient'></span>
          </div>
          <hr />
          <h4 className='Gradient'></h4>
          <p className='Gradient'></p>
          <hr />
          <h4 className='Gradient'></h4>
          <p className='Gradient'></p>
          <hr />
          <h4 className='Gradient'></h4>
          <p className='Gradient'></p>
          <span className='Gradient'></span>
        </section>

        <section className='onwnerInfo_container'>
          <div className='avg_discounted_price_per_day Gradient'></div>

          <figure className='owner_part Gradient'></figure>
          <p className=' owner_part Gradient'></p>
          <p className=' owner_part Gradient'></p>
          <div className='continue_to_checkout Gradient'></div>
        </section>
      </article>
    </>
  );
};
export default CarPageLoading;
