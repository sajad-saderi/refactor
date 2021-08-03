import React from "react";

const modalContent = React.createContext({
  show_modal: false,
  id: null,
  modalHandler: (v, data) => {
    // "Login" |"TellMe" |"Renter" |"Owner" |"Law"
  },
  confirm_id: (id) => {},
});

export default modalContent;
