import React from 'react'
import { CustomList } from '../App'
import { useState} from 'react';





const CustomPage = () => {
    const [saved, setSaved] = useState(true);

    const unsave = () => {
        setSaved(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        CustomList.schoolStart = document.getElementById('startTime').value;
        CustomList.eatLunch = document.getElementById('eatLunch').value;
        CustomList.lunchStart = document.getElementById('lunchStart').value;
        CustomList.lunchEnd = document.getElementById('lunchEnd').value;
        CustomList.travel = document.getElementById('travel').value;
        setSaved(true);
        //console.log(CustomList);
    }

    return (
    // <!--Custom-->
        <div className="container flex flex-col justify-between mx-auto p-0 py-1">
            
            <h1 className="font-bold py-5 text-2xl md:text-3xl">
                Customisation based on your own preference (24 hour clock by hours)
            </h1>

            <form className="flex flex-col text-left " onSubmit={handleSubmit}>
                <div className="flex mb-5">
                    <p className="text-2xl">
                        School Starts at:
                    </p>
                    <input type="number" id="startTime" defaultValue= {CustomList.schoolStart} onChange={unsave}className="text-2xl" min="8" max="18"/>
                    <p className="text-2xl">
                        o'clock
                    </p>
                </div>

                <div className="flex mb-5">
                    <p className="text-2xl">
                        Eat Lunch?
                    </p>
                    <select id="eatLunch" name="eatLunch" className="text-2xl" onChange={unsave} defaultValue={CustomList.eatLunch}>
                        <option value='true' className="text-2xl">Yes</option>
                        <option value='false' className="text-2xl">No</option>
                    </select>
                    
                </div>

                <div className="flex mb-5">
                    <p className="text-2xl">
                        Lunch Starts at:
                    </p>
                    <input type="number" id="lunchStart" onChange={unsave} defaultValue={CustomList.lunchStart} className="text-2xl" min="8" max="18"/>
                    <p className="text-2xl">
                        o'clock
                    </p>
                </div>
                <div className="flex mb-5">
                    <p className="text-2xl">
                        Lunch Ends at:
                    </p>
                    <input type="number" id="lunchEnd" defaultValue= {CustomList.lunchEnd} onChange={unsave} className="text-2xl" min="8" max="18"/>
                    <p className="text-2xl">
                        o'clock
                    </p>
                </div>

                <div className="flex mb-5">
                    <p className="text-2xl">
                        Consider Travelling for 1 period lesson?
                    </p>
                    <select id="travel" name="travel" className="text-2xl" onChange={unsave} defaultValue={CustomList.travel}>
                        <option value='true' className="text-2xl">Yes</option>
                        <option value='false' className="text-2xl">No</option>
                    </select>
                    
                </div>
                <div className='flex'>
                    <button type="submit" className="text-2xl border-2 border-black bg-gray-200 w-24 hover:bg-orange-400">Save</button>
                    <p className={saved ? "ml-10 text-2xl" : "ml-10 text-2xl text-red-500"}>
                        {saved ? '' : 'Not '}Saved
                    </p>
                </div>

                
                

            </form>      
        </div>
  )
}

export default CustomPage