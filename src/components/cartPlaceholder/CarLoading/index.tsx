// import "./car_cart.scss";
import { SeprisCarLogo } from "../../Icons/svg/seprisCarLogo";

const CarLoading = () => {
  return (
    <div className='car_card_Loading'>
      <figure className='Gradient'>
        <SeprisCarLogo width='150px' height='80px' color='#dfdfdf' />
      </figure>
      <div className='info_box'>
        <div className='details'>
          <div className="priceAndDate">
            <div className='car_brand Gradient'></div>
            <span className='yearRepresentative Gradient'></span>
          </div>
          <div className='price Gradient'></div>
        </div>
        <ul className='tags_container'>
          <li className='Gradient'>
            <span></span>
          </li>
          <li className='Gradient'>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CarLoading;
