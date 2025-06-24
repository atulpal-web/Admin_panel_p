import React, { lazy } from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))

//Admin
const UpdatePassword = lazy(() => import('./views/admin/UpdatePassword'));

//category
const createCategory = React.lazy(() => import('./views/category/CreateCategory'))
const viewCategory = React.lazy(() => import('./views/category/ViewCategory'))

// sub-category
const createSubCategory = lazy(() => import('./views/subCategory/CreateSubCategory'))
const viewSubCategory = lazy(() => import('./views/subCategory/ViewSubCategories'))

// product
const createProduct = lazy(() => import('./views/products/CreateProduct'))
const viewProduct = lazy(() => import('./views/products/ViewProducts'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/createCategory', name: 'Create', element: createCategory },
  { path: '/viewCategory', name: 'View', element: viewCategory },
  { path: '/createSubCategory', name: 'Create Sub Category', element: createSubCategory },
  { path: '/viewSubCategory', name: 'View Sub Category', element: viewSubCategory },
  //update
  { path: '/createSubCategory/:id?', name: 'Create Sub Category', element: createSubCategory },
  { path: '/createProduct', name: 'Create Product', element: createProduct },
  { path: '/viewProduct', name: 'View Product', element: viewProduct },
  //update
  { path: '/createProduct/:id?', name: 'Create Product', element: createProduct },
  { path: '/base/update-password', name: 'Update Password', element: UpdatePassword }
  
]

export default routes
