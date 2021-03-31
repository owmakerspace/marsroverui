// -----------------------------------------------------------------------
// Code to run when site loads
// -----------------------------------------------------------------------

getRoverData();


// -----------------------------------------------------------------------
// Movement Controls
// -----------------------------------------------------------------------

var movementDirection = "";


// Assign Direction to move in

function setMovementDirection(direction) {

    movementDirection = direction;
    resetMovementArrows();

    switch (direction) {
        case 'left':
            document.getElementById("moveLeftButton").classList.add("selected");
            break;
        case 'up':
            document.getElementById("moveUpButton").classList.add("selected");
            break;
        case 'down':
            document.getElementById("moveDownButton").classList.add("selected");
            break;
        case 'right':
            document.getElementById("moveRightButton").classList.add("selected");
            break;
    
        default:
            break;
    }
}

function resetMovementArrows() {
    document.getElementById("moveLeftButton").classList.remove("selected");
    document.getElementById("moveUpButton").classList.remove("selected");
    document.getElementById("moveDownButton").classList.remove("selected");
    document.getElementById("moveRightButton").classList.remove("selected");

}

// Execute the Movement

function executeMovement() {

    var movementAmount = document.getElementById("moveAmountInput").value;

    // Reset the fields
    resetMovementArrows();
    document.getElementById("moveAmountInput").value = "";

    // TODO: Send Move Command
    console.log("move direction: " + movementDirection);
    console.log("move by: " + movementAmount);
};

// -----------------------------------------------------------------------
// Camera Controls
// -----------------------------------------------------------------------


function executeCameraRotation() {

    var camerRotation = document.getElementById("camerRotationInput").value;

    // Rotate the Camera Icon
    setCameraIconRotation(camerRotation);

    // Reset the fields
    document.getElementById("camerRotationInput").value = "";

    // TODO: Send Rotate Command
    console.log("rotate camera by: " + camerRotation);
    var cameraRotationConverted = camerRotation + 90;
};

// Rotate the Camera Icon
function setCameraIconRotation(rotationDegrees) {

    var camerIcon = document.getElementById("roverCamIcon");

    camerIcon.style.transform = "rotate(" + rotationDegrees + "deg)";
}


// -----------------------------------------------------------------------
// Science
// -----------------------------------------------------------------------


function executeCaptureScience() {

    // TODO: Send Science Command
    console.log("Sience Captured");
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
    var batteryVoltage = 4;

    document.getElementById('internalTemp').innerHTML = internalTemp + " C";
    document.getElementById('frontDistance').innerHTML = frontDistance + " cm";
    document.getElementById('externalTemp').innerHTML = externalTemp + " C";
    document.getElementById('externalHumidity').innerHTML = externalHumidity + " %";
    document.getElementById('batteryVoltage').innerHTML = batteryVoltage + " V";
}