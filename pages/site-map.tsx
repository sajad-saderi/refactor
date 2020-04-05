import React, { useEffect, useState } from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { REQUEST_GET_URLS_FOR_SITE_MAP } from "../src/API";

const Site_map = () => {
  const [UrlList, UrlSetter] = useState([]);

  const fetchAPIs = async () => {
    const res: any = await REQUEST_GET_URLS_FOR_SITE_MAP();
    UrlSetter(res.items);
  };

  useEffect(() => {
    fetchAPIs();
  }, []);

  return (
    <Layout>
      <NextSeo
        title="Otoli | site map"
        description="Otoli | site map"
        openGraph={{
          title: "Otoli | site map",
          description: "Otoli | site map",
          site_name: "Otoli",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <article className="responsive static_pages minHeight site_map_page">
        {UrlList.length > 0 && (
          <ul>
            {UrlList.map((i) => {
              return (
                <li style={{ margin: "5px 0" }}>
                  <Link href="/rent/[id]" as={`/rent/${i.unique_id}`}>
                    <a>{i.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </article>
    </Layout>
  );
};

export default Site_map;
