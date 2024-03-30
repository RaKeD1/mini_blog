import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLoader from "../widgets/PageLoader/PageLoader";
import {routeConfig} from "./routeConfig";

const AppRouter = () => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {Object.values(routeConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={<div className="page-wrapper">{element}</div>}
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;