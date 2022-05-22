import Head from 'next/head';
import { IPageHeadBuilder } from '../../../types';
export const PageHeadBuilder = ({
  title,
  description,
  imageUrl,
  canonical
}: IPageHeadBuilder) => (
  <Head>
    <title>{title}</title>
    <meta name='description' content={description} />
    <meta property='og:title' content={title} />
    <meta property='og:site_name' content='Sepris' />
    <meta property='og:url' content='https://sepris.com/' />
    <meta property='og:description' content={description} />
    <meta property='og:type' content='website' />
    <meta
      property='og:image'
      content={
        imageUrl ? imageUrl : 'https://core.sepris.com/media/Sepris-Logo.png'
      }
    />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:site' content='@seprisrent' />
    <meta name='twitter:title' content='سپریس | اجاره آسان خودرو' />
    <meta name='twitter:description' content={description} />
    <meta
      name='twitter:image'
      content='https://core.sepris.com/media/Sepris-Logo.png'
    />
    {canonical && <link rel='canonical' href={canonical} />}
  </Head>
);
