// not used anymore kept as archived 
// integrated directly into ToolPage so can fetch data more easily




import React from 'react';
import { LessonsList } from '../App';
import { CustomList } from '../App';
import handleData from '../functions/handleData';

const ToolsTitle = () => {
    const addModules = (event) => {
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


                
                //console.log(needed);

            } catch (error) {
                console.log('Error', error);
            } finally {
                console.log(needed);
            }
        }

        fetchJobs();




        document.getElementById('modulesAdded').value ='';
    }



  return (
    
    // <!--Title-->
        <form className="flex items-center justify-between bg-green-400 mb-3 mx-0 px-0" onSubmit={addModules}>
            <h1 className="ml-3 text-3xl font-bold"> Modules</h1>
            <div className="float-right">
                <input type="text" id="modulesAdded" placeholder="Modules to add"         className="min-w-32 py-3 ml-auto"/>
                <button className="bg-red-500 hover:bg-orange-400 px-5 py-3 float-right ml-auto" type="submit" >
                    + Add
                </button>
            </div>            
        </form>
  )
}

export default ToolsTitle