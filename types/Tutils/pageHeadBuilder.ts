export interface IPageHeadBuilder {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string | null;
  canonical?: string;
  noIndex?: boolean;
}

export interface IPageViewDataLayer {
  pageURL: string;
  pagePath: string;
  pageTitle: string;
  searchedLocation?: string;
}
