import { IPageViewDataLayer } from "../types";  

export const pageViewDataLayer = ({
  pageURL,
  pagePath,
  pageTitle,
  searchedLocation
}: IPageViewDataLayer) => {
  if (window?.dataLayer)
    window.dataLayer.push({
      event: 'page_view',
      pageURL,
      pagePath,
      pageTitle,
      searchedLocation
    });
};
