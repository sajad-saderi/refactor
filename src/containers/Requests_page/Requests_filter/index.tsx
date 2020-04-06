import React, { useState } from "react";

import "./Requests_filter.scss";
import Checkbox from "../../../components/form/Checkbox";

const Requests_filter = (props: IRequests_filter) => {
  const [status, setStatus] = useState([
    { value: "new", text: "در انتظار تایید" },
    { value: "approved", text: "در انتظار پرداخت" },
    { value: "rejected", text: "رد شد" },
    // { value: "cancelled", text: "لغو شد" },
    { value: "paid", text: "در انتظار تحویل خودرو" },
    // { value: "not_delivered", text: "سفر به شکل دستی لغو شد " },
    { value: "delivered", text: " در حال سفر" },
    { value: "returned", text: " پایان اجاره" }
  ]);

  const [status_id, setStatus_id] = useState([]);
  return (
    <>
      <label>وضعیت درخواست</label>
      <Checkbox
        initialValue={status_id}
        name="status"
        clearField={i => {
          setStatus_id(setStatus_id =>
            setStatus_id.filter(item => {
              return item !== i.value;
            })
          );
          props.filter_list(i.value, "remove");
        }}
        Select={i => {
          setStatus_id(setStatus_id => setStatus_id.concat(i.value));
          props.filter_list(i.value, "add");
        }}
        data={status}
      />
    </>
  );
};

interface IRequests_filter {
  filter_list: any;
}

export default Requests_filter;
