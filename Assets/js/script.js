// Displaying the current day using moment.js
var currentDay = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);


//Varibles
var currentTime = moment();
var plannerContainer = $(".container");
var hourArray = [];
var target_id = "";
var eventArray = [];

// Function callbacks
createHourArray();
createTimeBlocks();
renderEvents();




// Create Hour Array
function createHourArray() {
    for (i = 0; i < 9; i++) {
        var hour = moment().hour(i + 9).format("hA")
        hourArray.push(hour);
        eventArray.push("");
        console.log(eventArray);
        console.log(hourArray);
    };  
};




function renderEvents() {
    var displayEvent = JSON.parse(localStorage.getItem("events"));
    $("textarea").empty();
    $.each(hourArray, function (i, value){
        $("#text" + i).text(displayEvent[i]); 
    });    
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
    
    // Set item click function
    $('.saveBtn').on('click', function(event) {
        
        target_id = event.target.getAttribute("data-row");
        console.log(target_id);
        
        var eventInput = $(this).siblings('.description').val();
        eventArray[target_id] = eventInput;
        console.log(eventArray);
        
        localStorage.setItem("events", JSON.stringify(eventArray));
    });
};
