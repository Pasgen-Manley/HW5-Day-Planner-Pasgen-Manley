// Displaying the current day using moment.js
var currentDay = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);


//Varibles
var currentTime = moment();
var plannerContainer = $(".container");
var hourArray = []


// Functions callbacks
createHourArray();
createTimeBlocks();

// Create Hour Array
function createHourArray() {
    for (i = 0; i < 9; i++) {
        var hour = moment().hour(i + 9).format("hA")
        hourArray.push(hour);
        console.log(hourArray);
    }
    
}
// Start by creating for loop which creates day planner table.

function createTimeBlocks() {
    for (i = 0; i < hourArray.length; i++) {
        var timeBlockRow = $('<div>');
        var hourCol = $('<div>');
        var eventCol = $('<textarea>')
        var saveCol = $('<button>');

        timeBlockRow.addClass('row time-block');
        hourCol.addClass('hour col-2').attr('data-hour');
        hourCol.text(hourArray[i]);
        eventCol.addClass('description col-8');
        saveCol.addClass('saveBtn col-2').html("<i class=\"far fa-save\"></i>");

        plannerContainer.append(timeBlockRow);
        timeBlockRow.append(hourCol, eventCol, saveCol);

        // Change colors of timeblocks depending on the time of day
        //if current time of day timeblock displays red
        if (currentTime.isSame(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(eventCol).addClass('present');
            //if in the future, display green
        } else if (currentTime.isBefore(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(eventCol).addClass('future');
            // If in the past display grey
        } else if (currentTime.isAfter(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(eventCol).addClass('past');
        }
    }
    
};
 
