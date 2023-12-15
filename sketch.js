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
    completeVertex();
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
        case "vertex":
            if(currentObject == null) {
                currentObject = {type: "vertex", status: "init", vertexes: [{x: mouseX, y: mouseY}]};
                return;
            }
            if(currentObject.status == "init") {
                currentObject.vertexes.push({x: mouseX, y: mouseY})
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
        case "fill":
            fill(object.r, object.g, object.b);
            return;            
        case "vertex":
            beginShape();
            object.vertexes.forEach(element => {
               vertex(element.x, element.y);
            });
            if(object.status == "init") {
                vertex(mouseX, mouseY);
            }
            endShape();
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
        case "fill":
            return `fill(${object.r}, ${object.g}, ${object.b});\n`
        case "vertex":
            var value = "beginShape();\n";
            object.vertexes.forEach(element => {
                value += `vertex(${element.x}, ${element.y});\n`
            });
            value += "endShape();\n";
            return value;
        default:
            break;
    
    }
}

function setCanvas() {
    canvasHeight = document.getElementById("height").value;
    canvasWidth = document.getElementById("width").value;
    changeCanvas = true;
}

function getColor() {
    const hex = document.getElementById("color").value;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return {type: "fill", r: r, g: g, b: b};
}

function setColor() {
    completeVertex();
    const rgb = getColor();
    objects.push(rgb);
}

function completeVertex() {
    if(currentObject != null && currentObject.type == "vertex") {
        // TODO strange logic
        currentObject.status = "complete";
        objects.push(currentObject);
        currentObject = null;
    }    
}

function keyPressed() {
    if(key == "Escape") {
        currentObject = null;
    }
}
