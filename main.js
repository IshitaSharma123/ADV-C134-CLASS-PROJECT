img = "";
status = "";
object = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCanvas(VIDEO);
    video.size(380, 380);
    video.size(380, 380);
    video.hide();

    oblectDetector = ml5.oblectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status  Dectecting Objects...";
}

function modelLoaded() {
     console.log("Model Loaded!");
     status = true;
     oblectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "") {

        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            fill(r,g,b);
            fill("#FF0000");
            percent = flood(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            fill(r,g,b);
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects.width, objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

