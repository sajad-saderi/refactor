import React, { useState, useEffect, useContext } from "react";
import Button from "../../src/components/form/Button";
import TextInput from "../../src/components/form/TextInput";
import { guard_controller } from "../../utils/guard_controller";
import { useRouter } from "next/router";
import context_user from "../../src/context/User_info";
import jsCookie from "js-cookie";
import { GET_ORDER_REQUEST } from "../../src/API";
import Layout from "../../src/Layout";
import { NextSeo } from "next-seo";

let token = jsCookie.get("token");

const Contract_preview_page = () => {
  const [unique_id, set_unique_id] = useState("");
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState({
    status: false,
    message: "",
  });
  const user_info = useContext(context_user);
  const router = useRouter();

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== "auth") {
      router.push(`/${guard}`);
      return;
    }
    if (user_info.data) {
      if (window["auth"] && user_info.data?.first_name) {
        if (user_info.data.first_name) {
        }
      } else {
        if (
          router.asPath !== "/login" &&
          router.asPath !== "/complete-register"
        )
          localStorage["last_location"] = router.asPath;
        else {
          localStorage["last_location"] = "/";
        }
        router.push("/login");
      }
    }
  }, [user_info]);

  const fetchAPI = async (unique_id) => {
    set_error({
      status: false,
      message: "",
    });
    token = jsCookie.get("token");
    try {
      const res: any = await GET_ORDER_REQUEST({
        unique_id,
        token,
      });
      router.push(`/contract-preview/${unique_id}`);
    } catch (error) {
      set_loading(false);
      if (error.response) {
        set_error({ status: true, message: error.response.data.message });
      } else set_error({ status: true, message: error });
    }
  };

  return (
    <Layout>
      <NextSeo
        title="جستجو قرارداد | سپریس"
        description="جستجو قرارداد | سپریس"
        openGraph={{
          title: "جستجو قرارداد | سپریس",
          description: "جستجو قرارداد | سپریس",
        }}
      />
      <div className="Please_login_container minHeight">
        <div className="modal_box">
          <TextInput
            name="id"
            onChangeHandler={(e) => {
              set_unique_id(e);
            }}
            clearField={() => {}}
            autoFocus={false}
            error={error}
            value={unique_id}
            label="شماره اختصاصی قرارداد را وارد کنید:"
            validation={{
              required: true,
            }}
          />
          <Button
            class="Blue_BTN login_submit"
            value="تایید"
            loading={loading}
            click={() => {
              set_loading(true);
              fetchAPI(unique_id);
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Contract_preview_page;
