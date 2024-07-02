import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import CreditsPage from './pages/CreditsPage';
import CustomPage from './pages/CustomPage';
import ToolsPage from './pages/ToolsPage';

let CustomList = {
  schoolStart: 10,
  eatLunch: true,
  lunchStart: 12,
  lunchEnd : 16,
  travel : true
};
let LessonsList = [];



//console.log(CustomList );




const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element = {<HomePage/>}/>
      <Route path='/Tools' element = {<ToolsPage/>}/>
      <Route path='/Custom' element = {<CustomPage/>}/>
      <Route path='/Credits' element = {<CreditsPage/>}/>
    </Route>
  )
  )

  return (
    <RouterProvider router={router} />
  )
};

export {App as default, CustomList, LessonsList};
