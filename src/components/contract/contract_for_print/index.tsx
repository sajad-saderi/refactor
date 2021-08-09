import { useState, useRef, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { GET_ORDER_REQUEST } from "../../../API";
const Generate_pdf = dynamic(() => import("../generate_pdf"), { ssr: false });
import language from "../../../../public/languages/fa/contract.json";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import context_user from "../../../context/User_info";
import { guard_controller } from "../../../../utils/guard_controller";
import Contract_text from "../contract_text";

let token = jsCookie.get("token");
const Contract = ({ unique_id }: IContract) => {
  const [show_download, set_show_download] = useState(false);
  const [result, setResult] = useState(null);

  const user_info = useContext(context_user);
  const router = useRouter();
  const html_ref = useRef(null);

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/evaluation",
      pageTitle: language.next_seo.title,
    });
  }, []);

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
      let data = unique_id ? { unique_id: id } : { id };
      const res: any = await GET_ORDER_REQUEST({
        ...data,
        token,
      });
      setResult(res.data);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  return result ? (
    <div className="contract_container" style={{ padding: "10px" }}>
      <div className="download_section">
        <Generate_pdf
          html={html_ref}
          width={window.innerWidth}
          contractNumber={result.id}
        />
      </div>
      <Contract_text inline_style={true} html_ref={html_ref} result={result} />
    </div>
  ) : null;
};

interface IContract {
  unique_id?: boolean;
}

export default Contract;
