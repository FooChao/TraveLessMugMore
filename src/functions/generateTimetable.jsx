import React from 'react';
import { TimetableDetailed } from '../App';
import { TimetableSummary } from '../App';
import { LessonsList } from '../App';
import { CustomList } from '../App';



const generateTimetable = () => {

    //console.log(LessonsList);
  
    
    //step 0 : preprocessing datas

    // 0.0 -> initialising variables

        const timetableDetailed = []; // diff from imported
        const timetableSummary = [];  // diff from imported
        const dayOccupied = [false,false,false,false,false,false,false,false,false,false]; //keep check of occupied days
        let activeDays = 0;
        const lunchRemaining = [1,1,1,1,1];
        const lessons = []; //lessons remaining will push in step 0.2


    // 0.1 -> handling custom

        //0.1.1 -> handling travel

        //const travel = CustomList.travel;

        //0.1.2 -> handling schol start -> convert it to period

        const firstPeriod = CustomList.schoolStart - 8;

        //console.log(CustomList.eatLunch);

        // 0.1.3 -> handling lunch -> pushing lunch into timetable/lunchRemaining
        if (CustomList.eatLunch == 'true'){ // if eatLunch
            //console.log(CustomList.eatLunch);
            const lunchStart = CustomList.lunchStart - 8; // convert to period
            const lunchEnd = CustomList.lunchEnd - 8 - 1; // convert to period

            for (let i = 0; i <= 52 ; i = i + 13) {  // handling all weeks data
                for (let j = lunchStart; j <= lunchEnd; j++) { // handling all lunch period
                    timetableSummary[i+j] = 'Lunch';
                }
            }

            const lunchTotal = lunchEnd - lunchStart + 1;
            for(let i = 0; i <= 4; i++) {
                lunchRemaining[i] = lunchTotal; //handling remaining lunch
            }
        }   // else do nothing as all initialised already

        
    
    //0.2 handling lessons

        //0.2.1 putting them into lessons without categorising into modules 
        //as all equally ipt regardless of module

        for (let element of LessonsList) {
            for (let innerElement of element.arrOflesson) {
                lessons.push(innerElement);
            }
        }

        

        //0.2.2 recalculate all lessons priority / days / totalDays based on whether it is included
        // set selected to null
        

        lessons.forEach((element) => {
            //console.log(element);
            zeroUpdateDataOverall(element);
        });

        //0.2.3 sort the lessons by priority

        lessons.sort((a,b) => b.priority - a.priority);  // smallest behind for easier pop


        





    //Step 1 : handling priority 0 and priority -1 (only 1 or 0 option)
        //console.log(lessons);

        for (let i = lessons.length - 1; i >= 0 ; i--) {
            const lesson = lessons[i];
            if (lesson.priority == -1) {  //useless throw away
                lessons.pop();
            } else if (lesson.priority == 0) { //loop through timetable find selected one                 
                for (let i = 0; i < lesson.timetable.length; i++) {
                    if(lesson.timetable[i].included) {  // find needed one
                        let success = false;  // default false 
                        if (lesson.type == 0) { //single session period
                            //console.log('here');
                            success = tryToAddZero(lesson.timetable[i],lesson.moduleCode,lesson.lessonType,lesson.skip,lesson.length,timetableDetailed,timetableSummary,lunchRemaining,dayOccupied); // if success set it to true
                            if (success) {
                                lessons.pop();
                            } else {
                                alert('error adding a single option lesson. They clashed with others of same kind.');
                            }                       
                        } else { //multi session type
                            success = tryToAddOne(lesson.timetable[i],lesson.moduleCode,lesson.lessonType,lesson.skip,timetableDetailed,timetableSummary,lunchRemaining,dayOccupied);
                            if (success) {
                                lessons.pop();                                
                            } else {
                                alert('error adding a single option lesson. They clashed with others of same kind.');
                            }
                        }
                    } // else continue finding the one needed
                            
                }

                
            } else { //no more 0 or -1                 
                break;
            }
        }

        //console.log(lessons);


    //Step 2 : handling priortiy 1 - Blocking out the one day onto the list

    //2.0 blocking

        /*

        for (let i = lessons.length - 1; i >= 0 ; i--) {
            const lesson = lessons[i];
            if (lesson.priority <= 1) {
                //console.log(lesson);
                if (lesson.type == 0){
                    // loop through lesson.days to find the day and block
                    for (let j = 0; j < 5; j++) {
                        //console.log(lesson.days[j]);
                        if (lesson.days[j]) {
                            //console.log(j);
                            dayOccupied[j] = true;
                            break;
                        }
                    }
                    lesson.priority = 4; // change its priority will resort later
                } else {
                    lesson.priotity = 3; // technically shouldn't happen as type 1 lesson won't be priority 1
                }  
                    
            } else {
                break;
            }
        }
            */

    //2.1:  clean-up active days

        activeDays = 0;
        for (let i = 0; i < 5; i++) {
            if (dayOccupied[i] != false) {
                activeDays++;
            }
        }
    //2.1.1 : resorting

        //lessons.sort((a,b) => b.priority - a.priority);        
        

    //Step 3 : handling recorded -> decided to ditch orignial plan so change them all to priority 3/4

    for (let i = lessons.length - 1; i >= 0 ; i--) {
        const lesson = lessons[i];
        if (lesson.priority >2) {  //useless throw away
            break;
        } else { //loop through timetable find selected one                 
            if (lesson.type == 1) {
                lesson.priortiy = 3;
            } else {
                lesson.priortiy =4;
            }                        
        } 
    }

    lessons.sort((a,b) => b.priority - a.priority); //resort


    // Step 4: Brute force
    let currentBestTS = [];
    let currentBestTD = [];
    let currentBestTotalStartTimePeriod = 100;
    let currentBestTotalEndTimePeriod = 100;
    let currentBestDays = 8;

    
    

    const slave = (lessons, dayOccupied, lunchRemaining) => {
        let totalDays = 0;  
        let totalStartTimePeriod = 0;
        let totalEndTimePeriod = 0;
        /*
        dayOccupied.forEach(truthy => { 
            if (truthy !== false) {
                totalDays++;
                totalStartTimePeriod = totalStartTimePeriod + truthy;
            }
        })
            */
        for (let i = 0; i < 5; i++) {
            let truthy = dayOccupied[i];
            if (truthy !== false) {
                totalDays++;
                totalStartTimePeriod = totalStartTimePeriod + truthy;
            }
        }
        for (let i = 5; i < 10; i++) {
            let truthy = dayOccupied[i];
            if (truthy != false) {
                totalEndTimePeriod = totalEndTimePeriod + truthy;
            }
        }
        if (totalDays > currentBestDays) { // can never be better than best skip to save time
            return;
        }
        if (totalDays == currentBestDays && totalStartTimePeriod < currentBestTotalStartTimePeriod) {
            return;
        }
        if (totalDays == currentBestDays && totalStartTimePeriod == currentBestTotalStartTimePeriod && totalEndTimePeriod > currentBestTotalEndTimePeriod) {
            return;
        }
        
        if (lessons.length == 0) { // ended
            if (totalDays < currentBestDays) {
                currentBestTS = [...timetableSummary];
                currentBestTD = [...timetableDetailed]; // max 5 times
                currentBestDays = totalDays;
                currentBestTotalStartTimePeriod = totalStartTimePeriod;
                currentBestTotalEndTimePeriod = totalEndTimePeriod;
                return;
            }
            if (totalDays == currentBestDays && totalStartTimePeriod < currentBestTotalStartTimePeriod) {
                return;
            }
            if (totalDays == currentBestDays && totalStartTimePeriod == currentBestTotalStartTimePeriod && totalEndTimePeriod > currentBestTotalEndTimePeriod) {
                /*
                console.log('saved');
                console.log(currentBestTD);
                console.log(currentBestTotalEndTimePeriod);
                console.log('new');
                console.log(lessons);
                console.log(totalEndTimePeriod);
                */

                return;
            }
            currentBestTS = [...timetableSummary];
            currentBestTD = [...timetableDetailed]; // max 5 times
            currentBestDays = totalDays;
            currentBestTotalStartTimePeriod = totalStartTimePeriod;
            currentBestTotalEndTimePeriod = totalEndTimePeriod;
            return;
        }

        
        const lesson = lessons.pop();
        //console.log(lesson);
        if (lesson.type == 0) {
            for (let i = 0; i < lesson.timetable.length; i++) {
                
                const added = lesson.timetable[i];
                if(added.included === false) {
                    continue;
                }
                const timeSlot = added.period;
                if (lesson.skip != 'Recorded' && added.period%13 < firstPeriod){  // means live but earlier than first accepted school hours
                    continue;
                }
                const archivedLunchRemaining = [...lunchRemaining];
                const archivedDayOccupied = [...dayOccupied];
                const archivedTimetableDetailed = [];
                const archivedTimetableSummary = [];
                const endpoint = Math.max(lesson.length,2);
                for (let i = 0; i < endpoint; i++) {
                    archivedTimetableDetailed[i] = timetableDetailed[i+timeSlot];
                    archivedTimetableSummary[i] = timetableSummary[i+timeSlot];                
                }

                if (tryToAddZero(added,lesson.moduleCode,lesson.lessonType,lesson.skip,lesson.length,timetableDetailed,timetableSummary,lunchRemaining,dayOccupied)) {
                    //success then recursively calls
                    slave(lessons,dayOccupied,lunchRemaining);
                    // then reset back
                    for (let i = 0; i < endpoint; i++) {   //reset
                        timetableDetailed[i+timeSlot] = archivedTimetableDetailed[i];
                        timetableSummary[i+timeSlot] =archivedTimetableSummary[i];
                    }
                    for (let i = 0; i <= 4; i++) {
                        lunchRemaining[i] = archivedLunchRemaining[i];
                        //dayOccupied[i] = archivedDayOccupied[i];
                    }
                    for (let i = 0 ; i <= 9; i++) {
                        dayOccupied[i] = archivedDayOccupied[i];
                    }
                    //and continue
                } else {
                    continue;
                }
            }
        } else {  // lesson type = 1
            for (let i = 0; i < lesson.timetable.length; i++) {
                const added = lesson.timetable[i];
                let shouldContinue = false;

                if(added.included === false) {
                    continue;
                }

                added.timetable.forEach((timeSlot) => {
                    if (lesson.skip !== 'Recorded' && timeSlot.period % 13 < firstPeriod) {
                        shouldContinue = true;
                        return;  // Continue the forEach loop
                    }
                });

                if (shouldContinue) {
                    continue;  // Continue the outer loop
                }
                const archivedLunchRemaining = [...lunchRemaining];
                const archivedDayOccupied = [...dayOccupied];
                const archivedTimetableDetailed = [...timetableDetailed];
                const archivedTimetableSummary = [...timetableSummary];
                if (tryToAddOne(added,lesson.moduleCode,lesson.lessonType,lesson.skip,timetableDetailed,timetableSummary,lunchRemaining,dayOccupied)) {
                    //success then recursively calls
                    slave(lessons,dayOccupied,lunchRemaining);
                    // then reset back
                    for (let i = 0; i < 65; i++) {   //reset
                        timetableDetailed[i] = archivedTimetableDetailed[i];
                        timetableSummary[i] =archivedTimetableSummary[i];
                    }
                    for (let i = 0; i <= 4; i++) {
                        lunchRemaining[i] = archivedLunchRemaining[i];
                        //dayOccupied[i] = archivedDayOccupied[i];
                    }

                    for (let i = 0; i <=9; i++) {
                        dayOccupied[i] = archivedDayOccupied[i];
                    }
                    //and continue
                } else {
                    continue;
                }

            }

        }
        lessons.push(lesson);
        

    }

    //console.log('start');

    slave(lessons,dayOccupied, lunchRemaining);

    //console.log('end');

    //console.log(currentBestTD);
    //console.log(currentBestTS);

    for (let i = 0 ; i < 65; i++) {
        timetableDetailed[i] = currentBestTD[i];
        timetableSummary[i] = currentBestTS[i];
    }

    

        //console.log(lessons);  //reference
        TimetableDetailed[0] = timetableDetailed;
        TimetableSummary[0] = timetableSummary;
        //console.log(timetableDetailed);
        //console.log(timetableSummary);
        //console.log(dayOccupied);
        //console.log(lunchRemaining);
        


}


// for Step 0.2.2
const zeroUpdateDataOverall = (lesson ) => { //zero representing the step
    lesson.selected = undefined; // hard reset selected first if present
    if (lesson.type == 0) {
        zeroUpdateDataZero(lesson);
    } else {
        zeroUpdateDataOne(lesson);
    }

}

const zeroUpdateDataZero = (lesson) => {
    // hard reset first
    lesson.days = [false,false,false,false,false]; 
    lesson.totalDays = 0;
    let options = 0;
    //loop through all in periodCompiled
    lesson.timetable.forEach((timeSlot) => {
        //const timeSlot = lesson.period[numeral];
        //console.log(timeSlot);
        if (timeSlot.included) { // if included
            //console.log('hi');
            const day = Math.floor(timeSlot.period / 13);
            options++;
            
            if (!lesson.days[day]) { // days still false
                lesson.days[day] = true; //set it true
                lesson.totalDays++; //increment totalDays
            }
            // else do absolutely nothing
        }
        
    });

    //console.log('options');
    //console.log(options)

    //console.log(options);
    
    if (options == 0) {
        //nothing included
        //user is a troller so we exclude the whole thing
        lesson.selected = null;
        lesson.priority = -1;
    } else if (options == 1) {
        //only 1 included
        lesson.priority = 0; // we handle selected later
    } else if (lesson.totalDays == 1) {
        //only 1 day
        lesson.priority = 1;
    } else if (lesson.skip == 'Recorded') {
        lesson.priority = 2;
    } else {
        lesson.priority = 4;
    }
}

const zeroUpdateDataOne = (lesson) => {
    let options = 0;
    lesson.timetable.forEach(option => {
        if (option.included) {
            options++;
        }
    });
    
    if (options == 0) {
        //nothing included
        //user is a troller so we exclude the whole thing
        lesson.selected = null;
        lesson.priority = -1;
    } else if (options == 1) {
        //only 1 included
        lesson.priority = 0; // we handle selected later
    } else if (lesson.skip == 'Recorded') {
        lesson.priority = 2;
    } else {
        lesson.priority = 3;
    }
}





//For step 1

const tryToAddZero = (newTimetable,newModuleCode,newLessonType,newLessonSkip,newLessonLength,timetableDetailed,timetableSummary,lunchRemaining,dayOccupied) => { // newTimetable (included,period,location)
    //console.log('hi');
    const timeSlot = newTimetable.period;
    const incumbent = timetableSummary[timeSlot];
    const incumbentDet = timetableDetailed[timeSlot]; // may need to replace it back if first succeed second fail
    const next = timetableSummary[timeSlot+1];
    const nextDet = timetableDetailed[timeSlot+1];
    const dayToAdd = Math.floor(timeSlot/13);
    let lunchConsumed = false; // if consumed in firstPeriod add it back if needed

    //handle edge case first
    if (newLessonLength > 2) {
        const archivedLunchRemaining = [...lunchRemaining];
        const archivedTimetableDetailed = [];
        const archivedTimetableSummary = [];
        let success = true;

        for (let i = 0; i < newLessonLength; i++) {
            archivedTimetableDetailed[i] = timetableDetailed[i+timeSlot];
            archivedTimetableSummary[i] = timetableSummary[i+timeSlot];
            success = success && helper(newLessonSkip,i+timeSlot,timetableSummary[i+timeSlot],timetableDetailed[i+timeSlot]); //try add all
        }

        if (success) {
            if (newLessonSkip == 'Live' || newLessonSkip == 'JoinAny'){
                if (dayOccupied[dayToAdd] === false) {
                    dayOccupied[dayToAdd] = timeSlot%13;
                    dayOccupied[dayToAdd+5] = timeSlot%13 + newLessonLength-1;
                } else {
                    dayOccupied[dayToAdd] = Math.min(dayOccupied[dayToAdd],timeSlot%13);
                    dayOccupied[dayToAdd+5] = Math.max(dayOccupied[dayToAdd+5], timeSlot%13 + newLessonLength -1);
                }
                
            }
            return true;
        } else {
            for (let i = 0; i < newLessonLength; i++) {   //reset
                timetableDetailed[i+timeSlot] = archivedTimetableDetailed[i];
                timetableSummary[i+timeSlot] =archivedTimetableSummary[i];
            }
            for (let i = 0; i <= 4; i++) {
                lunchRemaining[i] = archivedLunchRemaining[i];
                
            }
            return false;    

        }

        
    }

    const firstPeriod = newLessonSkip; // first period is always new Lesson Skip
    //console.log(firstPeriod);
    let secondPeriod;

    if (newLessonLength == 2) {
        secondPeriod = newLessonSkip;
    } else if (newLessonSkip == 'Recorded') {
        secondPeriod = null;
    } else if (CustomList.travel == 'false') {
        secondPeriod = null;
    } else {
        secondPeriod = 'TravelOut'
    }
    /*
    if (newTimetable.location == 'COM') {
        secondPeriod = 'TravelOut';
    } else {
        secondPeriod = 'TravelBack';
    }
        */

    //console.log(CustomList.travel);
    //console.log(secondPeriod);


    

    const success = helper(firstPeriod,timeSlot,incumbent,incumbentDet);
    if (!success) {
        return false; // if firstPeriod fail already no need try
    }

    if(secondPeriod == null) {  // no second period straight return
        if (newLessonSkip == 'Live' || newLessonSkip == 'JoinAny'){
            if(dayOccupied[dayToAdd] == false) {
                dayOccupied[dayToAdd] = timeSlot%13;
                dayOccupied[dayToAdd+5] = timeSlot%13;
            } else {
                dayOccupied[dayToAdd] = Math.min(timeSlot%13,dayOccupied[dayToAdd]);
                dayOccupied[dayToAdd+5] = Math.max(timeSlot%13,dayOccupied[dayToAdd+5])
            }
        }
        return true;
    }

    if (helper(secondPeriod,timeSlot+1,next,nextDet)) {
        if (newLessonSkip == 'Live' || newLessonSkip == 'JoinAny'){
            if(dayOccupied[dayToAdd] == false) {
                dayOccupied[dayToAdd] = timeSlot%13;
                dayOccupied[dayToAdd+5] = timeSlot%13 + newLessonLength -1;
            } else {
                dayOccupied[dayToAdd] = Math.min(timeSlot%13,dayOccupied[dayToAdd]);
                dayOccupied[dayToAdd+5] = Math.max(dayOccupied[dayToAdd+5],timeSlot%13 + newLessonLength -1);
            }
        }
        return true;
    } else {
        if(lunchConsumed) {
            lunchRemaining[dayToAdd]++;
        }
        timetableSummary[timeSlot] = incumbent; //reset back
        timetableDetailed[timeSlot] = incumbentDet; //reset back
        return false;
    }

    // five cases for eachPeriod
    function helper(added, placeToAdd,current,currentDetails){
        if (added == 'Live') {
            switch (current) {
                case 'Live' :
                case 'Stacked' :
                case 'Recorded' :
                case 'JoinAny' : 
                case 'RecordedLunch' :
                case 'RecordedTravelBack' :
                case 'RecordedTravelOut' :
                case 'RecordedLunchTravelOut' :
                case 'TravelBack' :
                case 'LunchTravelBack' :
                case 'RecordedLunchTravelBack' :
                    return false;
                case 'TravelOut' :
                    if (newTimetable.location === timetableDetailed[placeToAdd]) { // no need travel same location
                        timetableSummary[placeToAdd] = added;
                        timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                        return true;
                    } else {
                        return false;
                    }           
    
                case 'Lunch' :
                    if (lunchRemaining[dayToAdd] > 1) {  // still can waste one lunch period
                        lunchRemaining[dayToAdd]--;
                        lunchConsumed = true;
                        timetableSummary[placeToAdd] = added;
                        timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                        return true;
                    } else {
                        return false;
                    }
                case 'LunchTravelOut' :
                    if (lunchRemaining[dayToAdd] > 1) {  // still can waste one lunch period
                        if (newTimetable.location === timetableDetailed[placeToAdd]) { // no need travel same location
                            lunchRemaining[dayToAdd]--;
                            lunchConsumed = true;
                            timetableSummary[placeToAdd] = added;
                            timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                            return true;
                        } else {
                            return false;
                        }
                        
                    } else {
                        return false;
                    }
                default : //undefined
                    timetableSummary[placeToAdd] = added;
                    timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                    return true;
            }

        } else if (added == 'JoinAny') {
            switch (current) {
                case 'Live' :
                case 'Stacked' :
                case 'JoinAny' : 
                case 'RecordedTravelBack' :
                case 'TravelBack' :
                case 'RecordedLunchTravelBack' :
                case 'LunchTravelBack':
                    return false;                
                case 'Recorded' :
                    timetableSummary[placeToAdd] = 'Stacked';
                    timetableDetailed[placeToAdd] = [
                        [newModuleCode,newLessonType,newTimetable.location],
                        timetableDetailed[placeToAdd]
                    ];
                    return true;               
                case 'RecordedTravelOut' :
                    if (newTimetable.location === timetableDetailed[placeToAdd][1]) { 
                        timetableSummary[placeToAdd] = 'Stacked';
                        timetableDetailed[placeToAdd] = [
                            [newModuleCode,newLessonType,newTimetable.location],
                            timetableDetailed[placeToAdd][0]
                        ];
                        return true;
                    } else {
                        return false;
                    }                
                case 'TravelOut' :
                    //console.log(timetableDetailed[placeToAdd]);
                    if (newTimetable.location === timetableDetailed[placeToAdd]) { // no need travel same location
                        timetableSummary[placeToAdd] = added;
                        timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                        return true;
                    } else {
                        return false;
                    }
                case 'Lunch' :
                    if (lunchRemaining[dayToAdd] > 1) {  // still can waste one lunch period
                        lunchRemaining[dayToAdd]--;
                        lunchConsumed = true;
                        timetableSummary[placeToAdd] = added;
                        timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                        return true;
                    } else {
                        return false;
                    }  
                case 'LunchTravelOut' :
                    if (lunchRemaining[dayToAdd] > 1 && newTimetable.location === timetableDetailed[placeToAdd]) {  // still can waste one lunch period
                        lunchRemaining[dayToAdd]--;
                        lunchConsumed = true;
                        timetableSummary[placeToAdd] = added; // can just put joinAny as only recorded can stack with joinAny
                        timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                        return true;
                    } else {
                        return false;
                    } 

                case 'RecordedLunch' :
                    if (lunchRemaining[dayToAdd] > 1) {  // still can waste one lunch period
                        lunchRemaining[dayToAdd]--;
                        lunchConsumed = true;
                        timetableSummary[placeToAdd] = 'Stacked';
                        timetableDetailed[placeToAdd] = [
                        [newModuleCode,newLessonType,newTimetable.location],
                        timetableDetailed[placeToAdd]
                    ];
                        return true; 
                    } else {
                        return false;
                    }
                    case 'RecordedLunchTravelOut' :
                        if (lunchRemaining[dayToAdd] > 1 && newTimetable.location === timetableDetailed[placeToAdd][1]) {  // still can waste one lunch period
                            lunchRemaining[dayToAdd]--;
                            lunchConsumed = true;
                            timetableSummary[placeToAdd] = 'Stacked';
                            timetableDetailed[placeToAdd] = [
                                [newModuleCode,newLessonType,newTimetable.location],
                                timetableDetailed[placeToAdd][0]
                            ];
                            return true; 
                        } else {
                            return false;
                        }
                                  
                default : //undefined
                    timetableSummary[placeToAdd] = added;
                    timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                    return true;
             
            }

        } else if (added == 'Recorded') {
            switch (current) {
                case 'Live' :
                case 'Stacked' :
                case 'Recorded' :
                case 'RecordedLunch' :
                case 'RecordedTravelBack' :
                case 'RecordedTravelOut' :
                case 'RecordedLunchTravelOut' :
                case 'RecordedLunchTravelBack' :
                    return false; //recorded lesson on paper of courserekt can't be stacked
                case 'JoinAny' : 
                    timetableSummary[placeToAdd] = 'Stacked';
                    timetableDetailed[placeToAdd] = [
                        timetableDetailed[placeToAdd],
                        [newModuleCode,newLessonType,newTimetable.location]
                    ];
                return true;
                case 'TravelBack' :
                    timetableSummary[placeToAdd] = 'RecordedTravelBack';
                    timetableDetailed[placeToAdd] = [[newModuleCode,newLessonType,newTimetable.location],timetableDetailed[placeToAdd]];
                    return true; 
                case 'TravelOut' :
                    timetableSummary[placeToAdd] = 'RecordedTravelOut';
                    timetableDetailed[placeToAdd] = [[newModuleCode,newLessonType,newTimetable.location],timetableDetailed[placeToAdd]];
                    return true;
                case 'Lunch' : //it is recorded we can still eat lunch
                    timetableSummary[placeToAdd] = 'RecordedLunch';
                    timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                    return true;  
                case 'LunchTravelOut' :
                    timetableSummary[placeToAdd] = 'RecordedLunchTravelOut';
                    timetableDetailed[placeToAdd] = [[newModuleCode,newLessonType,newTimetable.location],timetableDetailed[placeToAdd]];
                case 'LunchTravelBack' :
                    timetableSummary[placeToAdd] = 'RecordedLunchTravelBack';
                    timetableDetailed[placeToAdd] = [[newModuleCode,newLessonType,newTimetable.location],timetableDetailed[placeToAdd]];                   
                default : //undefined
                    timetableSummary[placeToAdd] = 'Recorded';
                    timetableDetailed[placeToAdd] = [newModuleCode,newLessonType,newTimetable.location];
                    return true; 
             
            }
            

        } else if (added == 'TravelBack') {   // this portion shouldn't happen anymore this is part of previous version

            console.log('shouldnt happen');
            
            switch (current) {
                case 'Live' :
                case 'Stacked' :
                case 'JoinAny' :
                    return false; //because ext venue need time to travel                
                case 'Recorded' :
                    timetableSummary[placeToAdd] = 'RecordedTravelBack'; 
                    return true;               
                case 'RecordedTravelBack' :
                case 'RecordedTravelOut' :
                case 'TravelBack' :
                case 'TravelOut' :
                case 'LunchTravelOut' :
                case 'RecordedLunchTravelOut':
                case 'LunchTravelBack' :
                case 'RecordedLunchTravelBack':                
                    return false; //shouldn't happen in first place as all travelling is is preceded by live lesson which cannot clash
                case 'RecordedLunch' :
                    timetableSummary[placeToAdd] = 'RecordedLunchTravelBack';
                    return true;
                case 'Lunch' :  
                    timetableSummary[placeToAdd] = 'LunchTravelBack';  
                    return true;                
                default : //undefined
                    timetableSummary[placeToAdd] = 'TravelBack';
                    return true;
             
            }

        } else if (added == 'TravelOut') {
            
            switch (current) {
                case 'Live' :
                case 'JoinAny' :
                    if ((timetableDetailed[placeToAdd][2]) === newTimetable.location ) {
                        return true
                    } else {
                        return false;
                    }
                case 'Stacked' :
                    if ((timetableDetailed[placeToAdd][0][2]) === newTimetable.location) {
                        return true
                    } else {
                        return false;
                    }                 
                case 'Recorded' :
                    timetableSummary[placeToAdd] = 'RecordedTravelOut';
                    //console.log('1');
                    timetableDetailed[placeToAdd] = [timetableDetailed[placeToAdd],newTimetable.location];
                    return true;
                case 'RecordedLunch' :
                    timetableSummary[placeToAdd] = 'RecordedLunchTravelOut';
                    timetableDetailed[placeToAdd] = [timetableDetailed[placeToAdd],newTimetable.location];
                    return true;
                case 'RecordedTravelBack' :
                case 'RecordedTravelOut' :
                case 'TravelBack' :
                case 'TravelOut' :
                case 'LunchTravelOut' :
                case 'RecordedLunchTravelOut':
                case 'LunchTravelBack' :
                case 'RecordedLunchTravelBack':
                    return false; // shouldn't happen in first place
                case 'Lunch' :
                    timetableSummary[placeToAdd] = 'LunchTravelOut';
                    timetableDetailed[placeToAdd] = newTimetable.location;
                    return true;
                default : //undefined
                    timetableSummary[placeToAdd] = 'TravelOut';
                    timetableDetailed[placeToAdd] = newTimetable.location;
                    return true;
             
            }

        } else {
            return false;  // shouldn't reach here
        }
    }
   

}

const tryToAddOne = (newTimetable,newModuleCode,newLessonType,newLessonSkip,timetableDetailed,timetableSummary,lunchRemaining,dayOccupied) => {
    // tryToAddZero (newTimetable,newModuleCode,newLessonType,newLessonSkip,newLessonLength,timetableDetailed,timetableSummary,lunchRemaining,dayOccupied)
    let allSucceed = true;
    const archivedTimetableDetailed = [...timetableDetailed];
    const archivedTimetableSummary = [...timetableSummary];
    const archivedLunchRemaining = [...lunchRemaining];
    const archivedDayOccupied = [...dayOccupied];
    newTimetable.timetable.forEach((needed) => {
        allSucceed = allSucceed && tryToAddZero(needed,newModuleCode,newLessonType,newLessonSkip,needed.length,timetableDetailed,timetableSummary,lunchRemaining,dayOccupied);
    })
    if (allSucceed) {
        return true;
    } else {
        for (let i = 0; i <= 64; i++) {
            timetableDetailed[i] = archivedTimetableDetailed[i];
            timetableSummary[i] = archivedTimetableSummary[i];
        }
        for (let i = 0; i <= 4; i++) {
            lunchRemaining[i] = archivedLunchRemaining[i];
            //dayOccupied[i] = archivedDayOccupied[i];
        }

        for (let i = 0; i <=9 ; i++) {
            dayOccupied[i] = archivedDayOccupied[i];
        }
        return false;
    }
}

export default generateTimetable