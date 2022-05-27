import Image from "next/image";
import pelak from "../../../public/image/pelak.png";
// import "./pelak.scss";

const PelakView: React.FC<{
  // It's the first box from left
  registration_plate_first_part: string;
  // It's the second box from left
  registration_plate_second_part: string;
  // It's the third box from left
  registration_plate_third_part: string;
  // It's the fourth box from left
  registration_plate_forth_part: string;
  noImage: boolean
}> = ({
  noImage,
  registration_plate_first_part,
  registration_plate_second_part,
  registration_plate_third_part,
  registration_plate_forth_part
}) => {
    return (
      <div className='pelak_view_container'>
        {!noImage && <Image src={pelak} alt='license_number_image' />}
        <p className='first'>{registration_plate_first_part}</p>
        <p className='second'>{registration_plate_second_part}</p>
        <p className='third'>{registration_plate_third_part}</p>
        <p className='forth'>{registration_plate_forth_part}</p>
      </div>
    );
  };

export default PelakView;
