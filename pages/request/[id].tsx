import { useEffect } from 'react';
import Layout from '../../src/Layout';
import Request_page from '../../src/containers/Request_page';
import { GetServerSideProps, NextPage } from 'next';
import { ILocale } from '../../types';
import { PageHeadBuilder } from '../../src/components/pageHeadBuilder/pageHeadBuilder';
import { pageViewDataLayer } from '../../utils/dataLayer';

const Request: NextPage<{ locale: ILocale; id: string }> = ({ locale, id }) => {
  useEffect(() => {
    pageViewDataLayer({
      pageURL: window.location.href,
      pagePath: '/request',
      pageTitle: locale.PAGE_HEADER.request.title
    });
  }, []);

  return (
    <Layout>
      <PageHeadBuilder
        title={locale.PAGE_HEADER.request.title}
        description={locale.PAGE_HEADER.request.description}
      />
      <Request_page language={locale} id={id} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { id: query.id } };
};

export default Request;
