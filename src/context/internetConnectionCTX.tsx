import { createContext, useState } from "react";

const InternetConnectionContext = createContext({
  showInternetConnectionNotification: false,
  toggleTheContainer: (value) => {},
});

export const InternetConnectionContextProvider = (props) => {
  const [toggle, setToggle] = useState(false);

  const toggleTheContainerHandler = (v) => {
    setToggle(v);
  };

  const context = {
    showInternetConnectionNotification: toggle,
    toggleTheContainer: toggleTheContainerHandler,
  };

  return (
    <InternetConnectionContext.Provider value={context}>
      {props.children}
    </InternetConnectionContext.Provider>
  );
};

export default InternetConnectionContext;
