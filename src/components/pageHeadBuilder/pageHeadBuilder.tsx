import Head from 'next/head';
import { IPageHeadBuilder } from '../../../types';
export const PageHeadBuilder = ({
  title,
  url,
  description,
  imageUrl,
  canonical,
  noIndex
}: IPageHeadBuilder) => {
  console.log({ title, description, imageUrl, canonical, noIndex });
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content='Sepris' />
      <meta property='og:url' content={'https://sepris.com/' + url} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta
        property='og:image'
        content={
          imageUrl ? imageUrl : 'https://core.sepris.com/media/Sepris-Logo.png'
        }
      />
      <meta
        property='og:image:url'
        content={
          imageUrl ? imageUrl : 'https://core.sepris.com/media/Sepris-Logo.png'
        }
      />
      <meta
        property='og:image:secure_url'
        content={
          imageUrl ? imageUrl : 'https://core.sepris.com/media/Sepris-Logo.png'
        }
      />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:alt' content={'https://sepris.com/' + url} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@seprisrent' />
      <meta name='twitter:title' content='سپریس | اجاره آسان خودرو' />
      <meta name='twitter:description' content={description} />
      <meta
        name='twitter:image'
        content={
          imageUrl ? imageUrl : 'https://core.sepris.com/media/Sepris-Logo.png'
        }
      />
      {canonical && <link rel='canonical' href={canonical} />}
      {noIndex && (
        <>
          <meta name='robots' content='noindex,follow' />
          <meta name='googlebot' content='noindex,follow' />
        </>
      )}
    </Head>
  );
};
