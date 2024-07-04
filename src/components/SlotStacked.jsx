import React from 'react'
import { useState } from 'react'

const SlotStacked = ({lesson}) => {
    const [showLive, setShowLive] = useState(true);

    const changeLive = () => {
        setShowLive(!showLive);
    }

    if(showLive) {
        return (
            <div className="text-sm md:text-md border-2 border-purple-500 bg-yellow-500 hover:bg-purple-500 px-auto w-1/2 text-center" onClick={changeLive}>
                <div className="text-0.5rem md:text-sm" >
                    {lesson[0][0]}
                </div>
                <div className="text-0.5rem md:text-sm">
                    {lesson[0][1].slice(0, 3).toUpperCase()}
                </div>
                <div className="text-0.5rem md:text-sm">
                    {lesson[0][2]}
                </div>
            </div>
        )
                    
                    
    } else {
        return (
            <div className="text-sm md:text-md border-2 border-yellow-500 bg-purple-500 hover:bg-yellow-500 px-auto w-1/2 text-center" onClick={changeLive}>
                <div className="text-0.5rem md:text-sm" >
                    {lesson[1][0]}
                </div>
                <div className="text-0.5rem md:text-sm">
                    {lesson[1][1].slice(0, 3).toUpperCase()}
                </div>
                <div className="text-0.5rem md:text-sm">
                    NA
                </div>
            </div>
        )
        
    }
}
  

export default SlotStacked