import { CustomList } from '../App';
import handleData from '../functions/handleData';
import React, { useState, useEffect } from 'react';
import { LessonsList } from '../App';
import Module from '../components/Module';
import { useNavigate } from 'react-router-dom';

const ToolsPage = () => {

  //set-up navigate

  const navigate = useNavigate();
  
  //define lessons for modules
  const [lessons, updateLessons] = useState([]);

  //
  useEffect(() => {    
    updateLessons(LessonsList);
    return;    
  }, []);


  

  const addModules = async (event) => {
    event.preventDefault();
    const code = document.getElementById('modulesAdded').value.toUpperCase();
        
    console.log(code);
    let needed = null;

    const fetchJobs = async () => {
      try {                
        const res = await fetch(`https://api.nusmods.com/v2/${CustomList.year}/modules/${code}.json`);
        const data = await res.json();
        needed = data.semesterData
          .map(semester => ({
              moduleCode : code,
              semester: semester.semester,
              timetable : semester.timetable
          }))
          .filter(item => item.semester == CustomList.semester)[0];
          needed.timetable.sort(
            (first,second) => first.lessonType == second.lessonType 
                ? first.classNo.localeCompare(second.classNo)
                : first.lessonType.localeCompare(second.lessonType)
            );

          handleData(needed); 

          //bug here
          //does not update when clicked

          //updateLessons([]);
            
          updateLessons([...LessonsList]);

          //bug here
          //does not update when clicked
          
          
             

      } catch (error) {
        console.log('Error', error);
      } finally {
        //console.log(lessons);
      }
      
      
    }
        
    fetchJobs();
    document.getElementById('modulesAdded').value ='';  
      
     

  }


  


  return (
    <div id = "tools" className="container flex flex-col justify-between mx-auto p-0 py-1">
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

      
    </div>    
  )


}

export default ToolsPage;
