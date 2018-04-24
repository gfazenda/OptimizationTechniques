
var canvasQ = document.getElementById("QuickHull"),
contextQuick = canvasQ.getContext("2d");
var points = [];
var height = 500, width = 500
var chosen = []
var range = 15;
function DoNormal(){
    SetCTX(contextQuick)
    clearCanvas(canvasQ);
    FillPoints();
    DoQuickHull();
}

function DoRandom(){
    SetCTX(contextQuick)
    clearCanvas(canvasQ);
    points = FillRandom(50);
    DoQuickHull();
}

function DoQuickHull(){
    SetCTX(contextQuick)
    chosen = []

    QuickSort(points, 0, points.length-1,'x')

   
    DrawPoints(points)

    

    QuickHull(points)
    
    for (var i = 0; i < chosen.length; i++) {
        DrawPoint(chosen[i].x,chosen[i].y, "#FF0000")
    }

}

function FillRandom(x){
    Points = []
    var min = -range, max = range
    for (var i = 0; i < x; i++) {
        Points.push({x: GetRandom(min, max),y: GetRandom(min,max)})
    }
    size = Points.length
    return Points;
}

function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function RemoveDuplicates(arr) {
    return arr.reduce(function (p, c) {
      var key = [c.x, c.y].join('|');
      if (p.temp.indexOf(key) === -1) {
        p.out.push(c);
        p.temp.push(key);
      }
      return p;
    }, { temp: [], out: [] }).out;
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
    }

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
   chosen.splice(1, 0, pC);
 

    var up = [], down = []
    for (var i = 0; i < newList.length; i++) {
        if(IsOnTheRight(pA,pC,newList[i])){
            up.push(newList[i])
        }else if(IsOnTheRight(pC,pB,newList[i])){
            down.push(newList[i])
        }
    }

    // console.log('la resolucion')
    // console.log(up)
    // console.log(down)

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

function Partition (array, low, high, type)
{
    var pivot = array[high];    // pivot
    var i = (low - 1);  // Index of smaller element
    var swapValues
    for (var j = low; j <= high- 1; j++)
    {
        // If current element is smaller than or
        // equal to pivot
        if (type=='x'){
            swapValues = array[j].x <= pivot.x;
        }
        else if(type=='y'){
            swapValues = array[j].y <= pivot.y;
        }
        else if(type=='angle'){
            swapValues = array[j].angle <= pivot.angle;
        }

        if(swapValues)
        {
            i++;    
            array.swap(i,j)
        }
    }
    array.swap(i+1,high)
    return (i + 1);
}

Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
}

function QuickSort(array, low, high, type = 'x')
{
    if (low < high)
    {
        var pi = Partition(array, low, high, type);
 
        QuickSort(array, low, pi - 1, type);
        QuickSort(array, pi + 1, high, type);
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

