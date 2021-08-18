import React, {createContext} from "react";
import useTheme from "../hooks/useTheme";
//construimos un React Context
/* Debemos asignar datos al contexto y al mismo tiempo
 especificar cuales de nuestros componentes secundarios 
 deberian tener acceso a estos datos, esto se realiza envolviendo
 los componentes que queremos que tengan acceso a nuestro contexto 
 con el componente react, que siempre sera el proveedor de puntos
 de nombre de contexto o en nuestro caso envolvemos todo nuestro return con el
 Asignamos a nuestro contexto el valor de los datos que queremos asociar con el
*/
export const ThemeContext = createContext();


function ThemeProvider({ children, startingTheme }) {

    const {theme, setTheme}
        useTheme(startingTheme)

    return(
        <ThemeContext.Provider value={{setTheme, theme}}>
            {children}
        </ThemeContext.Provider>

    )
}
export {ThemeProvider};