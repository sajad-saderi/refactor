import React from "react";

const modalContent = React.createContext({
  show_modal: false,
  modalHandler: (v) => {
    console.log(v);
    
    // type: "Login" | "TellMe" 
  }
});

export default modalContent;
