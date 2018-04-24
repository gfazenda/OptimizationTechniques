var height = 300, width = 300
var mH = height/2, mW = width/2, multiplier = 8, pointSize = 5
var ctx;

function SetCTX(ctxobj){
    ctx = ctxobj;
    // clearCanvas(canvas);
}

function DrawLines(){
    for (var i = 0; i < L.length; i++) {
        Draw(L[i].p0,L[i].p1)
    }
}

function DrawPoints(pointsToDraw){
    for (var i = 0; i < pointsToDraw.length; i++) {
        DrawPoint(pointsToDraw[i].x,pointsToDraw[i].y,"#000000")
    }
 
}

function DrawLines(array){
    linePoints = ConvertToScreenPoints(array);
    console.log(linePoints)
    for (var i = 0; i < linePoints.length-1; i++) {
        Draw(linePoints[i],linePoints[i+1])
    }
    Draw(linePoints[linePoints.length-1],linePoints[0])
}

function ConvertToScreenPoints(array){
    var newArray = []
    for (var i = 0; i < array.length; i++) {
        newArray.push(WorldPointToCanvas(array[i]))
    }
    return newArray;
}

function WorldPointToCanvas(point){
    return {x: mW+(point.x*multiplier)-(pointSize/2), y:mH-(point.y*multiplier)-(pointSize/2)};
}   

function DrawPoint(x1,y1, color){
    ctx.fillStyle = color;
    var point = {x: x1, y: y1};
    var convertedPoint = WorldPointToCanvas(point)
    ctx.fillRect(convertedPoint.x,convertedPoint.y,pointSize,pointSize);
}

function Draw(p1,p2){
    ctx.beginPath();
    // x1 = mW+(p1.x*multiplier)-(pointSize/2)
    // x2 = mW+(p2.x*multiplier)-(pointSize/2)
    // y1 = mH+(p1.y*multiplier)-(pointSize/2)
    // y2 = mH+(p2.y*multiplier)-(pointSize/2)
    
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.stroke();
}


function clearCanvas() {
    ctx.clearRect(0, 0, width,height);
    // var w = canvas.width;
    // canvas.width = 1;
    // canvas.width = w;
}