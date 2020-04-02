import React from "react";

const modalContent = React.createContext({
  show_modal: false,
  modalHandler: (v, data) => {

    // type: "Login" | "TellMe"
  }
});

export default modalContent;
