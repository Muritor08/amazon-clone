import React, {createContext,useContext, useReducer} from 'react';


//prepares data layer
export const StateContext = createContext();


//wraps our app and provide data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

//pulls information from data layer
export const useStateValue = () => useContext(StateContext);