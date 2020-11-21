const UrlCreator = (data: Idata) => {
  let query = "?";  
  for (const [key, value] of Object.entries(data.query)) {
    if (value == 0) {
      continue;
    }
    query += `&${key}=${value}`;
  }

  data.cb(data.route + query);
};

interface Idata {
  query: any;
  route: string;
  cb: any;
}
export default UrlCreator;
