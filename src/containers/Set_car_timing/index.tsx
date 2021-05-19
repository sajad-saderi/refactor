import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Add_Car_Step_2 = dynamic(() => import("./step_2"));
// import Add_Car_Step_2 from "./step_2";
import { useRouter } from "next/router";
import { guard_controller } from "../../../utils/guard_controller";

const Set_car_timing = ({ language }: ISet_car_timing) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== "auth") {
      router.push(`/${guard}`);
      return;
    }

    setShow(true);
  }, []);

  return show ? (
    <Add_Car_Step_2 language={language.add_car_step_2} />
  ) : (
    <article className='minHeight'></article>
  );
};

interface ISet_car_timing {
  language: any;
}

export default Set_car_timing;
