import { createInertiaApp } from '@inertiajs/react'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '../layouts/Application'
import DashboardLayout from '../layouts/Dashboard'

createInertiaApp({
  // Set default page title
  // see https://inertia-rails.netlify.app/guide/title-and-meta
  //
  // title: title => title ? `${title} - App` : 'App',

  // Disable progress bar
  //
  // see https://inertia-rails.netlify.app/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.jsx', { eager: true })
    let page = pages[`../pages/${name}.jsx`]
    page.default.layout =
      page.default.layout || ((page) => createElement(name.startsWith("User") || name.startsWith("LandingPage") ? Layout : DashboardLayout, {children: page}))
    return page

    // To use a default layout, import the Layout component
    // and use the following lines.
    // see https://inertia-rails.netlify.app/guide/pages#default-layouts
    //
    // const page = pages[`../pages/${name}.jsx`]
    // page.default.layout ||= (page) => createElement(Layout, null, page)
    // return page
  },

  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(createElement(App, props))
    // hydrateRoot(el, createElement(App, props)) 
  },
})
