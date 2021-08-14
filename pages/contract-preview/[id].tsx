import { useState, useEffect, useContext } from "react";
import { NextSeo } from "next-seo";
import Contract_content from "../../src/components/contract/contract-content";
import { GET_ORDER_REQUEST } from "../../src/API";
import jsCookie from "js-cookie";
import context_user from "../../src/context/User_info";
import { guard_controller } from "../../utils/guard_controller";
import { useRouter } from "next/router";

let token = jsCookie.get("token");
const Contract_Page = () => {
  const [result, setResult] = useState(null);
  const [fetchError, setFetchError] = useState(null);
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
          fetchAPI(router.query.id);
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

  const fetchAPI = async (id) => {
    token = jsCookie.get("token");

    try {
      let data = { unique_id: id };
      const res: any = await GET_ORDER_REQUEST({
        ...data,
        token,
      });
      setResult(res.data);
    } catch (error) {
      setFetchError(true);
      console.log("!Error", error);
    }
  };

  return (
    <>
      <NextSeo
        title="دانلود قرارد | سپریس"
        description="صفحه دانلود قرارداد"
        openGraph={{
          title: "دانلود قرارد | سپریس",
          description: "صفحه دانلود قرارداد",
        }}
      />
      {fetchError ? (
        <p>خطایی رخ داده است!</p>
      ) : (
        <Contract_content result={result} />
      )}
    </>
  );
};

export default Contract_Page;
