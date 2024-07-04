import React from 'react'
import { useState } from 'react'
import periodToTime from '../functions/periodToTime';
import periodToTimeDouble from '../functions/periosToTimeDouble';

const IndivLesson = ({indiv,length}) => {
    console.log(indiv);
    const [included,setIncluded] = useState(indiv.included);

    const adjust = (truthy) => {
        setIncluded(truthy);
        indiv.included = truthy;
    }
    console.log(indiv);
    console.log(length);

    const title = length == 1 
        ? (periodToTime(indiv.period) + ', ' + indiv.location)
        : (periodToTimeDouble(indiv.period) + ', ' + indiv.location);
    console.log(title);
    const nonBreakingSpace = `\u00A0`;

    return (
        <div className="mt-2 flex bg-white border-2 border-black items-center justify-between">
            {title.padEnd(30,nonBreakingSpace)}
            <button className ={included?" px-5 md:px-10 lg:px-15 bg-green-500 font-bold text-md hover:bg-orange-400":" px-5 md:px-10 lg:px-15 font-bold text-md hover:bg-orange-400"} onClick={() => adjust(true)}> {'\u2713'} </button> 
            <button className ={included ? "px-5 md:px-10 lg:px-15 font-bold text-md hover:bg-orange-400" :"px-5 md:px-10 lg:px-15 bg-red-500 font-bold text-md hover:bg-orange-400"} onClick={() => adjust(false)}> X </button>                     
        </div>
    )
}

export default IndivLesson