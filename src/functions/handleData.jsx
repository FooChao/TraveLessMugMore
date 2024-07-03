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

    console.log(LessonsList);

    lessonRefresher();
    

}

const helperBoss = (timetable,moduleCode) => {
    if (timetable.length <= 1) {
        return helperNoOption(timetable,moduleCode);
    } else {
        return helperNormal(timetable,moduleCode);
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
            if (period[slot].location == '-') {
                continue;
            } else if (location == '-') {
                period[slot].location = '-';
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
            if (period[slot].location == '-') {
                continue;
            } else if (location == '-') {
                period[slot].location = '-';
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

const helperVenue = (venue) => {
    if (venue == 'E-Learn_C') {
        return '-'
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

export default handleData