// Displaying the current day using moment.js
var currentDay = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);


//Varibles
var currentTime = moment();
var plannerContainer = $(".container");
var hourArray = [];

// Function callbacks
createHourArray();
createTimeBlocks();
renderEvents();




// Create Hour Array
function createHourArray() {
    for (i = 0; i < 9; i++) {
        var hour = moment().hour(i + 9).format("hA")
        hourArray.push(hour);
        console.log(hourArray);
    };
    
};


//$('button').each(function () {


function renderEvents() {
    var displayEvent = JSON.parse(localStorage.getItem("events"));
    $("textarea").empty();
    $.each(hourArray, function (i, value){
        $("#text" + i).text(displayEvent[i]);
       
    });
    //console.log(displayEvent);
};
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
        eventCol.addClass('description col-8').attr("id", "text" + i).attr("data-row", i);
        saveCol.addClass('saveBtn col-2').attr("id", "buttonNumber" + i).attr("data-row", i).html("<i class=\"far fa-save\"></i>");

        plannerContainer.append(timeBlockRow);
        timeBlockRow.append(hourCol, eventCol, saveCol);

       
        // Change colors of timeblocks depending on the time of day
        // If current time of day timeblock displays red
        if (currentTime.isSame(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(eventCol).addClass('present');
            // if in the future, display green
        } else if (currentTime.isBefore(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(eventCol).addClass('future');
            // If in the past display grey
        } else if (currentTime.isAfter(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(eventCol).addClass('past');
        };
    };
    
    
    $('.saveBtn').on('click', function() {
        //console.log(hourArray);
        var eventInput = $(this).siblings('.description').val();
        //console.log($(this));

        localStorage.setItem("events", JSON.stringify(eventInput));
        //console.log(localStorage);
    });

};

// Saving 
// map function. transform an array to empty text values.