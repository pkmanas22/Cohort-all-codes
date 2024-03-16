function leadingZeros(value) {
    if (value < 10) {
        return ('0' + value).toString();
    }
    return value.toString();
}

function handleAmPm(hrs, mins, secs) {
    if (hrs >= 12) {
        if (hrs !== 12) {
            hrs -= 12;
        }
        console.log(hrs + ":" + mins + ":" + secs + " PM");
    }else{
        if (hrs == 0) {
            hrs = 12;
        }
        console.log(hrs + ":" + mins + ":" + secs + " AM");
    }
}

function printTime() {
    const d = new Date();

    const hrs = leadingZeros(d.getHours());
    const mins = leadingZeros(d.getMinutes());
    const secs = leadingZeros(d.getSeconds());

    console.log(hrs + ":" + mins + ":" + secs);
    handleAmPm(hrs, mins, secs);
    setTimeout(printTime, 1000);
}
printTime()