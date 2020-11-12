import React from "react";

const user_context = React.createContext({
  update_user_data: (v) => {},
  user_data: null,
});

export default user_context;
