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
        "path": "/knp",
        "exact": true,
        "component": require('../knp.js').default
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
        "component": () => React.createElement(require('C:/Users/姚磊/AppData/Roaming/npm/node_modules/umi/node_modules/_umi-build-dev@1.2.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('C:/Users/姚磊/AppData/Roaming/npm/node_modules/umi/node_modules/_umi-build-dev@1.2.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
