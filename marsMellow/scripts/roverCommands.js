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
    var cameraRotationConverted = camerRotation + 90;


      $.ajax("http://www.beyondthepines.co/marsMellow/updateControl.php?id=1&command="+ movementDirection + "&distance=" + movementAmount +"&cameraAngle=" + camerRotation);

    //   {
    //     type: "POST",
    //     url: linkURL,
    //     success: function () {
            
    //       console.log("worked?");
    //     }
    //   }



    // Start Timer
    setNextCommand(movementDirection + " for " + movementAmount + " Miliseconds with " + camerRotation + "' Camera Rotation");
    startTimer(timeToCountDown);
};

// Rotate the Camera Icon
function setCameraIconRotation(rotationDegrees = 0) {

    var camerIcon = document.getElementById("roverCamIcon");

    camerIcon.style.transform = "rotate(" + rotationDegrees + "deg)";
}


// -----------------------------------------------------------------------
// Science
// -----------------------------------------------------------------------


function executeCaptureScience() {

    // TODO: Send Science Command
    console.log("Sience Captured");

    // Start Timer
    setNextCommand("Capture Science");
    startTimer(timeToCountDown);
};

// -----------------------------------------------------------------------
// Rover Data
// -----------------------------------------------------------------------

function getRoverData() {

    // TODO: Get stats from the server
    var internalTemp = 24;
    var frontDistance = 32;
    var externalTemp = 28;
    var externalHumidity = 57;
    var batteryVoltage = 5;

    document.getElementById('internalTemp').innerHTML = internalTemp + " C";
    document.getElementById('frontDistance').innerHTML = frontDistance + " cm";
    document.getElementById('externalTemp').innerHTML = externalTemp + " C";
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
        }
    }, 1000);
}

// -----------------------------------------------------------------------
// Next Command
// -----------------------------------------------------------------------

function setNextCommand(nextCommandText) {
    document.getElementById('nextCommandText').innerHTML = nextCommandText;
}