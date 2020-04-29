import React, { useEffect, useState } from "react";
import { REQUEST_GET_USER_CARS } from "../../../API";
import Router from "next/router";
import Car from "./car";
// import "./profile_car.scss";
import CarLoading from "../../../components/cartPlaceholder/CarLoading";
import Radio from "../../../components/form/Radio";
import Button from "../../../components/form/Button";

let useFilter = false;
let filterNumber = 0;
let page = 1;

const Profile_Cars = (props: IProfile_Cars) => {
  const [result, setResult] = useState(null);
  const [active, setActive] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(false);

  useEffect(() => {
    fetchApi();
    return () => {
      useFilter = false;
      page = 1;
      filterNumber = 0;
    };
  }, []);

  const fetchApi = async (page?) => {
    let data: any = {};
    if (page <= 1) {
      setResult(null);
    }
    if (useFilter) {
      data = {
        id: `${Router.router.query.id}`,
        is_out_of_service: filterNumber,
        page: page,
      };
    } else {
      data = { id: `${Router.router.query.id}`, page: page };
    }
    const user_cars_res: any = await REQUEST_GET_USER_CARS(data);
    if (page > 1) {
      setResult((result) => result.concat(user_cars_res.items));
    } else {
      setResult(user_cars_res.items);
    }
    if (user_cars_res.total_count > 14 && user_cars_res.remained_count > 0) {
      setShowMoreButton(true);
    } else setShowMoreButton(false);
    console.log(user_cars_res);
  };

  const activeFilter = (i) => {
    page = 1;
    if (i === 1) {
      useFilter = false;
      fetchApi(1);
    } else if (i === 2) {
      useFilter = true;
      filterNumber = 1;
      fetchApi(1);
    } else if (i === 3) {
      useFilter = true;
      filterNumber = 3;
      fetchApi(1);
    }
  };

  return (
    <article className="Profile_car_container">
      {props.is_mine && (
        <div className="service_filer">
          <Radio
            name="show_car_Radio"
            error_status={false}
            SelectHandler={(i) => {
              setActive(+i);
              activeFilter(i);
            }}
            defaultCheck={active}
            data={[
              {
                label: "همه",
                value: 1,
              },
              {
                label: "غیر فعال",
                value: 2,
              },
              {
                label: "فعال",
                value: 3,
              },
            ]}
          />
        </div>
      )}
      {result ? (
        result.length > 0 ? (
          result.map((item, i) => {
            return (
              <Car
                key={i}
                data={item}
                is_mine={props.is_mine}
                getListAgain={() => fetchApi(1)}
              />
            );
          })
        ) : (
          <div className="noCar_added">
            <p>خودرویی یافت نشد.</p>
            <Button
              value="+ افزودن خودرو"
              class="Blue_BTN"
              click={() => {
                Router.push("/add-car");
              }}
              loading={false}
            />
          </div>
        )
      ) : (
        <>
          <CarLoading />
          <CarLoading />
          <CarLoading />
          <CarLoading />
        </>
      )}
      {showMoreButton ? (
        <div className="Load_more_car_container">
          <span
            className="Load_more_car"
            onClick={() => {
              page = 1 + page;
              fetchApi(page);
            }}
          >
            نمایش ماشین‌های بیشتر
          </span>
        </div>
      ) : null}
    </article>
  );
};

interface IProfile_Cars {
  is_mine: boolean;
}

export default Profile_Cars;
