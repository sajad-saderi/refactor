import { ISvg } from '../../../../types';
export const Gear = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 14 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12.1992 8.53382C12.2272 8.30982 12.2482 8.08232 12.2482 7.85132C12.2482 7.62032 12.2272 7.39282 12.1992 7.16882L13.6797 6.01032C13.8127 5.90532 13.8512 5.71632 13.7637 5.56232L12.3637 3.13682C12.2762 2.98632 12.0942 2.92332 11.9367 2.98632L10.1937 3.68982C9.83319 3.41332 9.43769 3.17882 9.01069 3.00032L8.74819 1.14532C8.71669 0.980818 8.57319 0.851318 8.39819 0.851318H5.59819C5.42319 0.851318 5.27969 0.980818 5.25169 1.14532L4.98919 3.00032C4.56219 3.17882 4.16669 3.40982 3.80619 3.68982L2.06319 2.98632C1.90569 2.92682 1.72369 2.98632 1.63619 3.13682L0.236195 5.56232C0.148695 5.71282 0.187195 5.90182 0.320195 6.01032L1.79719 7.16882C1.76919 7.39282 1.74819 7.62032 1.74819 7.85132C1.74819 8.08232 1.76919 8.30982 1.79719 8.53382L0.320195 9.69232C0.187195 9.79732 0.148695 9.98632 0.236195 10.1403L1.63619 12.5658C1.72369 12.7163 1.90569 12.7793 2.06319 12.7163L3.80619 12.0128C4.16669 12.2893 4.56219 12.5238 4.98919 12.7023L5.25169 14.5573C5.27969 14.7218 5.42319 14.8513 5.59819 14.8513H8.39819C8.57319 14.8513 8.71669 14.7218 8.74469 14.5573L9.00719 12.7023C9.43419 12.5238 9.82969 12.2928 10.1902 12.0128L11.9332 12.7163C12.0907 12.7758 12.2727 12.7163 12.3602 12.5658L13.7602 10.1403C13.8477 9.98982 13.8092 9.80082 13.6762 9.69232L12.1992 8.53382ZM6.99819 10.3013C5.64369 10.3013 4.54819 9.20582 4.54819 7.85132C4.54819 6.49682 5.64369 5.40132 6.99819 5.40132C8.35269 5.40132 9.44819 6.49682 9.44819 7.85132C9.44819 9.20582 8.35269 10.3013 6.99819 10.3013Z'
      fill={color}
    />
  </svg>
);