import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../../src/Layout"));
// import Layout from "../../src/Layout"; 
// import { logPageView } from "../../utils/analytics";

// const Profile_container = dynamic(() =>
//   import("../../src/containers/Profile_container")
// );
import Profile_container from "../../src/containers/Profile_container";
const Profile = ({ locale }) => {
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
      <Profile_container language={locale} />
    </Layout>
  );
};

export default Profile;
