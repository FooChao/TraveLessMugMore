import React from 'react'
import { LessonsList } from '../App';
import { lessonRefresher } from '../components/ToolsData';

const handleData = (moduleData) => {
    let timetable = moduleData.timetable;
    let saved = {
        moduleCode : moduleData.moduleCode,
        arrOflesson : []
    }

    //console.log('here');
    
    while (timetable.length != 0) {
        const lessonType = timetable[0].lessonType;
        //console.log(lessonType);
        const handled = timetable.filter(lesson => {
            //console.log(lesson.lessonType);
            return lesson.lessonType == lessonType;
        })
        const newStuff = helperBoss(handled,moduleData.moduleCode)
        //console.log(handled);
        //console.log(newStuff);

        saved.arrOflesson.push(newStuff);
        
        timetable = timetable.filter(lesson => lesson.lessonType != lessonType);
    }

    console.log(saved);

    LessonsList.push(saved);

    //console.log(LessonsList);

    lessonRefresher();
    

}

const helperBoss = (timetable,moduleCode) => {
    console.log(timetable);
    if (timetable.length <= 1) {
        return helperNoOption(timetable,moduleCode);
    } else if(timetable[0].classNo != timetable[1].classNo){
        return helperNormal(timetable,moduleCode);
    } else {
        return helperSpecial(timetable,moduleCode);
    }
}

const helperNoOption = (timetable, moduleCode) => {
    const days = [false,false,false,false,false];
    let totalDays = 0;
    const daysDynamic = [false,false,false,false,false];
    let totalDaysDynamic = 0;
    const length = (parseInt(timetable[0].endTime) - parseInt(timetable[0].startTime)) / 100;
    const period = [];
    const timetableSummarised = [];
    const periodCompiled =[];

    //to handle each lessons
    for (let timeSlot of timetable) {
        //find its period/location/day
        const day = helperDay(timeSlot.day);
        const slot = day * 13
            + parseInt(timeSlot.startTime)/100 - 8;
        const location = helperVenue(timeSlot.venue);
        //if slot not considered
        if (period[slot] == undefined) {
            period[slot] = {
                included: true,
                period : slot,
                location : location
            }
            timetableSummarised.push(period[slot]);
            if (!days[day]) {
                days[day] = true;
                daysDynamic[day] = true;
                totalDays++;
                //totalDaysDynamic++;
            }
        } else {
            //if can go e we go e , else we try go com, go outside if no choice
            if (period[slot].location == 'NA') {
                continue;
            } else if (location == 'NA') {
                period[slot].location = 'NA';
            } else if (period[slot].location == 'EXT' && location == 'COM') {
                period[slot].location = location;
            }
        }

    }
    //end of loop


    //compiled period handling so can be faster
    for (let i = 0; i <=65; i++) {
        if (period[i] != undefined) {
            periodCompiled.push(i);
        }
    }



    return {
        type: 0,
        priority : 0,
        days : days,
        daysDynamic : daysDynamic,
        totalDays : totalDays,
        totalDaysDynamic : totalDays,
        length : length,
        period : period,
        timetable : timetableSummarised,
        periodCompiled:periodCompiled,
        skip : 'Live',
        moduleCode : moduleCode,
        lessonType : timetable[0].lessonType
    }


}

const helperNormal = (timetable, moduleCode) => {
    const days = [false,false,false,false,false];
    let totalDays = 0;
    const daysDynamic = [false,false,false,false,false];
    let totalDaysDynamic = 0;
    const length = (parseInt(timetable[0].endTime) - parseInt(timetable[0].startTime)) / 100;
    const period = [];
    const timetableSummarised = [];
    const periodCompiled =[];

    //to handle each lessons
    for (let timeSlot of timetable) {
        //find its period/location/day
        const day = helperDay(timeSlot.day);
        const slot = day * 13
            + parseInt(timeSlot.startTime)/100 - 8;
        const location = helperVenue(timeSlot.venue);
        //if slot not considered
        if (period[slot] == undefined) {
            period[slot] = {
                included: true,
                period : slot,
                location : location
            }
            timetableSummarised.push(period[slot]);
            if (!days[day]) {
                days[day] = true;
                daysDynamic[day] = true;
                totalDays++;
                //totalDaysDynamic++;
            }
        } else {
            //if can go e we go e , else we try go com, go outside if no choice
            if (period[slot].location == 'NA') {
                continue;
            } else if (location == 'NA') {
                period[slot].location = 'NA';
            } else if (period[slot].location == 'EXT' && location == 'COM') {
                period[slot].location = location;
            }
        }

    }
    //end of loop

    //sorting Timetable summarised
    timetableSummarised.sort((x,y) => x.period - y.period);


    //compiled period handling so can be faster
    for (let i = 0; i <=65; i++) {
        if (period[i] != undefined) {
            periodCompiled.push(i);
        }
    }



    return {
        type: 0,
        priority : totalDays == 1 ? 1: 4,
        days : days,
        daysDynamic : daysDynamic,
        totalDays : totalDays,
        totalDaysDynamic : totalDays,
        length : length,
        period : period,
        timetable : timetableSummarised,
        periodCompiled:periodCompiled,
        skip: 'Live',
        moduleCode : moduleCode,
        lessonType : timetable[0].lessonType
    }


}

const arraysEqual = (arr1, arr2) => 
    arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  

const helperSpecial= ((timetable,moduleCode) => {
    const returned = {
        type : 1,
        priority : 3,
        timetable : [],
        skip : 'Live',
        moduleCode : moduleCode,
        lessonType : timetable[0].lessonType
    }
    while (timetable.length != 0) {
        const classNo = timetable[0].classNo;
        const handled = timetable.filter(lesson => {
            return lesson.classNo == classNo;
        })
        const newStuff = helperSpecialOption(handled)
        //console.log(handled);
        //console.log(newStuff);

        //to prevent overlap bruteforce check at pre-processing
        let pushIt = true;
        for (const [index,elements] of returned.timetable.entries()) {
            if (arraysEqual(newStuff.periodCompiled, elements.periodCompiled)) {
                //console.log('considered');
                let firstBetter = true;
                let secondBetter = true;
                for (let i = 0; i < elements.periodCompiled.length; i++) {
                    const timeSlot = elements.periodCompiled[i];
                    const better = compareVenue(
                        newStuff.period[timeSlot].location,
                        elements.period[timeSlot].location                       
                    )
                    //console.log(better);
                    if (better == 1) {
                        secondBetter = false;
                    }
                    if (better == 2) {
                        firstBetter = false;
                    }
                }
                
                if (firstBetter && secondBetter) {
                    // means both equal i.e all location equally good
                    pushIt = false;
                    break;
                } 
                if (firstBetter && !secondBetter) {
                    //newStuff is better than second,we replace incumbent with newStuff
                    returned.timetable[index] = newStuff;
                    pushIt = false;
                    break;
                }
                if (secondBetter && !firstBetter) {
                    //newStuff is worst in all aspects ditch it
                    pushIt = false;
                    break;
                }

            } else {
                continue;
            }
        }

        if (pushIt) {
            returned.timetable.push(newStuff);
        }

        
        
        timetable = timetable.filter(lesson => lesson.classNo != classNo);
    }
    return returned;
})

const helperSpecialOption = ((timetable) => {
    const returned = {
        included : true,
        days : [false,false,false,false,false],
        totalDays : 0,
        timetable : [],
        period : [],
        periodCompiled : []
    }
    for (const element of timetable) {
        const length = (element.endTime - element.startTime)/100;
        const location = helperVenue(element.venue);
        const day = helperDay(element.day);
        //console.log(day);
        const timeSlot = day * 13
            + parseInt(element.startTime)/100 - 8;
        const object = {
            length : length,
            period : timeSlot,
            location : location
        }
        if (returned.days[day] == false) {
            //console.log(hi);
            returned.days[day] = true;
            returned.totalDays++;        
        }
        for (let i = 0; i < length; i++) {
            returned.period[timeSlot + i] = object;
            returned.periodCompiled.push(timeSlot + i);
        }
        returned.timetable.push(object);
    }
    returned.timetable.sort((a,b) => a.period - b.period)
    returned.periodCompiled.sort((a,b) => a - b);
    return returned;
})

const helperVenue = (venue) => {
    if (venue == 'E-Learn_C') {
        return 'NA'
    }
    if (venue.substring(0,3) == 'COM' || venue == 'LT16' || venue == 'LT17' || venue == 'LT18' || venue == 'LT19') {
        return 'COM'
    }
    return 'EXT'
}

const helperDay = (dayString) => {
    return dayString == 'Monday' 
        ? 0
        : dayString == 'Tuesday'
        ? 1
        :dayString == 'Wednesday'
        ? 2
        :dayString == 'Thursday'
        ? 3
        :dayString == 'Friday'
        ? 4
        : 5
}

const compareVenue = (first,second) => {
    //return 0 for same, 1 if first better, 2 if second better;
    if (first == second) {
        return 0;
    } else if (first == 'NA') {
        return 1;
    } else if (second == 'NA') {
        return 2;
    } else if (first == 'COM') {
        return 1;
    } else if (second == 'COM') {
        return 2;
    } else {
        return 0;
    }
}

export default handleData