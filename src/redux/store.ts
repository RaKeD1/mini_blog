import {configureStore, ReducersMapObject} from '@reduxjs/toolkit';
import {StateSchema} from './StateSchema';
import {postsReducer} from "../entities/Posts/slice/allPostsSlice";
import {postReducer} from "../entities/Post/slice/postSlice";

export function createReduxStore(initialState: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        posts: postsReducer,
        post: postReducer,
    };
    return configureStore<StateSchema>({
        reducer: rootReducer,
        devTools: true,
        preloadedState: initialState,
    });
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']