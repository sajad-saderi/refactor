import { NextSeo } from 'next-seo';
import Layout from '../src/Layout';
import SucceedPayment from '../src/components/succeed_payment';

const ExtensionPayment = ({ locale }) => {
	return (
		<Layout>
			<NextSeo
				title={locale.PAGE_HEADER.payment.successTitle}
				description={locale.PAGE_HEADER.payment.successTitle}
				openGraph={{
					title: locale.PAGE_HEADER.payment.successTitle,
					description: locale.PAGE_HEADER.payment.successTitle,
					site_name: locale.COMMON.site_name,
				}}
				twitter={{
					handle: locale.PAGE_HEADER.handle,
					site: locale.PAGE_HEADER.site,
					cardType: locale.PAGE_HEADER.cardType,
				}}
			/>
			<SucceedPayment language={locale} extension />
		</Layout>
	);
};

export default ExtensionPayment;
