
var canvas = document.getElementById("QuickHull"),
ctx = canvas.getContext("2d");
var points = [];
var height = 500, width = 500

function DoQuickHull(){
  
    FillPoints();
    InsertSort(points)
    console.log(points)
   
    DrawPoints(points)

    console.log('1111')
    QuickHull(points)
}

function QuickHull(P){
    var a = P[0]
    var b = P[P.length-1]

    var up = [], down = []
    for (var i = 1; i < P.length-1; i++) {
        if(ccw(a,b,P[i]) < 0){
            up.push(P[i])
        }
        else{
            down.push(P[i])
        }
        console.log(ccw(a,b,P[i]))
    }
}

function FillPoints(){
    points = []
   
    // points = [{x:-13,y:0.5},{x:-10.5,y:-11.5},{x:-10,y:9},{x:-4.5,y:-2},
    // {x:-1,y:8.5},{x:0.5,y:6},{x:0.5,y:-12},{x:2,y:12.5},{x:3.5,y:11},
    // {x:5.5,y:3},{x:5.5,y:-7},{x:5,y:11.5},{x:6.5,y:3.2},{x:7,y:-10},
    // {x:9,y:-5},{x:11.5,y:-4}];

    points = [{x:0,y: 3},{x:1,y: 1},{x:2,y: 2},{x:4,y: 4},{x:0,y: 0},{x:1,y: 2},{x:3,y: 1},{x:3,y: 3}]
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

var mH = height/2, mW = width/2, multiplier = 40, pointSize = 5

function DrawPoint(x,y, color){
    ctx.fillStyle = color;
    ctx.fillRect(mW+(x*multiplier)-(pointSize/2),mH+(y*multiplier)-(pointSize/2),pointSize,pointSize);
}

function TriangleArea(p1,p2,p3){
    result = Math.abs(0.5 * ((p1.x*p2.y)+(p2.x*p3.y)+(p3.x*p1.y)-(p1.x*p3.y)-(p2.x*p1.y)-(p3.x*p2.y)))
}

function Draw(p1,p2){
    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.stroke();
}


function getLinesIntersections(L){
    var allIntersections = [];
     for (var i = 0; i < L.length; i++) {
        for (var j = i + 1; j < L.length; j++) {
            var intersection = linesIntersection(L[i], L[j]);
                if(intersection){
                 allIntersections.push(intersection);
                 console.log('got it')
            }
        }
     }
     return allIntersections; 

}

function ccw(p1, p2, p3) {
    // ccw > 0: counter-clockwise; ccw < 0: clockwise; ccw = 0: collinear
    return (p2.x - p1.x) * (p3.y - p1.y)
    - (p2.y - p1.y) * (p3.x - p1.x);
}

function polarAngle(p) {
    return Math.atan(p.y / p.x);
}

function dotProduct(vec1, vec2) {
    return (vec1.x * vec2.x + vec1.y * vec2.y);
}

function norm(vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

function computeAngle(v1, v2) {
    var ac = dotProduct(v1, v2);
    return Math.acos(ac / (norm(v1) * norm(v2))) * ONE_RADIAN;
}

function InsertSort(array, compareX = true){
    var i, key, j;
    for (var i = 0; i < array.length; i++) {
	{
		key = array[i];
		j = i - 1;

		/* Move elements of arr[0..i-1], that are
		greater than key, to one position ahead
        of their current position */
        if(compareX){
            while (j >= 0 && array[j].x > key.x)
            {
                array[j + 1] = array[j];
                j = j - 1;
            }
        }
        else{
            while (j >= 0 && array[j].y > key.y)
            {
                array[j + 1] = array[j];
                j = j - 1;
            }
        }
		array[j + 1] = key;
	}
    }
}