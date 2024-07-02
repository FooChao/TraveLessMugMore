import React from 'react'


const Home = () => {
  return (
    <div className="container flex flex-col mx-auto p-6 justify-between">
        <div className="container justify-around">
            <h1 className="text-3xl underline pb-3">
                About this Website
            </h1>
            <p className="text-lg pb-20">
                This website is made to generate reccomended timetable for NUS SOC students who do not stay in campus. The generated timetable will minimise the amount of days students need to travel to school. It also takes into consideration lunch time and travelling between venues (for now it only accounts for travelling time to and fro Soc).
            </p>

            <h1 className="text-3xl underline pb-3">
                About Tools
            </h1>
            <p className="text-lg pb-5">
                To use, please kindly add yor modules into the modules section. Next, set the lessons to recorded, live or joinAny. (default live unless explicitly stated location as e-learning)
            </p>
            <p className="text-lg pb-5">
                Recorded lessons are lessons that can be skipped
            </p>
            <p className="text-lg pb-5">
                Live lessons are those that we need to attend in person
            </p>
            <p className="text-lg pb-5">
                JoinAny lesson are those that we can join any. For example tutorials where we don't have to go the one we bidded in courserekt (i.e no className participation). These lessons can take place concurrently with recorded lessons.
            </p>
            <p className="text-lg pb-5">
                Click tick/cross to change whether the specific timeslot will be considered.
            </p>
            <p className="text-lg pb-20">
                Next, click generate timetable to generate a timetable.
            </p>

            <h1 className="text-3xl underline pb-3">
                About Custom
            </h1>
            <p className="text-lg pb-20">
                Customise your lunch time range and whether you want travelling/lunch time to be considered.
            </p>
        </div>
    </div>
  )
}

export default Home