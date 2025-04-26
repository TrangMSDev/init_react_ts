import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteConfig from './RouteConfig';
import Layout from '../layouts/Layout';
import PrivateRoute from './PrivateRouter';
import { AppRouting } from '../models/router';

const renderRoutes = (routes: AppRouting[]) => {
  return routes.map((route, index) => {
    const Pages = route.component;

    return (
      <Route
        key={index}
        path={route.path}
        element={
          route.layout ? (
            <Layout>
              {route.requiresAuth ? (
                <PrivateRoute element={<Pages />} />
              ) : (
                <Pages />
              )}
            </Layout>
          ) : (
            route.requiresAuth ? (
              <PrivateRoute element={<Pages />} />
            ) : (
              <Pages />
            )
          )
        }
      >
        {/* Đệ quy render các route con */}
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
};

const RootRouter: React.FC = () => {
  
  
  return (
    <>
      <Routes>
        {renderRoutes(RouteConfig)}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
};

export default RootRouter;