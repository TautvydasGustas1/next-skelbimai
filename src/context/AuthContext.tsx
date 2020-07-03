import React, { useReducer, useContext, useEffect } from 'react';
import { IAuth } from '../types/AuthContextInterface';

export const AuthStateContext = React.createContext({});

const initialState: IAuth = { isAuthenticated: false };

interface IAction {
    payload: IAuth;
    type: string;
}

const reducer: React.Reducer<{}, IAction> = (state, action) => {
    switch (action.type) {
        case 'setAuth':
            return {
                isAuthenticated: true,
            };
        case 'logout':
            return {
                isAuthenticated: initialState.isAuthenticated,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const AuthProvider = ({ children }: any) => {
    let localState = null;
    if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('authInfo')
    ) {
        localState = JSON.parse(localStorage.getItem('authInfo') || '');
    }
    const [state, dispatch] = useReducer(reducer, localState || initialState);

    if (typeof localStorage !== 'undefined') {
        useEffect(() => {
            localStorage.setItem('authInfo', JSON.stringify(state));
        }, [state]);
    }

    return (
        <AuthStateContext.Provider value={[state, dispatch]}>
            {children}
        </AuthStateContext.Provider>
    );
};

// useContext hook - export here to keep code for global auth state
// together in this file, allowing user info to be accessed and updated
// in any functional component using the hook
export const useAuth: any = () => useContext(AuthStateContext);
