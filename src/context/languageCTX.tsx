import { Context, createContext, useState } from 'react';
import { supportedLanguages } from '../../utils/types';
import router, { useRouter } from 'next/router';
interface LanguageCTX {
  changingLanguage: (v: supportedLanguages) => void;
  activeLanguage: supportedLanguages;
}

const ChangeLanguageContext: Context<LanguageCTX> = createContext({
  changingLanguage: (v) => { },
  activeLanguage: null,
});

export const ChangeLanguageContextProvider = ({ children }) => {
  const router = useRouter()
  const [local, setLocal] = useState<supportedLanguages>(router.locale as supportedLanguages);

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
