export default function getCurrentDate() {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = d.getHours(),
    mintues = d.getMinutes();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return {date:[day, month, year].join('/'),time: [hours,mintues].join(':')}
}


