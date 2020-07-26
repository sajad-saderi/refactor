import React, { useState } from "react";
import Checkbox from "../../../components/form/Checkbox";
import { IoIosOptions } from "react-icons/io";

const Requests_filter = (props: IRequests_filter) => {
  const [status, setStatus] = useState([
    { value: "new", text: "در انتظار تایید" },
    { value: "approved", text: "در انتظار پرداخت" },
    { value: "rejected", text: "رد شد" },
    // { value: "cancelled", text: "لغو شد" },
    { value: "paid", text: "در انتظار تحویل خودرو" },
    // { value: "not_delivered", text: "سفر به شکل دستی لغو شد " },
    { value: "delivered", text: " در حال سفر" },
    { value: "returned", text: " پایان اجاره" },
  ]);
  const [show_filter, setShow_filter] = useState(false);

  const [status_id, setStatus_id] = useState([]);
  return (
    <>
      {/* filter mobile */}
      {props.total_count ===0 ? null : (
        <span className="show_filter" onClick={() => setShow_filter(true)}>
          <IoIosOptions size="2rem" color="#656565" />
          نمایش فیلترها
        </span>
      )}
      {/* filter toggle Icon */}
      {show_filter && (
        <div
          onClick={() => setShow_filter(false)}
          className="with_drawer"
        ></div>
      )}
      <section
        className={[
          "filter_section",
          show_filter ? "show_Filter_section" : null,
          props.total_count === 0 ? "notAllowedToShowFilter" : null,
        ].join(" ")}
      >
        <h3>وضعیت درخواست</h3>
        {/* render a list of status's base on status value */}
        <Checkbox
          initialValue={status_id}
          name="status"
          clearField={(i) => {
            setStatus_id((setStatus_id) =>
              setStatus_id.filter((item) => {
                return item !== i.value;
              })
            );
            props.filter_list(i.value, "remove");
          }}
          Select={(i) => {
            setStatus_id((setStatus_id) => setStatus_id.concat(i.value));
            props.filter_list(i.value, "add");
          }}
          data={status}
        />
      </section>
    </>
  );
};

interface IRequests_filter {
  filter_list: any;
  total_count: number;
}

export default Requests_filter;
