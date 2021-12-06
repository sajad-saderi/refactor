import { Context, createContext, useState } from 'react';
import { supportedLanguages } from '../../utils/types';

interface LanguageCTX {
  changingLanguage: (v: supportedLanguages) => void;
  activeLanguage: supportedLanguages;
}

const ChangeLanguageContext: Context<LanguageCTX> = createContext({
  changingLanguage: (v) => { },
  activeLanguage: null,
});

export const ChangeLanguageContextProvider = ({ children }) => {
  const [local, setLocal] = useState<supportedLanguages>('fa');

  const handelingChangeLanguage = (lan: supportedLanguages) => {
    setLocal(lan);
  };

  const context: LanguageCTX = {
    activeLanguage: local,
    changingLanguage: handelingChangeLanguage,
  };

  return (
    <ChangeLanguageContext.Provider value={context}>
      {children}
    </ChangeLanguageContext.Provider>
  );
};

export default ChangeLanguageContext;
