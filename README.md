# Webpage : https://travelessmugmore.vercel.app/

# Programming Language/Framework : Javascript, HTML, TailwindCSS, React


## About this Website
This website is made to generate reccomended timetable for NUS students who do not stay in campus by fetching APIs from NUSmods API to get the data and test all possible permutations to achieve most optimal timetable.The generated timetable will prioritise achieving these in the following priority order:

1. Ensuring time for lunch and travelling between locations (can be edited/removed in Custom tab)

2. Ensuring first live lesson starts no earlier than that stated in Custom tab

3. Minimising the number of days with live lessons. (i.e minimise the need to travel to/fro school)

4. Achieving latest average school start time.

5. Achieving earliest average school end time.

## About Tools
Steps to use:

1. Edit Custom based on your preference (if necessary).

2. Add modules into module section by entering the module code (e.g CS2030S) (not caps-sensitive)

3. Set the lessons(tutorial/lecture/laboratory etc) to recorded, live or joinAny.

- Recorded lessons are lessons that can be skipped.

- Live lessons are those that we need to attend in-person.

- JoinAny lesson are those that we can join any. For example tutorials where we don't have to go the one we bidded in courserekt (i.e no class participation). These lessons can take place concurrently with recorded lessons.

4. Click tick/cross to change whether the specific timeslot will be considered.

5. Next, click generate timetable to generate a timetable.

- If a blank timetable is generated, it means it is impossible to have a timetable based on your Custom. (Consider changing Custom or changing course).

## About Custom
1. School starts at : All live lessons will be after this timing (except for those lessons with no options). If it is impossible to achieve this, a blank timetable will be generated.

2. Eat Lunch? : Whether a period of lunch time will be reserved within the time period chosen. (reccomended to keep it as yes)

3. Lunch starts/ends at : 1 hour lunch time will be preserved between the start/end time chosen. (if applicable)

4. Consider travelling for 1 period lesson? : Determines whether travelling time will be preserved between location clusters for 1 period lesson. (eg. COM, ENG, SCI etc) More information about location clusters can be found below. If both location are in same location clusters (e.g COM1 and COM2 are close to each other and are both categorised under COM cluster), travelling time between them won't be preserved as we can simply walk there and still won't be late for lessons. Travelling time after 2-4 period lessons won't be considered as 2-4 period lessons will usually end earlier and allow us to have sufficient time to travel to next location without being late. (if it doesn't, you should file a complain LOL.)

5. Academic Year/ Semester : Determines which semetser we fetch our data from.

- Note: Data won't be automatically updated after changing this. Please delete all modules and add them again.

### Important Things To Know
- Unable to determine something is even/odd week or half semester or only for 1-2 lessons. It assumed the lessons are for all weeks. For lessons with even/odd week or those with 2 half semester lessons, I reccommend you to only add 1 of them (if they can be stacked easily) or do manual planning if there are many with such conditions. (If it is just one, it is fine). For lessons with only 1-2 lessons (e.g gen2061x only have lessons on week 3/4), just don't add them in as it is just two time thing.
  
- For lessons which starts at middle of period, its period will be rounded down hence potentially causing misleading timing eg. 30 min earlier than what it is. (Very rare to happen)
  
- For lessons at which NUSMod cramped all as lecture (such as CS2103T where all is categorised as lecture), keyed in module code with a '.' before it at which all lessons with venues with LT and AUD in it will be categorised at others. This will allow you to set the legit lecture to recorded.

### Location Clusters
Note: * represents anything

- NA: E-Learn_C

- COM: COM*, CLB*, LT16, LT17, LT18, LT19

- UTOWN: AMB*, CAPT*, ERC*, RC*, T*, U*, Y-*, NAK-AUD

- AS: AS*, LT8-15

- ENG: CELC*, E*(except ERC*), SDE*, LT1-7, LT7a

- MD: MD*, CELS*

- SCI: CQT*, S*(except SDE*), Frontier, LT20-21, LT26-29, LT31-34

- LAW: LAW*

*** Any locations not listed here is not part of any clusters. If you spot any mistake regarding the location cluster a location should be in, please report it via my github (link found in credits). ***
