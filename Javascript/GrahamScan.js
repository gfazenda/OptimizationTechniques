
var canvas = document.getElementById("GrahamScan"),
contextGraham = canvas.getContext("2d");

var points = [];
var height = 300, width = 300
var mH = height/2, mW = width/2, multiplier = 8, pointSize = 5
var hullPoints = []
var PI = 3.14
var ONE_RADIAN = (2*PI)

function DoGrahamScan(){
    SetCTX(contextGraham)
    FillPoints();
    InsertSort(points,false)
    console.log(points)
   
    DrawPoints(points)
    
    

    GrahamScan(points)
    //console.log(hullPoints);
    
    // var p1 = {x: 5, y: 11.5}
    // var p2 = {x: 2, y: 12.5}
    // var p3 = {x: -1, y: 8.5}
    
    // var p1 = {x: 7, y: -10}
    // var p2 = {x: 9, y: -5}
    // var p3 = {x: 5.5, y: -7}

    // var p1 = {x: 7, y: -10}
    // var p2 = {x: 11.5, y: -4}
    // var p3 = {x: 9, y: -5}
    // console.log('wiueqwuieewi ' +ccw(p1,p2,p3))
    // hullPoints = []
    // hullPoints.push(p1)
    // hullPoints.push(p2)
    // hullPoints.push(p3)
    for (var i = 0; i < hullPoints.length; i++) {
        // console.log(hullPoints[i])
        DrawPoint(hullPoints[i].x,hullPoints[i].y, "#FF0000")
    }


 


    


    DrawLines(hullPoints);
}

function GrahamScan(array){

    initial = array[0]
   
    array.splice(0,1);
    //console.log('2222222')
   // console.log(initial)
   
   for (var i = 0; i < array.length; i++) {
        var angle = polarAngle(array[i],initial)
        array[i].angle = angle;
        // console.log(array[i].angle);
       
    }
   // console.log('dklsfdkl')
   // console.log(array)
    

    InsertSortByAngle(array)

    
    // hullPoints.push(array[0])
    // hullPoints.push(array[1])
    // //hullPoints.push(array[2])
    // return;

    hullPoints.push(initial)
    hullPoints.push(array[0])
    hullPoints.push(array[1])

    for (var i = 2; i < array.length; i++) {
        while(ccw(hullPoints.secondToLast(),hullPoints.last(),array[i]) < 0){
            hullPoints.pop();
        }
        hullPoints.push(array[i])
        console.log(hullPoints.length);
    }
    //  console.log(array)


}

if(!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    }
}

if(!Array.prototype.secondToLast) {
    Array.prototype.secondToLast = function() {
        if(this.length >= 2){
            return this[this.length - 2];
        }
        return null
    }
}

function FillPoints(){
    points = []
   
    points = [{x:-13,y:0.5},
            {x:-10.5,y:-11.5},
            {x:-10,y:9},
            {x:-4.5,y:-2},
            {x:-1,y:8.5},
            {x:0.5,y:6},
            {x:0.5,y:-12},
            {x:2,y:12.5},
            {x:3.5,y:11},
            {x:5.5,y:3},
            {x:5.5,y:-7},
            {x:5,y:11.5},
            {x:6.5,y:3.2},
            {x:7,y:-10},
            {x:9,y:-5},
            {x:11.5,y:-4}];

    //   points = [{x:0,y: 3},{x:1,y: 1},{x:2,y: 2},{x:4,y: 4},{x:0,y: 0},{x:1,y: 2},{x:3,y: 1},{x:3,y: 3}]

    //  points = [{x: 0, y:  0}, {x: 0, y:  4}, {x: -4, y:  0}, {x: 5, y:  0}, {x: 0, y:  -6}, {x: 1, y:  0}]

    //  points = [{x:1, y:2.5},
    //     {x:3.5, y:2},
    //     {x:7, y:4.4},
    //     {x:8, y:5.5},
    //     {x:1.2, y:2.7},
    //     {x:9, y:4.5},
    //     {x:6.4, y:3},
    //     {x:2.3, y:8.3},
    //     {x:5.6, y:6.7},
    //     {x:1, y:4},
    //     {x:5, y:-3}]
}

// function DrawLines(){
//     for (var i = 0; i < L.length; i++) {
//         Draw(L[i].p0,L[i].p1)
//     }
// }

// function DrawPoints(pointsToDraw){
//     for (var i = 0; i < pointsToDraw.length; i++) {
//         DrawPoint(pointsToDraw[i].x,pointsToDraw[i].y,"#000000")
//     }
 
// }

// function DrawLines(array){
//     linePoints = ConvertToScreenPoints(array);
//     console.log(linePoints)
//     for (var i = 0; i < linePoints.length-1; i++) {
//         Draw(linePoints[i],linePoints[i+1])
//     }
//     Draw(linePoints[linePoints.length-1],linePoints[0])
// }

// function ConvertToScreenPoints(array){
//     var newArray = []
//     for (var i = 0; i < array.length; i++) {
//         newArray.push(WorldPointToCanvas(array[i]))
//     }
//     return newArray;
// }

// function WorldPointToCanvas(point){
//     return {x: mW+(point.x*multiplier)-(pointSize/2), y:mH-(point.y*multiplier)-(pointSize/2)};
// }   

// function DrawPoint(x1,y1, color){
//     ctx.fillStyle = color;
//     var point = {x: x1, y: y1};
//     var convertedPoint = WorldPointToCanvas(point)
//     ctx.fillRect(convertedPoint.x,convertedPoint.y,pointSize,pointSize);
// }

function TriangleArea(p1,p2,p3){
    return Math.abs(0.5 * ((p1.x*p2.y)+(p2.x*p3.y)+(p3.x*p1.y)-(p1.x*p3.y)-(p2.x*p1.y)-(p3.x*p2.y)))
}

// function Draw(p1,p2){
//     ctx.beginPath();
//     // x1 = mW+(p1.x*multiplier)-(pointSize/2)
//     // x2 = mW+(p2.x*multiplier)-(pointSize/2)
//     // y1 = mH+(p1.y*multiplier)-(pointSize/2)
//     // y2 = mH+(p2.y*multiplier)-(pointSize/2)
    
//     ctx.moveTo(p1.x,p1.y);
//     ctx.lineTo(p2.x,p2.y);
//     ctx.stroke();
// }




function ccw(p1, p2, p3) {
    // ccw > 0: counter-clockwise; ccw < 0: clockwise; ccw = 0: collinear
    // return (p2.y - p1.y) * (p3.x - p2.x) -
    //           (p2.x - p1.x) * (p3.y - p2.y);
    return (p2.x - p1.x) * (p3.y - p1.y)
    - (p2.y - p1.y) * (p3.x - p1.x);

   // return (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x)
}

// function polarAngle(p) {
//     return Math.atan(p.y / p.x);
// }

function polarAngle(p,p0)
{
  return Math.atan2(p.y - p0.y,p.x - p0.x);
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

function InsertSortByAngle(array){
    var i, key, j;
    for (var i = 0; i < array.length; i++) {
	
		key = array[i];
		j = i - 1;

		/* Move elements of arr[0..i-1], that are
		greater than key, to one position ahead
        of their current position */
        while (j >= 0 && array[j].angle > key.angle)
        {
            array[j + 1] = array[j];
            j = j - 1;
        }

        array[j + 1] = key;
    }
}


function IsInsideTriangle(A,B,C,P){
        var s1 = C.y - A.y;
        var s2 = C.x - A.x;
        var s3 = B.y - A.y;
        var s4 = P.y - A.y;

        var w1 = (A.x * s1 + s4 * s2 - P.x * s1) / (s3 * s2 - (B.x-A.x) * s1);
        var w2 = (s4- w1 * s3) / s1;
        return w1 >= 0 && w2 >= 0 && (w1 + w2) <= 1;
}