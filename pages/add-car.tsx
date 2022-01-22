import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Add_car = dynamic(() => import('../src/containers/Add_car'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Router from 'next/router';
// import Add_car from "../src/containers/Add_car";

const AddCar = ({ edit, locale }) => {
  useEffect(() => {
    if (window['auth']) {
      // const edit = router.
      // window['dataLayer'].push({
      //   event: 'page_view',
      //   pageURL: window.location.href,
      //   pagePath: '/add-car',
      //   pageTitle: edit
      //     ? locale.PAGE_HEADER.addCar.editTitle
      //     : locale.PAGE_HEADER.addCar.title,
      // });
    } else {
      Router.push('/login');
    }
  }, []);
  return (
    <Layout LinkControl={true}>
      <NextSeo
        title={
          edit
            ? locale.PAGE_HEADER.addCar.editTitle
            : locale.PAGE_HEADER.addCar.title
        }
        description={locale.PAGE_HEADER.addCar.description}
        openGraph={{
          title: edit
            ? locale.PAGE_HEADER.addCar.editTitle
            : locale.PAGE_HEADER.addCar.title,
          description: locale.PAGE_HEADER.addCar.description,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <Add_car language={locale} />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  try {
    return {
      props: {
        edit: props.query?.mode === 'edit' ? true : false,
      },
    };
  } catch (error) {
    return {
      props: {
        edit: false,
      },
    };
  }
}

export default AddCar;
