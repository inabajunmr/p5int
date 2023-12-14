var canvasWidth = 400;
var canvasHeight = 400;
var changeCanvas = false;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

var objects = [];
function draw() {
    if(changeCanvas) {
        createCanvas(canvasWidth, canvasHeight);
        objects = [];
        changeCanvas = 0;
        return;
    }
    fill(255);
    rect(0, 0, width, height);
    stroke(1);
    objects.forEach((element) => drawObject(element));
    if(currentObject != null) {
        drawObject(currentObject);
    }
    document.getElementById("result").value = result(objects);
}

var currentObjectType = "line";
function setCurrentObjectType(type) {
    currentObjectType = type;
}

var currentObject;
function mouseClicked() {
    if(0 > mouseX || mouseX > width || 0 > mouseY || mouseY > height) {
        return;
    }
    if(currentObject != null && currentObject.type != currentObjectType) {
        currentObject = null;
    }
    switch (currentObjectType) {
        case "line":
            if(currentObject == null) {
                currentObject = {type: "line", startX: mouseX, startY: mouseY, endX: null, endY: null, status: "init"};
                return;
            }
            if(currentObject.status == "init") {
                currentObject.status = "complete";
                currentObject.endX = mouseX;
                currentObject.endY = mouseY;
                objects.push(currentObject);
                currentObject = null;
                return;
            }
        case "rect":
            if(currentObject == null) {
                currentObject = {type: "rect", startX: mouseX, startY: mouseY, endX: null, endY: null, status: "init"};
                return;
            }
            if(currentObject.status == "init") {
                currentObject.status = "complete";
                currentObject.endX = mouseX;
                currentObject.endY = mouseY;
                objects.push(currentObject);
                currentObject = null;
                return;
            }
            break;
        case "ellipse":
            if(currentObject == null) {
                currentObject = {type: "ellipse", startX: mouseX, startY: mouseY, endX: null, endY: null, status: "init"};
                return;
            }
            if(currentObject.status == "init") {
                currentObject.status = "complete";
                currentObject.endX = mouseX;
                currentObject.endY = mouseY;
                objects.push(currentObject);
                currentObject = null;
                return;
            }
            break;        
        default:
            break;
    }
}

function drawObject(object) {
    switch(object.type) {
        case "line":
            if(object.status == "init") {
                line(object.startX, object.startY, mouseX, mouseY);
            } else {
                line(object.startX, object.startY, object.endX, object.endY);
            }
            return;
        case "rect":
            if(object.status == "init") {
                rect(object.startX, object.startY, mouseX - object.startX, mouseY - object.startY);
            } else {
                rect(object.startX, object.startY, object.endX - object.startX, object.endY - object.startY);
            }
            return;
        case "ellipse":
            if(object.status == "init") {
                ellipse(object.startX, object.startY, abs(mouseX - object.startX) * 2, abs(mouseY - object.startY) * 2);
            } else {
                ellipse(object.startX, object.startY, abs(object.endX - object.startX) * 2, abs(object.endY - object.startY) * 2);
            }
            return;
        default:
            break;
    }
}

function result(objects) {
    var result = "";
    for (const object of objects) {
        result += toString(object);
    }
    return result;
}

function toString(object) {
    switch(object.type) {
        case "line":
            return `line(${object.startX}, ${object.startY}, ${object.endX}, ${object.endY});\n`
        case "rect":
            return `rect(${object.startX}, ${object.startY}, ${object.endX - object.startX}, ${object.endY - object.startY});\n`
        case "ellipse":
            return `ellipse(${object.startX}, ${object.startY}, ${abs(object.endX - object.startX) * 2}, ${abs(object.endY - object.startY) * 2});\n`
        default:
            break;
    
    }
}

function setCanvas() {
    canvasHeight = document.getElementById("height").value;
    canvasWidth = document.getElementById("width").value;
    changeCanvas = true;
}