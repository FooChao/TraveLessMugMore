import React from 'react'
import { useState } from 'react';
import IndivLesson from './IndivLesson';
import SPIndivLesson from './SPIndivLesson';
import { LessonsList } from '../App';

const ModuleLessonType = ({lesson}) => {
    const [skip, setSkip] = useState(lesson.skip);
    const [hidden, setHidden] = useState(true);

    const setLive = () => {
        setSkip("Live");
        lesson.skip = "Live";
        localStorage.setItem('LessonsList', JSON.stringify(LessonsList));
    }

    const setRecorded = () => {
        setSkip("Recorded");
        lesson.skip = "Recorded";
        //console.log('hi');
        localStorage.setItem('LessonsList', JSON.stringify(LessonsList));
        
    }

    const setJoinAny = () => {
        setSkip("JoinAny");
        lesson.skip = "JoinAny";
        localStorage.setItem('LessonsList', JSON.stringify(LessonsList));
    }

    const adjustHidden = () => {
        setHidden(!hidden);
    }
    const nonBreakingSpace = `\u00A0`
    const title = lesson.lessonType + '(hide/unhide)'

    //console.log(lesson);
    return (
    
        <div className="xl:w-1/2">
            <div className="mt-2 flex bg-white border-2 border-black  items-center justify-around ">
                <h6 className ="txt-s hover:text-gray-500" onClick={adjustHidden} >
                    {title.padEnd(30,nonBreakingSpace)} 
                </h6>
                <button className ={skip == "Live" ? "bg-green-500 px-5  text-md hover:bg-orange-400" : "px-5  text-md hover:bg-orange-400"} onClick={setLive}> Live </button> 
                <button className ={skip == "Recorded" ? "bg-green-500 px-5  text-md hover:bg-orange-400" : "px-5  text-md hover:bg-orange-400"} onClick={setRecorded}> Recorded </button> 
                <button className ={skip == "JoinAny" ? "bg-green-500 px-5  text-md hover:bg-orange-400" : "px-5  text-md hover:bg-orange-400"} onClick={setJoinAny}> JoinAny </button>                     
            </div>
            {hidden ? '' : lesson.timetable.map((indiv, index) => {
                return  lesson.type == 0 
                    ? <IndivLesson key={index} indiv = {indiv} length = {lesson.length}/> 
                    : <SPIndivLesson key = {index} indiv = {indiv}/>
            })}
        </div>
    )
}

export default ModuleLessonType
