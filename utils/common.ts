export const addingCountryCodeToNumber = (str: string): string =>
  `+98${str.trim().slice(1)}`;

export const isEmptyObject = (object: {}) => {
  for (let i in object) {
    return true;
  }
  return false;
};

export const getUrlQueryParams = (paramsString: string) =>
  new Proxy(new URLSearchParams(paramsString), {
    get: (searchParams, prop) => searchParams.get(prop as string)
  });
