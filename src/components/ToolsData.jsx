// not used anymore
//kept as archived



import React, { useState, useEffect } from 'react';
import { LessonsList } from '../App';
import Module from './Module';

// Variable to store the updateLessons function
let updateLessonsFunction = null;

const lessonRefresher = () => {
  // If updateLessonsFunction is set, use it to update lessons
  console.log('hi');
  if (updateLessonsFunction) {
    console.log('bye');
    updateLessonsFunction(LessonsList);
    console.log(LessonsList);
  }
};

const ToolsData = () => {
  const [lessons, updateLessons] = useState([]);

  useEffect(() => {
    // Initialize the lessons state with LessonsList
    updateLessons(LessonsList);
    // Set the global updateLessonsFunction to the local updateLessons function
    updateLessonsFunction = updateLessons;

    // Cleanup function to reset updateLessonsFunction on unmount
    return   () => {
      updateLessonsFunction = null;
    };
    
  }, []);


  return (
    <>
    
        {lessons.map((lesson, index) => {
             return <Module key = {index} lesson = {lesson} />
        })}
    </>
  );
};

export { ToolsData as default, lessonRefresher };
