const UrlCreator = (data: Idata) => {
  let query = "?";
  let asPath = null;

  for (const [key, value] of Object.entries(data.query)) {
    if (value == 0) {
      continue;
    }
    if (query === "?") query += `${key}=${value}`;
    else query += `&${key}=${value}`;
  }
  if (data.query.id) {
    asPath = data.route.replace(/\[id\]/gi, data.query.id);
  }

  data.cb({
    pathname: data.route,
    queryString: query,
    asPath,
    query: data.query,
  });
};

interface Idata {
  query: any;
  route: string;
  cb: any;
}
export default UrlCreator;
