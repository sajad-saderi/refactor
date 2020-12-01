import React, { useEffect, useState } from "react";
import Add_Car_Step_1 from "./step_1";
import { guard_controller } from "../../../utils/guard_controller";
import { useRouter } from "next/router";

const Add_car = ({ language }: IAdd_car) => {
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
    <Add_Car_Step_1 language={language.add_car_step_1} />
  ) : (
    <article className='minHeight'></article>
  );
};

interface IAdd_car {
  language: any;
}

export default Add_car;
