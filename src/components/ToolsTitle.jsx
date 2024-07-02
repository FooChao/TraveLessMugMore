import React from 'react';
import { LessonsList } from '../App';

const ToolsTitle = () => {
    const addModules = (event) => {
        event.preventDefault();
        const code = document.getElementById('modulesAdded').value;
        console.log(code);
        let needed = null;

        const fetchJobs = async () => {
            try {
                const res = await fetch(`https://api.nusmods.com/v2/2023-2024/modules/${code}.json`);
                const data = await res.json();
                needed = data.semesterData.map(semester => ({
                    semester: semester.semester,
                    timetable : semester.timetable
                }));               

            } catch (error) {
                console.log('Error');
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