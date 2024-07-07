import React from 'react'
import { useState } from 'react';
import periodToTime from '../functions/periodToTime';
import periodToTimeDouble from '../functions/periosToTimeDouble';
import { LessonsList } from '../App';

const SPIndivLesson = ({indiv}) => {
    console.log(indiv);
    const [included,setIncluded] = useState(indiv.included);
    const adjust = (truthy) => {
        setIncluded(truthy);
        indiv.included = truthy;
        localStorage.setItem('LessonsList', JSON.stringify(LessonsList));
    }

    const nonBreakingSpace = `\u00A0`;

    const naming = (option) => {
        const title = option.length == 1 
            ? (periodToTime(option.period) + ', ' + option.location)
            : (periodToTimeDouble(option.period) + ', ' + option.location);
        return title.padEnd(30,nonBreakingSpace)
    }
    return (
        <div className="mt-2 flex bg-white border-2 border-black items-center justify-between">
            
            <div>
                {indiv.timetable.map((option) => {
                    return <h1> {naming(option)}</h1>
                })}
            </div>
            <button className ={included?" px-5 md:px-10 lg:px-15 bg-green-500 font-bold text-md hover:bg-orange-400 ":" px-5 md:px-10 lg:px-15 font-bold text-md hover:bg-orange-400"} onClick={() => adjust(true)}> {'\u2713'} </button> 
            <button className ={included ? "px-5 md:px-10 lg:px-15 font-bold text-md hover:bg-orange-400" :"px-5 md:px-10 lg:px-15 bg-red-500 font-bold text-md hover:bg-orange-400"} onClick={() => adjust(false)}> X </button>                     
        </div>
    )
}

export default SPIndivLesson