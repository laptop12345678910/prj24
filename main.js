status="";
Search_Result="";
object = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start() 
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    Search_Result = document.getElementById("Search").value;
}


function modelLoaded()
{
    console.log("Model Loaded");
    status = true ;
}

function draw()
{
    image(video, 0, 0, 380, 380);
    objectDetector.detect(video,gotResult);
    if(status != "")
    {
        for(i = 0;i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Object Detected";
            document.getElementById("detection status").innerHTML = "Number of objects detected are "+ object.length;

            fill("#00ffff");
            percent(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%" ,object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#00ffff");
            rect(object[i].x, object[i].y ,object[i].width, object[i].height);
        }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
    
}