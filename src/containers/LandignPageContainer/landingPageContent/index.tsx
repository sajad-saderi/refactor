import Link from "next/link";
// import "./landingPageContent.scss";

const Landing_Page_Content = ({ data, language }: ILanding_Page_Content) => {
  return (
    <article className='responsive landing_dynamic_content'>
      <section
        className='Landing_content'
        dangerouslySetInnerHTML={{ __html: `${data.content}` }}
      ></section>
      {data.link_set.length > 0 && (
        <div className='Landing_Links'>
          <h3>{language.COMMON.relativeLinks}</h3>
          <ul>
            {data.link_set.map((item) => {
              let id = item.url.split("/").pop();
              return (
                <li key={item.name}>
                  {id === "rent" ? (
                    <Link href='/rent' prefetch={false}>
                      <a
                        className='HEAP_LandingPages_Link_RelatedLinks'
                        href={item.url}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: "/rent/[id]",
                        query: {
                          id: id,
                        },
                      }}
                      as={`/rent/${id}`}
                      prefetch={false}
                    >
                      <a className='HEAP_LandingPages_Link_RelatedLinks'>
                        {item.name}
                      </a>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
};

interface ILanding_Page_Content {
  data: any;
  language: any;
}
export default Landing_Page_Content;
