import React, { useState } from "react";

// import "./TabCreator.scss";
import Link from "next/link";
import Icon from "../Icons";

const TabCreator = (props: ITabCreator) => {
  const [active, setActive] = useState(null);
  const [showTabContent, setShowTabContent] = useState(false);

  const TabClick = (i) => {
    // set the active tab
    setActive(i);
    setShowTabContent(true);
  };

  const { data_arr } = props;

  return (
    <div className="Tab_Accordion">
      <div>
        <section>
          <div className="Tab_father">
            {data_arr.map((item, i) => {
              return (
                <span
                  key={i}
                  onClick={() => TabClick(i)}
                  className={i === active ? "active_tab" : ""}
                >
                  <span className={active === i ? "rotateIcon" : ""}>
                    {item.title}
                    <Icon
                      color="#7d7d7d"
                      name="chevronUp"
                      width="20px"
                      height="20px"
                    />
                  </span>
                </span>
              );
            })}
          </div>
        </section>
      </div>
      <div>
        <section
          className={[
            "content_part_accordion",
            !showTabContent ? "hidebox" : "",
          ].join(" ")}
        >
          {data_arr.map((item, i) => {
            return (
              <ul key={i} className={i === active ? "active_tab" : ""}>
                {item.links.map((i, index) => {
                  return (
                    <li key={index}>
                      {/* to change the route and don't give any 404 error before push */}
                      <Link href="/rent/[id]" as={i.link} prefetch={false}>
                        <a>{i.title}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </section>
      </div>
    </div>
  );
};

interface ITabCreator {
  data_arr: any;
}
export default TabCreator;
