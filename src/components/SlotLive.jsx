import React from 'react'

const SlotLive = ({lesson}) => {
  return (
    <div className="text-sm md:text-md border-2 border-black bg-yellow-500 px-auto w-1/2 text-center">
        <div className="text-0.5rem md:text-sm" >
            {lesson[0]}
        </div>
        <div className="text-0.5rem md:text-sm">
            {lesson[1].slice(0, 3).toUpperCase()}
        </div>
        <div className="text-0.5rem md:text-sm">
            {lesson[2]}
        </div>
    </div>
  )
}

export default SlotLive