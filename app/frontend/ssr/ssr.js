import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import React from 'react'

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.jsx', { eager: true })
      return pages[`../pages/${name}.jsx`]
    },
    setup: ({ App, props }) => React.createElement(App, props),
  }),
)
