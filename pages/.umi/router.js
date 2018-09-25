import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/info",
        "exact": true,
        "component": require('../info.js').default
      },
      {
        "path": "/learn",
        "exact": true,
        "component": require('../learn.js').default
      },
      {
        "path": "/msg",
        "exact": true,
        "component": require('../msg.js').default
      },
      {
        "path": "/page",
        "exact": true,
        "component": require('../page.js').default
      },
      {
        "path": "/profile",
        "exact": true,
        "component": require('../profile.js').default
      },
      {
        "path": "/weixin",
        "exact": true,
        "component": require('../weixin.js').default
      },
      {
        "component": () => React.createElement(require('C:/Users/25459/AppData/Roaming/npm/node_modules/umi/node_modules/_umi-build-dev@0.20.5@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', routes: '[{"path":"/","component":"./layouts\\\\index.js","routes":[{"path":"/","exact":true,"component":"./pages/index.js"},{"path":"/info","exact":true,"component":"./pages/info.js"},{"path":"/learn","exact":true,"component":"./pages/learn.js"},{"path":"/msg","exact":true,"component":"./pages/msg.js"},{"path":"/page","exact":true,"component":"./pages/page.js"},{"path":"/profile","exact":true,"component":"./pages/profile.js"},{"path":"/weixin","exact":true,"component":"./pages/weixin.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
