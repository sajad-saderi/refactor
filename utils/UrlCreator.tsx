const UrlCreator = (data: Idata) => {
  let query = "?";
  let asPath = null;
  let paramData = {};
  for (const [key, value] of Object.entries(data.query)) {
    if (value == 0) {
      continue;
    }
    paramData[key] = value;
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
    query: paramData,
  });
};

interface Idata {
  query: any;
  route: string;
  cb: any;
}
export default UrlCreator;
