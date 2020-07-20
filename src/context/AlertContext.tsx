// import React, { useReducer, useContext } from 'react';
// import { IAlert } from '../types/AlertContextInterface';

// export const AlertStateContext = React.createContext({});

// const initialState: IAlert = { bgColor: "", message: "", time: 3500 };

// interface IAction {
//     payload: IAlert;
//     type: string;
// }

// const reducer: React.Reducer<{}, IAction> = (state, action) => {
//     switch (action.type) {
//         case 'showAlert':
//             return {
//                 isAuthenticated: true,
//             };
//         case 'removeAlert':
//             return {
//                 isAuthenticated: initialState.isAuthenticated,
//             };
//         default:
//             throw new Error(`Unhandled action type: ${action.type}`);
//     }
// };

// export const AlertProvider = ({ children }: any) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     return (
//         <AlertStateContext.Provider value={[state, dispatch]}>
//             {children}
//         </AlertStateContext.Provider>
//     );
// };

// // useContext hook - export here to keep code for global auth state
// // together in this file, allowing user info to be accessed and updated
// // in any functional component using the hook
// export const useAlert: any = () => useContext(AlertStateContext);
