import React from 'react'
import { useState } from 'react';
import IndivLesson from './IndivLesson';

const ModuleLessonType = ({lesson}) => {
    const [skip, setSkip] = useState(lesson.skip);
    const [hidden, setHidden] = useState(true);

    const setLive = () => {
        setSkip("Live");
        lesson.skip = "Live";
    }

    const setRecorded = () => {
        setSkip("Recorded");
        lesson.skip = "Recorded";
        
    }

    const setJoinAny = () => {
        setSkip("JoinAny");
        lesson.skip = "JoinAny";
    }

    const adjustHidden = () => {
        setHidden(!hidden);
    }
    const nonBreakingSpace = `\u00A0`
    const title = lesson.lessonType + '(hide/unhide)'

    //console.log(lesson);
    return (
    
        <div class="xl:w-1/2">
            <div class="mt-2 flex bg-white border-2 border-black  items-center justify-around ">
                <h6 class ="txt-s hover:text-gray-500" onClick={adjustHidden} >
                    {title.padEnd(30,nonBreakingSpace)} 
                </h6>
                <button class ={skip == "Live" ? "bg-green-500 px-5  text-md hover:bg-orange-400" : "px-5  text-md hover:bg-orange-400"} onClick={setLive}> Live </button> 
                <button class ={skip == "Recorded" ? "bg-green-500 px-5  text-md hover:bg-orange-400" : "px-5  text-md hover:bg-orange-400"} onClick={setRecorded}> Recorded </button> 
                <button class ={skip == "JoinAny" ? "bg-green-500 px-5  text-md hover:bg-orange-400" : "px-5  text-md hover:bg-orange-400"} onClick={setJoinAny}> JoinAny </button>                     
            </div>
            {hidden ? '' : lesson.timetable.map((indiv, index) => {
                return <IndivLesson key={index} indiv = {indiv} length = {lesson.length}/>
            })}
        </div>
    )
}

export default ModuleLessonType
