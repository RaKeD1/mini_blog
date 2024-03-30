import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import {StateSchema} from "./StateSchema";
import {createReduxStore} from "./store";

interface StoreProviderProps{
    children?:ReactNode;
    initialState?:StateSchema;
    asyncReducers?: ReducersMapObject<StateSchema>
}

export const StoreProvider = ({ children, initialState }:StoreProviderProps) => {
    const store = createReduxStore(
        initialState as StateSchema,
    );
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
export default StoreProvider;
export {}
