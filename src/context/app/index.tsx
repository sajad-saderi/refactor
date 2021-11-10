import { useState, createContext } from 'react'
import { IAppStore } from '../../../types'

const AppStore = createContext({
    store: { location: { id: 1, fa: 'تهران', en: 'tehran' } },
    setLocation: (data) => { },
})

export const AppStoreWrapper = ({ children }) => {

    const [store, setStore] = useState<IAppStore>({ location: { id: 1, fa: 'تهران', en: 'tehran' } })

    const context = {
        store: store,
        setLocation: ({ value, text, en }) => setStore((store) => ({ ...store, location: { id: value, fa: text, en: en } }))
    }

    return (
        <AppStore.Provider value={context}>
            {children}
        </AppStore.Provider>
    )
}

export default AppStore

