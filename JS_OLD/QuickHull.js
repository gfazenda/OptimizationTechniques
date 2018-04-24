
var canvas = document.getElementById("QuickHull"),
contextQuick = canvas.getContext("2d");
var points = [];
var height = 500, width = 500
var chosen = []
function DoQuickHull(){
    SetCTX(contextQuick)
    FillPoints();
    InsertSort(points)
    console.log(points)
   
    DrawPoints(points)

    

    QuickHull(points)
    console.log(chosen);
    
    for (var i = 0; i < chosen.length; i++) {
        DrawPoint(chosen[i].x,chosen[i].y, "#FF0000")
    }

     
    //  P1 = {x:-10,y: 9}
    //  P2 = {x:5,y:11.5}
    //  P3 = {x: 2, y: 12.5}
    //  DrawPoint(P1.x,P1.y, "#FF0000")
    //  DrawPoint(P2.x,P2.y, "#FF0000")
    //  DrawPoint(P3.x,P3.y, "#FF0000")
    //   console.log('cccc ' + IsOnTheRight(P2,P1,P3))
    // InsertSort(chosen)
  //    DrawLines(chosen);
}

function QuickHull(points){
    var a = points[0]
    var b = points[points.length-1]
    chosen.push(a)
    chosen.push(b)
    var up = [], down = []
    for (var i = 1; i < points.length-1; i++) {
        if(ccw(a,b,points[i]) > 0){
            up.push(points[i])
        }
        else{
            down.push(points[i])
        }
        // console.log(ccw(a,b,points[i]))
    }
    // chosen = up;
    // return;
    FindHull(up,b,a)
    FindHull(down,a,b)

}

function FindHull(points, pA, pB, dir = true){
    if(points.length ==0)
         return;

    var newList = []
    var pC = null;
    var dist = 0, currArea = 0, index = -1;
    for (var i = 0; i < points.length; i++) {
        dist = Math.abs(TriangleArea(pA,pB,points[i]))
        if(dist > currArea){
            currArea = dist;
            pC = points[i]
            index = i
        }
    }

    points.splice(index,1);
    
    for (var i = 0; i < points.length; i++) {
        if(!IsInsideTriangle(pA,pB,pC,points[i])){
            newList.push(points[i]);
        }
    }

    console.log('possible points '+ newList.length)
    //chosen = newList;
   // return;

    //if(newList.length == 0 ){
    //chosen.push(pC);
    chosen.splice(1, 0, pC);
      //  return;
    //}

    var up = [], down = []
    for (var i = 0; i < newList.length; i++) {
        if(IsOnTheRight(pA,pC,newList[i])){
            up.push(newList[i])
        }else if(IsOnTheRight(pC,pB,newList[i])){
            down.push(newList[i])
        }
    }

    console.log('la resolucion')
    console.log(up)
    console.log(down)

    FindHull(up,pA,pC)
    FindHull(down,pC,pB)


}

function FillPoints(){
    points = []
   
    points = [{x:-13,y:0.5},{x:-10.5,y:-11.5},{x:-10,y:9},{x:-4.5,y:-2},
    {x:-1,y:8.5},{x:0.5,y:6},{x:0.5,y:-12},{x:2,y:12.5},{x:3.5,y:11},
    {x:5.5,y:3},{x:5.5,y:-7},{x:5,y:11.5},{x:6.5,y:3.2},{x:7,y:-10},
    {x:9,y:-5},{x:11.5,y:-4}];

    // points = [{x:0,y: 3},{x:1,y: 1},{x:2,y: 2},{x:4,y: 4},{x:0,y: 0},{x:1,y: 2},{x:3,y: 1},{x:3,y: 3}]

    // points = [{x: 0, y:  0}, {x: 0, y:  4}, {x: -4, y:  0}, {x: 5, y:  0}, {x: 0, y:  -6}, {x: 1, y:  0}]
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

// function DrawLines(linePoints){
//     for (var i = 0; i < linePoints.length-1; i++) {
//         console.log('ddddd')
//         Draw(linePoints[i],linePoints[i+1])
//     }
//     // Draw(linePoints[linePoints.length-1],linePoints[0])
// }

// var mH = height/2, mW = width/2, multiplier = 10, pointSize = 5

// function DrawPoint(x,y, color){
//     ctx.fillStyle = color;
//     ctx.fillRect(mW+(x*multiplier)-(pointSize/2),mH-(y*multiplier)-(pointSize/2),pointSize,pointSize);
// }

// function TriangleArea(p1,p2,p3){
//     return Math.abs(0.5 * ((p1.x*p2.y)+(p2.x*p3.y)+(p3.x*p1.y)-(p1.x*p3.y)-(p2.x*p1.y)-(p3.x*p2.y)))
// }

// function Draw(p1,p2){
//     ctx.beginPath();
//     x1 = mW+(p1.x*multiplier)-(pointSize/2)
//     x2 = mW+(p2.x*multiplier)-(pointSize/2)
//     y1 = mH-(p1.y*multiplier)-(pointSize/2)
//     y2 = mH-(p2.y*multiplier)-(pointSize/2)
    
//     ctx.moveTo(x1,y1);
//     ctx.lineTo(x2,y2);
//     ctx.stroke();
// }

function IsOnTheRight(p1,p2,p3){
    return (ccw(p1, p2, p3) < 0)
}

function ccw(p1, p2, p3) {
    // ccw > 0: counter-clockwise (left); ccw < 0: clockwise (right); ccw = 0: collinear
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

function IsInsideTriangle(A,B,C,P){
        var s1 = C.y - A.y;
        var s2 = C.x - A.x;
        var s3 = B.y - A.y;
        var s4 = P.y - A.y;

        var w1 = (A.x * s1 + s4 * s2 - P.x * s1) / (s3 * s2 - (B.x-A.x) * s1);
        var w2 = (s4- w1 * s3) / s1;
        return w1 >= 0 && w2 >= 0 && (w1 + w2) <= 1;
}