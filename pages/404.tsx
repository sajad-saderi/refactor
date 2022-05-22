import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import image404 from '../public/image/404.png';
import styles from '../src/styles/pagesStyle/400.module.scss';
import { ILocale } from '../types';
import { pageViewDataLayer } from '../utils/dataLayer';
import { PageHeadBuilder } from '../src/components/pageHeadBuilder/pageHeadBuilder';
import Layout from '../src/Layout';

const _404 = ({ locale }: ILocale) => {
  useEffect(() => {
    pageViewDataLayer({
      pageURL: window.location.href,
      pagePath: '/404',
      pageTitle: locale.PAGE_HEADER._404.title
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <PageHeadBuilder
        title={locale.PAGE_HEADER._404.title}
        description={locale.PAGE_HEADER._404.description}
      />
      <article className={classNames('responsive', styles.container)}>
        <div className={styles.imageContainer}>
          <Image src={image404} alt='404 Image' className={styles.image} />
        </div>
        <div className={styles.buttonContainer}>
          <Link href='/' prefetch={false}>
            <a className={classNames('actionButton', styles.backHome)}>
              {locale.COMMON.backToHome}
            </a>
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default _404;
