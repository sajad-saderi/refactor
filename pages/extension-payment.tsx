import { NextSeo } from 'next-seo'
import Layout from '../src/Layout'
import language from "../public/languages/fa/paymentsucceed.json";
import SucceedPayment from "../src/components/succeed_payment";

const ExtensionPayment = () => {
    return (
        <Layout>
            <NextSeo
                title={language.next_seo.title}
                description={language.next_seo.description}
                openGraph={{
                    title: language.next_seo.title,
                    description: language.next_seo.description,
                }}
                twitter={{
                    handle: language.next_seo.handle,
                    site: language.next_seo.site,
                    cardType: language.next_seo.cardType,
                }}
            />
            <SucceedPayment language={language} extension />
        </Layout>
    )
}

export default ExtensionPayment