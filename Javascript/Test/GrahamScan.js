
var canvasG = document.getElementById("GrahamScan"),
contextGraham = canvasG.getContext("2d");

var points = [];
var height = 300, width = 300
var mH = height/2, mW = width/2, multiplier = 8, pointSize = 5
var hullPoints = []
var PI = 3.14
var ONE_RADIAN = (2*PI)
var initial;

function DoGrahamNormal(){
    SetCTX(contextGraham)
    clearCanvas(canvasG);
    FillPoints();
    DoGrahamScan();
}

function DoGrahamRandom(){
    SetCTX(contextGraham)
    clearCanvas(canvasG);
    points = FillRandom(50);
    DoGrahamScan();
}

function DoGrahamScan(){

    SetCTX(contextGraham)

    hullPoints = []
    QuickSort(points, 0, points.length-1,'y')

    DrawPoints(points)
    
    GrahamScan(points)
    
    for (var i = 0; i < hullPoints.length; i++) {
        DrawPoint(hullPoints[i].x,hullPoints[i].y, "#FF0000")
    }

    DrawLines(hullPoints);
}

function GrahamScan(array){

    initial = array[0]
   
    array.splice(0,1);
   
   for (var i = 0; i < array.length; i++) {
        var angle = polarAngle(array[i],initial)
        array[i].angle = angle;
     
    }
    
    QuickSort(array,0,array.length-1,'angle');

    for (var i = 0; i < array.length - 1; i++)
        {
            while (i < array.length - 1 && ccw(initial, array[i], array[i + 1]) == 0)
            {
                points.splice(i+1,1);
                i++;
            }

        }

    if(array.length < 3){
        console.log("not valid hull");
        return null;
    }


    hullPoints.push(initial)
    hullPoints.push(array[0])
    hullPoints.push(array[1])

    for (var i = 2; i < array.length; i++) {
        while(ccw(hullPoints.secondToLast(),hullPoints.last(),array[i]) < 0){
            hullPoints.pop();
        }
        hullPoints.push(array[i])
    }
}

function FillRandom(x){
    Points = []
    var min = -15, max = 15
    for (var i = 0; i < x; i++) {
        Points.push({x: GetRandom(min, max),y: GetRandom(min,max)})
    }
    size = Points.length
    return Points;
}

function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
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
            {x:5.5,y:-7},
            {x:5,y:11.5},
            {x:6.5,y:3.2},
            {x:-10.5,y:-11.5},
            {x:-10,y:9},
            {x:-4.5,y:-2},
            {x:-1,y:8.5},
            {x:0.5,y:6},
            {x:0.5,y:-12},
            {x:2,y:12.5},
            {x:3.5,y:11},
            {x:5.5,y:3},
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


function TriangleArea(p1,p2,p3){
    return Math.abs(0.5 * ((p1.x*p2.y)+(p2.x*p3.y)+(p3.x*p1.y)-(p1.x*p3.y)-(p2.x*p1.y)-(p3.x*p2.y)))
}





function ccw(p1, p2, p3) {
    // ccw > 0: counter-clockwise; ccw < 0: clockwise; ccw = 0: collinear
    // return (p2.y - p1.y) * (p3.x - p2.x) -
    //           (p2.x - p1.x) * (p3.y - p2.y);
    return (p2.x - p1.x) * (p3.y - p1.y)
    - (p2.y - p1.y) * (p3.x - p1.x);

   // return (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x)
}

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
            swapValues = CompareAngles(array[j],pivot);
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

function CompareAngles(a,b){
    if(a.angle===b.angle){
        return dist(initial,a) > dist(initial,b) ? true : false;
    }else{
        return a.angle <= b.angle;
    }

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

function dist(p1,p2){
    return Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) +
                    (p1.y - p2.y)*(p1.y - p2.y));
}