import React from 'react'
//import { useState } from 'react';
import { LessonsList } from '../App';
import ModuleLessonType from './ModuleLessonType';
import { lessonRefresher } from '../pages/ToolsPage';

const Module = ({lesson}) => {
    //console.log(lesson)


    //console.log(lesson.moduleCode);
    //const [deleted, setDeleted] = useState(false);
    const deleteIt = () => {
      //setDeleted(true);

      //remove it from lessonList
      for (let i = LessonsList.length - 1; i >= 0; i--) {
        if (LessonsList[i].moduleCode === lesson.moduleCode) {
          LessonsList.splice(i,1);
        }
      }

      localStorage.setItem('LessonsList', JSON.stringify(LessonsList));
      setTimeout(() => lessonRefresher(),100);
      
    }

  return (
    <>

    <div className="flex justify-between items-center bg-green-400 mt-6">
      <h1 className=" pl-3 text-3xl font-bold"> {lesson.moduleCode}</h1>
      <button onClick = {deleteIt} className =" px-20 bg-red-500 font-bold text-4xl hover:bg-orange-400"> X </button>
    </div>
    <div className="flex flex-col xl:flex-row ">
      {lesson.arrOflesson.map((lessonType,index) => {
        return <ModuleLessonType key ={index} lesson = {lessonType} />
      })}
       
    </div>

    </>
  )
}

export default Module