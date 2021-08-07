import { NextSeo } from "next-seo";
import Contract from "../src/components/contract/contract_for_print";

const Contract_Page = () => {
  // useEffect(() => {
  //   window["dataLayer"].push({
  //     event: "page_view",
  //     pageURL: window.location.href,
  //     pagePath: "/faq",
  //     pageTitle: language.next_seo.title,
  //   });
  //   // logPageView();
  //   fetchAPI();
  // }, []);
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
      <Contract />
    </>
  );
};

export default Contract_Page;
