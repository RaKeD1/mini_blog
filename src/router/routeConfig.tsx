import { RouteProps } from 'react-router-dom';
import MainPage from "../pages/MainPage/MainPage";
import NotFoundPage from "../pages/NotFoundPage/NotFountPage";
import {PostPage} from "../pages/PostPage/PostPage";


export enum AppRoutes {
    MAIN = 'posts',
    POST = 'post',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.POST]: '/post/*',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
        [AppRoutes.MAIN]: {
            path: RoutePath.posts,
            element:
                <MainPage />
    },

    [AppRoutes.POST]: {
        path: RoutePath.post,
        element: <PostPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
    };
