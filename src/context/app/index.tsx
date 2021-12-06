import { useState, createContext } from 'react'
import { IAppStore, ICalender, ILocation, supportedLanguages } from '../../../types'


const globalStore: IAppStore = {
    activeLanguage: 'fa', date: {
        from: {
            fa: { dump: null, name: '' },
            en: { dump: null, name: '' }
        },
        to: {
            fa: { dump: null, name: '' },
            en: { dump: null, name: '' }
        }
    }
    , location: { id: 1, fa: 'تهران', en: 'tehran' }
}

const AppStore = createContext({
    store: globalStore,
    setLocation: (data) => { },
    setDate: (data: ICalender) => { },
    changingLanguage: (data: supportedLanguages) => { }

})

export const AppStoreWrapper = ({ children }) => {

    const [store, setStore] = useState(globalStore)


    const context = {
        store: store,
        setLocation: ({ value, text, en }) => setStore((store) => ({ ...store, location: { id: value, fa: text, en: en } })),
        setDate: (data) => setStore((store) => ({ ...store, date: data })),
        changingLanguage: (lan) => setStore((store) => ({ ...store, activeLanguage: lan })),
    }

    return (
        <AppStore.Provider value={context}>
            {children}
        </AppStore.Provider>
    )
}

export default AppStore

