import React from "react";
import Layout from "../../src/Layout";
import Profile_container from "../../src/containers/Profile_container";
import language from "../../public/languages/fa/user.json";
import { logPageView } from "../../utils/analytics";

const Profile = () => {
  React.useEffect(() => {
    logPageView();
  }, []);
  return (
    <Layout>
      <Profile_container language={language} />
    </Layout>
  );
};

export default Profile;
