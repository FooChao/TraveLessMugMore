import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import CreditsPage from './pages/CreditsPage';
import CustomPage from './pages/CustomPage';
import ToolsPage from './pages/ToolsPage';

let CustomList;

if (localStorage.getItem('CustomList') === null) {
  CustomList = {
    schoolStart: 10,
    eatLunch: 'true',
    lunchStart: 12,
    lunchEnd: 16,
    travel: 'true',
    year: '2023-2024',
    semester: '2'
  };
} else {
  CustomList = JSON.parse(localStorage.getItem('CustomList'));
}

let LessonsList;
if (localStorage.getItem('LessonsList') === null) {
  LessonsList = [];
} else {
  LessonsList = JSON.parse(localStorage.getItem('LessonsList'));
}

let TimetableSummary;
if (localStorage.getItem('TimetableSummary') === null) {
  TimetableSummary = [[
    'Live', 'TravelBack', 'JoinAny', 'JoinAny', 'Lunch', 'Lunch', 'Live', 'TravelBackLunch', 'Live', 'Live', 'TravelOut', 'Stacked', undefined,
    undefined, undefined, undefined, undefined, 'TravelFromLunch', 'Lunch', 'Lunch', 'TravelBackLunch', 'Recorded', 'Recorded', undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined
  ]];
} else {
  TimetableSummary = JSON.parse(localStorage.getItem('TimetableSummary'));
}

let TimetableDetailed;
if (localStorage.getItem('TimetableDetailed') === null) {
  TimetableDetailed = [[
    ['ACC1701X', 'Tutorial', 'EXT'], undefined, ['CS2103T', 'Tutorial', 'COM'], ['CS2103T', 'Tutorial', 'COM'], undefined, undefined, ['ACC1701X', 'Tutorial', 'EXT'], undefined, ['CS2103T', 'Tutorial', 'COM'], ['CS2103T', 'Tutorial', 'COM'], undefined, [['ACC1701X', 'Tutorial', 'EXT'], ['CS2103T', 'Lecture', 'COM']], undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ['CS2103T', 'Lecture', 'COM'], ['CS2103T', 'Lecture', 'COM'], undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined
  ]];
} else {
  TimetableDetailed = JSON.parse(localStorage.getItem('TimetableDetailed'));
}


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

export {App as default, CustomList, LessonsList, TimetableDetailed, TimetableSummary};
