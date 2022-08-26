//some shared functions

import dayjs from "dayjs";

export function getMonth(month = dayjs().month()){
    //to avoid decimal value for month
    month = Math.floor(month);
let now = dayjs();

console.log(now.toString());
console.log(now.format());
    const year = dayjs().year()
    //to calculate the first day of the month
    //if it is Monday, Tuesday..
    //We need to put into a multi-dimensional array
    const firstDayOfTheMonth = dayjs(new Date(year,month,0)).day()
    //console.log("firstday of month:" +firstDayOfTheMonth)
   //say June 2022, firstdayofthemonth = wednesday(3)
   //current month count = 0 - 3 (takes the pointer to sunday)
    let currentMonthCount = 0 - firstDayOfTheMonth;
    
    //currentMonthCount++
    //console.log(currentMonthCount)
    //let datese = dayjs(new Date(year, month, currentMonthCount)).date();
    //console.log("date" +datese)

    //5 rows(for days) and 7 columns(for week)
    //create an array with 5 rows, and each row to be filled with a blank array and map this array
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            //console.log(dayjs(new Date(year, month, currentMonthCount)));
            return dayjs(new Date(year,month, currentMonthCount))
            
        })
    })
    return daysMatrix
}


