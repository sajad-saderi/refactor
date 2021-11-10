import { useState, createContext } from 'react'

const AppStore = createContext({
    location: 1,
    setLocation: (id) => { },
})

export const AppStoreWrapper = ({ children }) => {

    const [location, setLocation] = useState<number>(1)

    const context = {
        location,
        setLocation: (id) => setLocation(id),
    }
    return (
        <AppStore.Provider value={context}>
            {children}
        </AppStore.Provider>
    )
}

export default AppStore

