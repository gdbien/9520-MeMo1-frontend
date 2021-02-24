import React, { useState } from 'react'
import { createContext } from 'react'

export const ContextoTareas = createContext();

export const ProveedorTareas = ({children}) => {
   
   const [dataNueva, setDataNueva] = useState(null);
 
   return (
        <ContextoTareas.Provider value={{
            dataNueva,
            setDataNueva
        }}>
            {children}
        </ContextoTareas.Provider>
    )
}