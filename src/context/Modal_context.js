import React from "react";

const modalContent = React.createContext({
  show_modal: false,
  modalHandler: (v) => {}
});

export default modalContent;
