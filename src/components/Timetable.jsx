import React from 'react'
import { TimetableDetailed } from '../App'
import { TimetableSummary } from '../App'
import { useState, useEffect } from 'react'

import SlotLive from './SlotLive'
import SlotLunch from './SlotLunch'
import SlotNull from './SlotNull'
import SlotRecorded from './SlotRecorded'
import SlotStacked from './SlotStacked'
import SlotTravel from './SlotTravel'

const Timetable = () => {

    const[table, setTable] = useState([TimetableSummary[0],TimetableDetailed[0]]);

    const renderSlot = (value, lesson) => {
        if (value === undefined) {
          return <SlotNull />;
        }
        switch (value) {
          case 'TravelOut':
          case 'TravelBack':
            return <SlotTravel />;
          case 'JoinAny':
          case 'Live':
            return <SlotLive lesson={lesson} />;
          case 'Recorded':
            return <SlotRecorded lesson={lesson} />;
          case 'Stacked':
            return <SlotStacked lesson={lesson} />;
          case 'Lunch':
          case 'TravelBackLunch' :
          case 'TravelFromLunch' :
            return <SlotLunch />;
          default:
            return <SlotNull />;
        }
      };



    return (
        <>
            {/* <!--Timetable--> */}
            <div id = "Timetable"className="div flex flex-col mt-20 border-2 border-black">
                {/* <!--Timing--> */}
                <div className="flex border-2 border-black items-center">
                    <div className="hidden lg:block text-sm md:text-md border-2 border-black bg-red-600 px-auto w-1/2">
                        Start Time
                    </div>

                    <div className="block lg:hidden text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2">
                        StT
                    </div>
                    
                    <div className="text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2">
                        0800
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-300 px-auto w-1/2">
                        0900
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2">
                        1000
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-300 px-auto w-1/2">
                        1100
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2">
                        1200
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-300 px-auto w-1/2">
                        1300
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2">
                        1400
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-300 px-auto w-1/2">
                        1500
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2">
                        1600
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-300 px-auto w-1/2">
                        1700
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2">
                        1800
                    </div>
                    <div className="text-sm md:text-md border-2 border-black bg-red-300 px-auto w-1/2">
                        1900
                    </div>
                    

                </div>

                {/* <!--Monday--> */}
                <div className="div flex flex-col border-2 border-black">
                    {/* <!--Lessons--> */}
                    <div className="flex border-2 border-black items-center">
                        <div className="hidden lg:block text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2 py-5">
                            Monday
                        </div>

                        <div className="block lg:hidden text-sm md:text-md border-2 border-black bg-red-400 px-auto w-1/2 py-5">
                            Mon
                        </div>
                        {table[0] && renderSlot(table[0][0], table[1] && table[1][0])}
                        {table[0] && renderSlot(table[0][1], table[1] && table[1][1])}
                        {table[0] && renderSlot(table[0][2], table[1] && table[1][2])}
                        {table[0] && renderSlot(table[0][3], table[1] && table[1][3])}
                        {table[0] && renderSlot(table[0][4], table[1] && table[1][4])}
                        {table[0] && renderSlot(table[0][5], table[1] && table[1][5])}
                        {table[0] && renderSlot(table[0][6], table[1] && table[1][6])}
                        {table[0] && renderSlot(table[0][7], table[1] && table[1][7])}
                        {table[0] && renderSlot(table[0][8], table[1] && table[1][8])}
                        {table[0] && renderSlot(table[0][9], table[1] && table[1][9])}
                        {table[0] && renderSlot(table[0][10], table[1] && table[1][10])}
                        {table[0] && renderSlot(table[0][11], table[1] && table[1][11])}
                    </div>
                </div>

                {/* <!--Tuesday--> */}
                <div className="div flex flex-col border-2 border-black">
                    {/* <!--Lessons--> */}
                    <div className="flex border-2 border-black items-center">
                        <div className="hidden lg:block text-sm md:text-md border-2 border-black bg-blue-400 px-auto w-1/2 py-5">
                            Tuesday
                        </div>

                        <div className="block lg:hidden text-sm md:text-md border-2 border-black bg-blue-400 px-auto w-1/2 py-5">
                            Tue
                        </div>
                        {table[0] && renderSlot(table[0][13], table[1] && table[1][13])}
                        {table[0] && renderSlot(table[0][14], table[1] && table[1][14])}
                        {table[0] && renderSlot(table[0][15], table[1] && table[1][15])}
                        {table[0] && renderSlot(table[0][16], table[1] && table[1][16])}
                        {table[0] && renderSlot(table[0][17], table[1] && table[1][17])}
                        {table[0] && renderSlot(table[0][18], table[1] && table[1][18])}
                        {table[0] && renderSlot(table[0][19], table[1] && table[1][19])}
                        {table[0] && renderSlot(table[0][20], table[1] && table[1][20])}
                        {table[0] && renderSlot(table[0][21], table[1] && table[1][21])}
                        {table[0] && renderSlot(table[0][22], table[1] && table[1][22])}
                        {table[0] && renderSlot(table[0][23], table[1] && table[1][23])}
                        {table[0] && renderSlot(table[0][24], table[1] && table[1][24])}
                    </div>
                </div>

                {/* <!--Wednesday--> */}
                <div className="div flex flex-col border-2 border-black">
                    {/* <!--Lessons--> */}
                    <div className="flex border-2 border-black items-center">
                        <div className="hidden lg:block text-sm md:text-md border-2 border-black bg-green-400 px-auto w-1/2 py-5">
                            Wednesday
                        </div>

                        <div className="block lg:hidden text-sm md:text-md border-2 border-black bg-green-400 px-auto w-1/2 py-5">
                            Wed
                        </div>
                        {table[0] && renderSlot(table[0][26], table[1] && table[1][26])}
                        {table[0] && renderSlot(table[0][27], table[1] && table[1][27])}
                        {table[0] && renderSlot(table[0][28], table[1] && table[1][28])}
                        {table[0] && renderSlot(table[0][29], table[1] && table[1][29])}
                        {table[0] && renderSlot(table[0][30], table[1] && table[1][30])}
                        {table[0] && renderSlot(table[0][31], table[1] && table[1][31])}
                        {table[0] && renderSlot(table[0][32], table[1] && table[1][32])}
                        {table[0] && renderSlot(table[0][33], table[1] && table[1][33])}
                        {table[0] && renderSlot(table[0][34], table[1] && table[1][34])}
                        {table[0] && renderSlot(table[0][35], table[1] && table[1][35])}
                        {table[0] && renderSlot(table[0][36], table[1] && table[1][36])}
                        {table[0] && renderSlot(table[0][37], table[1] && table[1][37])}
                    </div>
                </div>

                {/* <!--Thursday--> */}
                <div className="div flex flex-col border-2 border-black">
                    {/* <!--Lessons--> */}
                    <div className="flex border-2 border-black items-center">
                        <div className="hidden lg:block text-sm md:text-md border-2 border-black bg-yellow-400 px-auto w-1/2 py-5">
                            Thursday
                        </div>

                        <div className="block lg:hidden text-sm md:text-md border-2 border-black bg-yellow-400 px-auto w-1/2 py-5">
                            Thu
                        </div>
                        {table[0] && renderSlot(table[0][39], table[1] && table[1][39])}
                        {table[0] && renderSlot(table[0][40], table[1] && table[1][40])}
                        {table[0] && renderSlot(table[0][41], table[1] && table[1][41])}
                        {table[0] && renderSlot(table[0][42], table[1] && table[1][42])}
                        {table[0] && renderSlot(table[0][43], table[1] && table[1][43])}
                        {table[0] && renderSlot(table[0][44], table[1] && table[1][44])}
                        {table[0] && renderSlot(table[0][45], table[1] && table[1][45])}
                        {table[0] && renderSlot(table[0][46], table[1] && table[1][46])}
                        {table[0] && renderSlot(table[0][47], table[1] && table[1][47])}
                        {table[0] && renderSlot(table[0][48], table[1] && table[1][48])}
                        {table[0] && renderSlot(table[0][49], table[1] && table[1][49])}
                        {table[0] && renderSlot(table[0][50], table[1] && table[1][50])}
                    </div>
                </div>

                {/* <!--Friday--> */}
                <div className="div flex flex-col border-2 border-black">
                    {/* <!--Lessons--> */}
                    <div className="flex border-2 border-black items-center">
                        <div className="hidden lg:block text-sm md:text-md border-2 border-black bg-purple-400 px-auto w-1/2 py-5">
                            Friday
                        </div>

                        <div className="block lg:hidden text-sm md:text-md border-2 border-black bg-purple-400 px-auto w-1/2 py-5">
                            Fri
                        </div>
                        {table[0] && renderSlot(table[0][53], table[1] && table[1][53])}
                        {table[0] && renderSlot(table[0][54], table[1] && table[1][54])}
                        {table[0] && renderSlot(table[0][55], table[1] && table[1][55])}
                        {table[0] && renderSlot(table[0][56], table[1] && table[1][56])}
                        {table[0] && renderSlot(table[0][57], table[1] && table[1][57])}
                        {table[0] && renderSlot(table[0][58], table[1] && table[1][58])}
                        {table[0] && renderSlot(table[0][59], table[1] && table[1][59])}
                        {table[0] && renderSlot(table[0][60], table[1] && table[1][60])}
                        {table[0] && renderSlot(table[0][61], table[1] && table[1][61])}
                        {table[0] && renderSlot(table[0][62], table[1] && table[1][62])}
                        {table[0] && renderSlot(table[0][63], table[1] && table[1][63])}
                        {table[0] && renderSlot(table[0][64], table[1] && table[1][64])}
                    </div>
                </div>


            </div>


            {/* <!--Generate Button--> */}
            <div className="items-center justify-around text-center text-4xl mt-5">
                <button className="bg-red-500 border-2 border-black hover:bg-orange-400">
                    Generate
                </button>
            </div>

            {/* <!--Legends--> */}

            <div className="mt-10 text-center font-bold text-4xl">
                Legends:
            </div>
            <div className="flex items-center justify-between mt-10  flex-col md:flex-row ">
                <div className="flex justify-around">
                    <div className="text-sm md:text-md border-2 border-black bg-yellow-500 px-auto text-center rounded-full w-5 h-5">                
                        &middot;                
                    </div>
                    <div>
                        Live-Lesson
                    </div>
                </div>
                
                <div className="flex justify-around">
                    <div className="text-sm md:text-md border-2 border-black bg-purple-500 px-auto text-center rounded-full w-5 h-5">                
                        &middot;                
                    </div>
                    <div>
                        Recorded-Lesson
                    </div>

                </div>

                <div className="flex justify-around">
                    <div className="text-sm md:text-md border-2 border-yellow-500 bg-purple-500 hover:bg-yellow-500 px-auto text-center rounded-full w-5 h-5">                
                        &middot;                
                    </div>
                    <div className="text-sm md:text-md border-2 border-purple-500 bg-yellow-500 hover:bg-purple-500 px-auto text-center rounded-full w-5 h-5">                
                        &middot;                
                    </div>
                    <div>
                        Recorded&Live Lesson (Click to switch)
                    </div>

                </div>

                <div className="flex justify-around">
                    <div className="text-sm md:text-md border-2 border-black bg-blue-200 px-auto text-center rounded-full w-5 h-5">                
                        &middot;                
                    </div>
                    <div>
                        Lunch
                    </div>

                </div>

                <div className="flex justify-around">
                    <div className="text-sm md:text-md border-2 border-black bg-gray-200 px-auto text-center rounded-full w-5 h-5">                
                        &middot;                
                    </div>
                    <div>
                        Travel
                    </div>

                </div>

                <div className="flex justify-around">
                    <div className="text-sm md:text-md border-2 border-black bg-white px-auto text-center rounded-full w-5 h-5">                
                        &middot;                
                    </div>
                    <div>
                        Absolutely Nothing
                    </div>

                </div>
                

                

            </div>
        
        </>
  )
}

export default Timetable