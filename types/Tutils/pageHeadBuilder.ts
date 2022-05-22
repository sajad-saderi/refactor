export interface IPageHeadBuilder {
  title: string;
  description: string;
  imageUrl?: string;
  canonical?: string;
}

export interface IPageViewDataLayer {
  pageURL: string;
  pagePath: string;
  pageTitle: string;
  searchedLocation?: string;
}
