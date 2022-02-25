import React, {createContext, useState} from "react";

export const GlobalContext = createContext({inView: false, id: undefined});

export const GlobalStore = ({children}) => {
  const [state, setState] = useState({
    inView: false,
    id: undefined
  })

  return (
    <GlobalContext.Provider value={{state, setState}}>
      {children}
    </GlobalContext.Provider>
  )
}
