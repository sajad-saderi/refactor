import React, { useEffect } from 'react';
// import Layout from '../src/Layout';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import image500 from '../public/image/500.png';
import { ILocale } from '../types';
import { pageViewDataLayer } from '../utils/dataLayer';
import { PageHeadBuilder } from '../src/components/pageHeadBuilder/pageHeadBuilder';
import styles from '../src/styles/pagesStyle/500.module.scss';
import { addingCountryCodeToNumber } from '../utils/common';
import Layout from '../src/Layout';

const _500 = ({ locale }: ILocale) => {
  useEffect(() => {
    pageViewDataLayer({
      pageURL: window.location.href,
      pagePath: '/500',
      pageTitle: locale.PAGE_HEADER._404.title
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <PageHeadBuilder
        title={locale.PAGE_HEADER._500.title}
        description={locale.PAGE_HEADER._500.title}
      />
      <article className={cn('responsive', styles.container)}>
        <div className={styles.imageContainer}>
          <Image src={image500} alt={locale.PAGE_HEADER._500.title} />
        </div>
        <span className={styles.imageCaption}>{locale._500_PAGE.span}</span>
        <p className={styles.contactInformation}>{locale._500_PAGE.p1}</p>
        <br />
        <a
          className={styles.contactNumber}
          href={`tel:${addingCountryCodeToNumber(locale.COMMON.number1)}`}>
          {locale.COMMON.number1}
        </a>
        <br />
        <div className={styles.buttonContainer}>
          <Link href='/' prefetch={false}>
            <a className={cn('actionButton', styles.backHome)}>
              {locale.COMMON.backToHome}
            </a>
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default _500;
