import React from "react";

const toast_context = React.createContext({
  show_toast: false,
  toast_option: (v) => {},
});

export default toast_context;
