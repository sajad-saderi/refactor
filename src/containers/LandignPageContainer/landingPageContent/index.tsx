import React from "react";
// import "./landingPageContent.scss";

const Landing_Page_Content = (props: ILanding_Page_Content) => {
  return (
    <article className="responsive landing_dynamic_content">
      <section
        className="Landing_content"
        dangerouslySetInnerHTML={{ __html: `${props.data.content}` }}
      ></section>
      {props.data.link_set.length > 0 && (
        <div className="Landing_Links">
          <h3>لینک های مرتبط</h3>
          <ul>
            {props.data.link_set.map((item) => {
              return (
                <li>
                  <a className="HEAP_LandingPages_Link_RelatedLinks" href={item.url}>{item.name}</a>
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
}
export default Landing_Page_Content;
