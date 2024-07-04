import React from 'react'

const SlotRecorded = ({lesson}) => {
  return (
    <div className="text-sm md:text-md border-2 border-black bg-purple-500 px-auto w-1/2 text-center">
        <div className="text-0.5rem lg:text-sm" >
            {lesson[0]}
        </div>
        <div className="text-0.5rem lg:text-sm">
            {lesson[1].slice(0, 3).toUpperCase()}
        </div>
        <div className="text-0.5rem lg:text-sm">
            NA
        </div>
    </div>
  )
}

export default SlotRecorded