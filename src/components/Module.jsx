import React from 'react'
import { useState } from 'react';
import { LessonsList } from '../App';

const Module = ({lesson}) => {
    //console.log(lesson)
    //console.log(lesson.moduleCode);
    const [deleted, setDeleted] = useState(false);
    const deleteIt = () => {
      setDeleted(true);

      //remove it from lessonList
      for (let i = LessonsList.length - 1; i >= 0; i--) {
        if (LessonsList[i].moduleCode == lesson.moduleCode) {
          LessonsList.splice(i,1);
        }
      }
    }

  return (
    <>

    <div class={deleted? 'hidden' : '' + "flex justify-between items-center bg-green-400 mt-6"}>
      <h1 class=" pl-3 text-3xl font-bold"> {lesson.moduleCode}</h1>
      <button onClick = {deleteIt} class =" px-20 bg-red-500 font-bold text-4xl hover:bg-orange-400"> X </button>
    </div>

    </>
  )
}

export default Module