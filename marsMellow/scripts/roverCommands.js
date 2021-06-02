// -----------------------------------------------------------------------
// Code to run when site loads
// -----------------------------------------------------------------------

getRoverData();

// Check if timer was running
savedTimerValue = window.localStorage.getItem('timer');
if (savedTimerValue > 0) {
    startTimer(savedTimerValue);
}

// Countdown Time for Interface (Min * Seconds)
var timeToCountDown = 4 * 60;

// Get Science Locations
getScience();


// -----------------------------------------------------------------------
// Movement Controls
// -----------------------------------------------------------------------

var movementDirection = "";


// Assign Direction to move in

function setMovementDirection(direction) {

    movementDirection = direction;
    resetMovementArrows();

    switch (direction) {
        case 'turnLeft':
            document.getElementById("moveLeftButton").classList.add("selected");
            break;
        case 'moveForward':
            document.getElementById("moveForwardButton").classList.add("selected");
            break;
        case 'moveBack':
            document.getElementById("moveBackwardButton").classList.add("selected");
            break;
        case 'turnRight':
            document.getElementById("moveRightButton").classList.add("selected");
            break;
    
        default:
            break;
    }
}

function resetMovementArrows() {
    document.getElementById("moveLeftButton").classList.remove("selected");
    document.getElementById("moveForwardButton").classList.remove("selected");
    document.getElementById("moveBackwardButton").classList.remove("selected");
    document.getElementById("moveRightButton").classList.remove("selected");

}

// Execute the Movement

function executeMovement() {


    // Rover Movement/Rotation
    // ----------------------------

    var movementAmount = document.getElementById("moveAmountInput").value;

    // Reset the fields
    resetMovementArrows();
    document.getElementById("moveAmountInput").value = "";

    // TODO: Send Move Command
    console.log("move direction: " + movementDirection);
    console.log("move by: " + movementAmount);

    // Camera Rotation
    // ----------------------------

    var camerRotation = document.getElementById("camerRotationInput").value;

    // Rotate the Camera Icon
    setCameraIconRotation(0);

    // Reset the fields
    document.getElementById("camerRotationInput").value = "";

    // TODO: Send Rotate Command
    console.log("rotate camera by: " + camerRotation);

      $.ajax("http://www.beyondthepines.co/marsMellow/updateControl.php?id=1&command="+ movementDirection + "&distance=" + movementAmount +"&cameraAngle=" + camerRotation);

    // Start Timer
    setNextCommand(movementDirection + " for " + movementAmount + " Miliseconds with " + camerRotation + "' Camera Rotation");
    startTimer(timeToCountDown);
};

// Rotate the Camera Icon
function setCameraIconRotation(rotationDegrees = 0) {

    var camerIcon = document.getElementById("roverCamIcon");
    console.log(parseInt(rotationDegrees)-90);
    var rotationVal = parseInt(rotationDegrees)-90;
    camerIcon.style.transform = "rotate(" + rotationVal + "deg)";
}


// -----------------------------------------------------------------------
// Science
// -----------------------------------------------------------------------

function getScience() {
    var science1Value = window.localStorage.getItem('Science 1');
    var science1ValueTime = window.localStorage.getItem('Science 1time');

    var table = document.getElementById("scienceTable");

    // Remove items from existing table
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }

    // Add headings to Table
    var headRow = table.insertRow(0);
    var cell1 = headRow.insertCell(0);
    var cell2 = headRow.insertCell(1);
    var cell3 = headRow.insertCell(2);
    cell1.innerHTML = "Location";
    cell2.innerHTML = "Data";
    cell3.innerHTML = "Time";

    // Add items to Table
    for (let i = 0; i < 5; i++) {
       var scienceValue = window.localStorage.getItem('Science ' + (i+1));
       var scienceTime= window.localStorage.getItem('Science ' + (i+1) + 'time');

       if (scienceValue) {
        var scienceName = "Science " + (i+1);
        switch (scienceName) {
            case 'Science 1':
                scienceName = 'Foodbar Valley';
                break;
            case 'Science 2':
                scienceName = "The Devil's Circle";
                break;
            case 'Science 3':
                scienceName = 'Outback Rock';
                break;
            case 'Science 4':
                scienceName = "Mow Mow's Canyon";
                break;
            case 'Science 5':
                scienceName = 'Week Eight';
                break;
            default:
                break;
        }

        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = scienceName;
        cell2.innerHTML = scienceValue;
        cell3.innerHTML = scienceTime;
       }
    }

    console.log(science1Value);
    console.log(science1ValueTime); 
};

var shouldScienceBeCaptured = false;

function executeCaptureScience() {

    shouldScienceBeCaptured = true;

    // Start Timer
    setNextCommand("Capture Science");
    startTimer(timeToCountDown);
};

// -----------------------------------------------------------------------
// Rover Data
// -----------------------------------------------------------------------

function getRoverData() {

    // TODO: Get stats from the server
    var internalTemp = "--";
    var frontDistance = "--";
    var externalTemp = "--";
    var externalHumidity = "--";
    var batteryVoltage = "--";

    document.getElementById('internalTemp').innerHTML = internalTemp + " °C";
    document.getElementById('frontDistance').innerHTML = frontDistance + " cm";
    document.getElementById('externalTemp').innerHTML = externalTemp + " °C";
    document.getElementById('externalHumidity').innerHTML = externalHumidity + " %";
    document.getElementById('batteryVoltage').innerHTML = batteryVoltage + " V";
}

// -----------------------------------------------------------------------
// Countdown Timer
// -----------------------------------------------------------------------

function startTimer(countDownTime) {

    document.getElementById('timerRow').style.opacity = "1";
    document.getElementById("executeMovementButton").disabled = true;
    document.getElementById("executeScienceButton").disabled = true;

    var timer = countDownTime, minutes, seconds;

    var timerInterval = setInterval(function () {

        window.localStorage.setItem('timer', timer);

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('countDownTimerText').innerHTML = minutes + ":" + seconds;

        remainingPercentage = 100 - (timer / countDownTime * 100);
        document.getElementById('countDownTimerBar').style.width = remainingPercentage + "%";

        if (--timer < 0) {
            clearInterval(timerInterval);

            window.localStorage.removeItem('timer');

            document.getElementById('timerRow').style.opacity = "0.5";
            document.getElementById("executeMovementButton").disabled = false;
            document.getElementById("executeScienceButton").disabled = false;

            if (shouldScienceBeCaptured) {
                shouldScienceBeCaptured = false;

                var scienceLocation = document.getElementById("scienceLocationInput").value;
                var currentDate = new Date();
            
                window.localStorage.setItem(scienceLocation, document.getElementById('externalTemp').innerHTML + ' | ' + document.getElementById('externalHumidity').innerHTML);
                window.localStorage.setItem(scienceLocation + "time", currentDate.getHours() + ":" + currentDate.getMinutes());

                getScience();
            }
        }
    }, 1000);
}

// -----------------------------------------------------------------------
// Next Command
// -----------------------------------------------------------------------

function setNextCommand(nextCommandText) {
    document.getElementById('nextCommandText').innerHTML = nextCommandText;
}