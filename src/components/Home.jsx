import React from 'react'


const Home = () => {
  return (
    <div className="container flex flex-col mx-auto p-6 justify-between">
        <div className="container justify-around">
            <h1 className="text-3xl underline pb-3">
                About this Website
            </h1>
            <p className="text-lg pb-5">
                This website is made to generate reccomended timetable for NUS students who do not stay in campus by fetching APIs from NUSmods API to get the data and test all possible permutations to achieve most optimal timetable.The generated timetable will prioritise achieving these in the following priority order:
            </p>
            <p className="text-lg pb-5">
                1. Ensuring time for lunch and travelling between locations (can be edited/removed in Custom tab)
            </p>
            <p className="text-lg pb-5">
                2. Ensuring first live lesson starts no earlier than that stated in Custom tab
            </p>
            <p className="text-lg pb-5">
                3. Minimising the number of days with live lessons. (i.e minimise the need to travel to/fro school)
            </p>
            <p className="text-lg pb-5">
                4. Achieving latest average school start time.
            </p>
            <p className="text-lg pb-20">
                5. Achieving earliest average school end time.
            </p>


            <h1 className="text-3xl underline pb-3">
                About Tools
            </h1>
            <p className="text-lg pb-5">
                Steps to use:
            </p>
            <p className="text-lg pb-5">
                1. Edit Custom based on your preference (if necessary).
            </p>
            <p className="text-lg pb-5">
                2. Add modules into module section by entering the module code (e.g CS2030S) (not caps-sensitive)
            </p>
            <p className="text-lg pb-5">
                3. Set the lessons(tutorial/lecture/laboratory etc) to recorded, live or joinAny.
            </p>
            <p className="text-lg pb-5 pl-5">
                -Recorded lessons are lessons that can be skipped.
            </p>
            <p className="text-lg pb-5 pl-5">
                -Live lessons are those that we need to attend in-person.
            </p>
            <p className="text-lg pb-5 pl-5">
                -JoinAny lesson are those that we can join any. For example tutorials where we don't have to go the one we bidded in courserekt (i.e no class participation). These lessons can take place concurrently with recorded lessons.
            </p>
            <p className="text-lg pb-5">
                4. Click tick/cross to change whether the specific timeslot will be considered.
            </p>
            <p className="text-lg pb-5">
                5. Next, click generate timetable to generate a timetable.
            </p>
            <p className="text-lg pb-20 pl-5">
                -If a blank timetable is generated, it means it is impossible to have a timetable based on your Custom. (Consider changing Custom or changing course).
            </p>

            <h1 className="text-3xl underline pb-3">
                About Custom
            </h1>
            <p className="text-lg pb-5">
                1. School starts at : All live lessons will be after this timing (except for those lessons with no options). If it is impossible to achieve this, a blank timetable will be generated.
            </p>
            <p className="text-lg pb-5">
                2. Eat Lunch? : Whether a period of lunch time will be reserved within the time period chosen. (reccomended to keep it as yes)
            </p>
            <p className="text-lg pb-5">
                3. Lunch starts/ends at : 1 hour lunch time will be preserved between the start/end time chosen. (if applicable)
            </p>
            <p className="text-lg pb-5">
                4. Consider travelling for 1 period lesson? : Determines whether travelling time will be preserved between location clusters for 1 period lesson. (eg. COM, ENG, SCI etc) More information about location clusters can be found below. If both location are in same location clusters (e.g COM1 and COM2 are close to each other and are both categorised under COM cluster), travelling time between them won't be preserved as we can simply walk there and still won't be late for lessons. Travelling time after 2-4 period lessons won't be considered as 2-4 period lessons will usually end earlier and allow us to have sufficient time to travel to next location without being late. (if it doesn't, you should file a complain LOL.)
            </p>
            <p className="text-lg pb-5">
                5. Academic Year/ Semester : Determines which semetser we fetch our data from. 
            </p>
            <p className="text-lg pb-20 pl-5">
                -Note: Data won't be automatically updated after changing this. Please delete all modules and add them again.
            </p>
            <h1 className="text-3xl underline pb-3">
                Important Things To Know
            </h1>
            <p className="text-lg pb-5">
                - Unable to determine something is even/odd week or half semester or only for 1-2 lessons. It assumed the lessons are for all weeks. For lessons with even/odd week or those with 2 half semester lessons, I reccommend you to only add 1 of them (if they can be stacked easily) or do manual planning if there are many with such conditions. (If it is just one, it is fine). For lessons with only 1-2 lessons (e.g gen2061x only have lessons on week 3/4), just don't add them in as it is just two time thing.
            </p>
            <p className="text-lg pb-5">
                -For lessons which starts at middle of period, its period will be rounded down hence potentially causing misleading timing eg. 30 min earlier than what it is. (Very rare to happen)
            </p>
            <p className="text-lg pb-20">
                -For lessons at which NUSMod cramped all as lecture (such as CS2103T where all is categorised as lecture), keyed in module code with a '.' before it at which all lessons with venues with LT and AUD in it will be categorised at others. This will allow you to set the legit lecture to recorded.
            </p>

            <h1 className="text-3xl underline pb-3">
                Location Clusters 
            </h1>
            <p className="text-lg pb-5">
                Note: * represents anything
            </p>
            <p className="text-lg pb-5">
                -NA: E-Learn_C
            </p>
            <p className="text-lg pb-5">
                -COM: COM*, CLB*, LT16, LT17, LT18, LT19
            </p>
            <p className="text-lg pb-5">
                -UTOWN: AMB*, CAPT*, ERC*, RC*, T*, U*, Y-*, NAK-AUD
            </p>
            <p className="text-lg pb-5">
                -AS: AS*, LT8-15
            </p>
            <p className="text-lg pb-5">
                -ENG: CELC*, E*(except ERC*), SDE*, LT1-7, LT7a
            </p>
            <p className="text-lg pb-5">
                -MD: MD*, CELS*
            </p>
            <p className="text-lg pb-5">
                -SCI: CQT*, S*(except SDE*), Frontier, LT20-21, LT26-29, LT31-34
            </p>
            <p className="text-lg pb-5">
                -LAW: LAW*
            </p>
            <p className="text-lg pb-20">
                *** Any locations not listed here is not part of any clusters. If you spot any mistake regarding the location cluster a location should be in, please report it via my github (link found in credits). ***
            </p>
        </div>
    </div>
  )
}

export default Home