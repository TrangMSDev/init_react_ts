import React from 'react'
import { AppRouting } from '../models/router'

const HomePage = React.lazy(() => import('../pages/home/Home'))
const Login = React.lazy(() => import('../pages/auth/Login'))
const Register = React.lazy(() => import('../pages/auth/Register'))

const RouteConfig: AppRouting[] = [
  {
    path: '/',
    component: HomePage,
    layout: true,
    requiresAuth: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    layout: false,
    requiresAuth: false,
    children: []
  },
  {
    path: '/login',
    component: Login,
    layout: false,
    requiresAuth: false,
    children: []
  },
]

export default RouteConfig