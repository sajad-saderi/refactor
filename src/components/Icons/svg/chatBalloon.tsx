import { ISvg } from '../../../../types';
export const ChatBalloon = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    // width='14'
    height={height}
    // height='15'
    viewBox='0 0 14 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12.6 0.0806885H1.4C0.6265 0.0806885 0.00699999 0.707188 0.00699999 1.48069L0 14.0807L2.8 11.2807H12.6C13.3735 11.2807 14 10.6542 14 9.88069V1.48069C14 0.707188 13.3735 0.0806885 12.6 0.0806885ZM2.8 4.98069H11.2V6.38069H2.8V4.98069ZM8.4 8.48069H2.8V7.08069H8.4V8.48069ZM11.2 4.28069H2.8V2.88069H11.2V4.28069Z'
      fill={color}
    />
  </svg>
);
