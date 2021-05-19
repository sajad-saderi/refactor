import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../../src/Layout"));
// import Layout from "../../src/Layout";
import language from "../../public/languages/fa/user.json";
// import { logPageView } from "../../utils/analytics";

const Profile_container = dynamic(() =>
  import("../../src/containers/Profile_container")
);
const Profile = () => {
  // React.useEffect(() => {
  //   window["dataLayer"].push({
  //     event: "page_view",
  //     pageURL: window.location.href,
  //     pagePath: "/user",
  //     pageTitle: language.next_seo.title,
  //   });
  //   // logPageView();
  // }, []);
  return (
    <Layout>
      <Profile_container language={language} />
    </Layout>
  );
};

export default Profile;
