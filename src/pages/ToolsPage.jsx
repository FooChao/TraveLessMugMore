import { CustomList } from '../App';
import handleData from '../functions/handleData';
import React, { useState, useEffect } from 'react';
import { LessonsList } from '../App';
import Module from '../components/Module';
import { useNavigate } from 'react-router-dom';
import Timetable from '../components/Timetable';

let updateLessonsFunction = null;

const lessonRefresher = () => {
  // If updateLessonsFunction is set, use it to update lessons
  //console.log('hi');
  if (updateLessonsFunction) {
    //console.log('bye');
    updateLessonsFunction();
    //console.log(LessonsList);
  }
};

const ToolsPage = () => {

  //set-up navigate

  const navigate = useNavigate();
  
  //define lessons for modules
  const [lessons, updateLessons] = useState([]);

  //define exam clashes

  const [examClash, setExamClash] = useState('NA');

  const checkForClash = () => {
    let clash = false;
    for (let i = 0; i < LessonsList.length; i++) {
      for (let j = i + 1; j < LessonsList.length; j++) {
          if (
              (LessonsList[i].examStart < LessonsList[j].examEnd && LessonsList[i].examEnd > LessonsList[j].examStart)
          ) {
              console.log(`Clash detected between exam ${LessonsList[i].moduleCode} and exam ${LessonsList[i].moduleCode}`);
              setExamClash(`Exam Clash : ${LessonsList[i].moduleCode} and ${LessonsList[i].moduleCode}`); // Return true if a clash is found
              clash = true;
          }
      }
    }
    if (!clash) {
      //console.log('no clash');
      setExamClash('NA'); // Return false if no clashes are found
    }
    
  }

  //
  /*
  useEffect(() => {    
    updateLessons(LessonsList);
    return;    
  }, []);
  */

  useEffect(() => {
    // Initialize the lessons state with LessonsList
    updateLessons([...LessonsList]);
    checkForClash();
    // Set the global updateLessonsFunction to the local updateLessons function
    updateLessonsFunction = () =>{
      updateLessons([...LessonsList]);
      checkForClash();
    } 

    // Cleanup function to reset updateLessonsFunction on unmount
    return   () => {
      updateLessonsFunction = null;
    };
    
  }, []);


  

  const addModules = async (event) => {
    event.preventDefault();
    let code = document.getElementById('modulesAdded').value.toUpperCase();

    let specialTreatment = false;

    if (code.charAt(0) === '.') {   // to detect need for special treatment
        code  = code.slice(1);
        specialTreatment = true;
    }
        
    //console.log(code);
    let needed = null;

    const fetchJobs = async () => {
      try {
        const res = await fetch(`https://api.nusmods.com/v2/${CustomList.year}/modules/${code}.json`);
        const data = await res.json();
    
        const needed = data.semesterData
          .map(semester => {
            const timetable = semester.timetable;
            const examStart = semester.examDate ? new Date(semester.examDate) : null;
            const examDuration = semester.examDuration ? semester.examDuration : null;
    
            // Compute examEnd
            const examEnd = examStart && examDuration 
              ? new Date(examStart.getTime() + examDuration * 60000) 
              : null;
    
            return {
              moduleCode: code,
              semester: semester.semester,
              timetable: timetable,
              examStart: examStart,
              examEnd: examEnd,
            };
          })
          .filter(item => item.semester == CustomList.semester)[0];

          //console.log(needed);

          if (specialTreatment === true) {
            //console.log('hi');
            needed.timetable.forEach((lesson) => {
              //console.log(lesson.venue);
              if(lesson.venue.includes('LT') || lesson.venue.includes('AUD')) {
                lesson.lessonType = 'Others';                
              }
              return;
            })
          }

          //console.log(needed);
    
        // Sort timetable
        needed.timetable.sort(
          (first, second) => first.lessonType === second.lessonType 
            ? first.classNo.localeCompare(second.classNo)
            : first.lessonType.localeCompare(second.lessonType)
        );
    
        // Handle the sorted timetable and exam dates
        handleData(needed);
    
        // Update local storage and lessons list

        
        //console.log(LessonsList);
        updateLessons([...LessonsList]);
        //console.log(LessonsList);
        checkForClash();
        localStorage.setItem('LessonsList', JSON.stringify(LessonsList));
        
        
        //updateLessons([...LessonsList]);
        
    
      } catch (error) {
        console.log('Error', error);
      } finally {
        document.getElementById('modulesAdded').value = '';
      }
    }
    //console.log(LessonsList);
    fetchJobs();
    //console.log(LessonsList);   
    
    document.getElementById('modulesAdded').value ='';  
      
     

  }


  


  return (
    <div id = "tools" className="container flex flex-col justify-between mx-auto p-0 py-1">
      <form className={examClash === 'NA' ? "hidden flex items-center justify-between bg-red-500 mb-3 mx-0 px-0 text-3xl font-bold text-center" 
        : "flex items-center justify-between bg-red-500 mb-3 mx-0 px-0 text-3xl font-bold text-center"}>
        {examClash}
      </form>
      <form className="flex items-center justify-between bg-green-400 mb-3 mx-0 px-0" onSubmit={addModules}>
        <h1 className="ml-3 text-3xl font-bold"> Modules</h1>
        <div className="float-right">
          <input type="text" id="modulesAdded" placeholder="Modules to add"         className="min-w-32 py-3 ml-auto"/>
          <button className="bg-red-500 hover:bg-orange-400 px-5 py-3 float-right ml-auto" type="submit" >
              + Add
          </button>
        </div>            
      </form>

      {lessons.map((lesson, index) => {
        return <Module key= {index} lesson = {lesson} />
      })}

      <Timetable />

      
    </div>    
  )


}

export { ToolsPage as default, lessonRefresher };
