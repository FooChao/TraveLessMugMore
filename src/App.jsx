import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import CreditsPage from './pages/CreditsPage';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element = {<HomePage/>}/>
      <Route path='/Tools' element = {<HomePage/>}/>
      <Route path='/Custom' element = {<HomePage/>}/>
      <Route path='/Credits' element = {<CreditsPage/>}/>
    </Route>
  )
  )

  return (
    <RouterProvider router={router} />
  )
};

export default App;
