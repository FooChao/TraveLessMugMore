import React from 'react'


const Home = () => {
  return (
    <div className="container flex flex-col mx-auto p-6 justify-between">
        <div className="container justify-around">
            <h1 className="text-3xl underline pb-3">
                About this Website
            </h1>
            <p className="text-lg pb-20">
                This website is made to generate reccomended timetable for NUS SOC students who do not stay in campus by fetching APIs from NUSmods API hence its data will be same as that of NUSmod.(Please do not randomly spam add modules for no reason in case it crash NUSmod and get me into trouble.Use responsibly) The generated timetable will minimise the amount of days students need to travel to school.It also tries to delay the first live lesson time without compromising the days in school. It also takes into consideration lunch time and travelling between venues (for now it only accounts for travelling time to and fro Soc).
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
                Customise your lunch time range/school starting time and whether you want travelling/lunch time to be considered.
            </p>
            <h1 className="text-3xl underline pb-3">
                Other Important Things To Know
            </h1>
            <p className="text-lg pb-5">
                Venues included in COM are any venues starting with 'COM' , 'LT16', 'LT17', 'LT18' and 'LT19'. These venues are closed to each other and we will be able to move around each place quickly. Travelling within these benues won't be considered.
            </p>
            <p className="text-lg pb-5">
                For lessons which starts at middle of period, its period will be rounded down hence potentially causing misleading timing eg. 30 min earlier than what it is.
            </p>
            <p className="text-lg pb-20">
                For lessons at which NUSMod cramped all as lecture (such as CS2103T where all is categorised as lecture), keyed in module code with a '.' before it at which all lessons with venues with LT and AUD in it will be categorised at others. This will allow you to set the legit lecture to recorded.
            </p>
        </div>
    </div>
  )
}

export default Home