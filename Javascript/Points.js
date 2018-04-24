
var canvas = document.getElementById("BrutePointCanvas"),
ctx = canvas.getContext("2d");

var canvas2 = document.getElementById("DividedPointCanvas"),
ctx2 = canvas2.getContext("2d");

var PointsX = [], PointsY = [], Points = [];
var size;
var height = 500, width = 500
var pointsToCheck = []

function Predefined(){
    FillList();
    CalculateClosestPoint()
}

function Random(){
    FillRandom(50);

    Px = Points;
    Py = Points;
    QuickSort(Px,0,Px.length-1,'x')
    QuickSort(Py,0,Py.length-1,'y')
    console.log(Px)
    console.log(Py)
   
    Points = RemoveDuplicates(Points)
   
   // console.log(Points)
   
    CalculateClosestPoint()
}

function CalculateClosestPoint(){
    //ordena por x
    pointsToCheck = []
    QuickSort(Points,0,Points.length-1,'x')
    console.log(Points)
    Px = Points.clone();
    Py = Points.clone();
    QuickSort(Px,0,Px.length-1,'x')
    QuickSort(Py,0,Py.length-1,'y')
    // console.log(Px)
    // console.log(Py)
    // return;
    var resultDivide = closestDivideAndConquer(Px,Py,Points.length)

    var resultBrute = BruteForce(Points);

    DrawOnCanvas()

    console.log('resultBrute: ' + dist(resultBrute[0],resultBrute[1]))
    console.log('resultDivide: ' + resultDivide)
    console.log('size possible ' + pointsToCheck.length)
    var closestPoints = GetPoints(resultDivide)
   
    console.log(closestPoints)
    DrawPoint(closestPoints[0].x,closestPoints[0].y, "#FF0000")
    DrawPoint(closestPoints[1].x,closestPoints[1].y, "#FF0000")

    DrawPoint2(resultBrute[0].x,resultBrute[0].y, "#FF0000")
    DrawPoint2(resultBrute[1].x,resultBrute[1].y, "#FF0000")
}

function GetPoints(result){
    for (var i = 0; i < pointsToCheck.length-1; i++) {
        for (var j = i+1; j < pointsToCheck.length ; j++) {
            if (dist(pointsToCheck[i],pointsToCheck[j]) == result)
                return [pointsToCheck[i],pointsToCheck[j]]
        }
    }
}

Array.prototype.clone = function() {
	return this.slice();
};

function DrawOnCanvas(){
    clearCanvas(ctx,canvas)
    clearCanvas(ctx2,canvas2)
    DrawPoints()
    DrawPoints2()
}

function FillList(){
    Points = []
    Points = [{x:-13,y:0.5},{x:-10.5,y:-11.5},{x:-10,y:9},{x:-4.5,y:-2},
    {x:-1,y:8.5},{x:0.5,y:6},{x:0.5,y:-12},{x:2,y:12.5},{x:3.5,y:11},
    {x:5.5,y:3},{x:5.5,y:-7},{x:5,y:11.5},{x:6.5,y:3.2},{x:7,y:-10},
    {x:9,y:-5},{x:11.5,y:-4}];

    // Points = [{x:2,y:1},{x:3,y:5},{x:8,y:3},{x:5,y:8},{x:9,y:1},{x:5,y:2},{x:3,y:3},{x:4,y:5},{x:6,y:5},{x:1,y:9}];

    // Points = [{x:2,y:1},
    //     {x:8,y:3},
    //     {x:5,y:8},
    //     {x:9,y:1},
    //     {x:5,y:2},
    //     {x:3,y:3},
    //     {x:4,y:5},
    //     {x:6,y:5},
    //     {x:1,y:9},
    //     {x:2,y:1.5}];
    //Points = [{ x:2, y: 3}, { x:12, y: 30}, { x:40, y: 50}, { x:5, y: 1}, { x:12, y: 10}, { x:3, y: 4}];
     size = Points.length
}

function FillRandom(x){
    Points = []
    var min = -15, max = 15
    for (var i = 0; i < x; i++) {
        Points.push({x: GetRandom(min, max),y: GetRandom(min,max)})
    }
    size = Points.length
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

function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function BruteForce(P){
        var minDist = Infinity;
        var closest = [];
        var n = P.length;
        for (var i = 0; i < n; i++) {
         for (var j = i+1; j < n; j++) {
            var p = P[i], q = P[j];

         var d = dist(p, q);
         if (d < minDist) {
            minDist = d;
            closest[0] = p; // or i
            closest[1] = q; // or j
         }
        }
    }
         return closest;
}



function dist(p1,p2){
    return Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) +
                    (p1.y - p2.y)*(p1.y - p2.y));
}

function DrawPoints(){
    for (var i = 0; i < Points.length; i++) {
        DrawPoint(Points[i].x,Points[i].y,"#000000")
    }
}
function DrawPoints2(){
    for (var i = 0; i < Points.length; i++) {
        DrawPoint2(Points[i].x,Points[i].y,"#000000")
    }
}

var mH = height/2, mW = width/2, multiplier = 15, pointSize = 5

function DrawPoint(x,y, color){
    ctx.fillStyle = color;
    ctx.fillRect(mW+(x*multiplier)-(pointSize/2),mH-(y*multiplier)-(pointSize/2),pointSize,pointSize);
}

function DrawPoint2(x,y, color){
    ctx2.fillStyle = color;
    ctx2.fillRect(mW+(x*multiplier)-(pointSize/2),mH-(y*multiplier)-(pointSize/2),pointSize,pointSize);
}

pointsToCheck = []

function closestDivideAndConquer(Px,Py,n){ 
        if(n==1){
            return 200
        }

        if(n<=3){
            var result = BruteForce(Px);
            pointsToCheck = []
            pointsToCheck.push(result[0])
            pointsToCheck.push(result[1])
            return dist(result[0],result[1])
        }
        
        var mid = Math.round(n/2);
        var midPoint = Px[mid]
  

        var P1 = [], P2 = [];
        for (var i = 0; i < Py.length; i++) {
            if (Py[i].x <= midPoint.x){
                P1.push(Py[i]);
            }
            else{
                P2.push(Py[i]);
            }
        }
      
 
        d1 = closestDivideAndConquer(Px,P1,mid);
        d2 = closestDivideAndConquer(Px,P2,n-mid);
        

        var d = Math.min(d1,d2)


        var borderPoints = []


        
        for (var i = 0; i < Py.length; i++){
            if (Math.abs(Py[i].x - midPoint.x) < d)
                borderPoints.push(Py[i]);
        }

        var result = Math.min(d,CheckBorderPoints(borderPoints,d))

        return result
    }

function CheckBorderPoints(points,minDist){

    if(points.length <2)
        return minDist;
 
    var list = []
    var min = minDist
    for (var i = 0; i < points.length-1; i++) {
        for (var j = i+1; j < points.length && (points[j].y-points[i].y < min); j++) {
            if (dist(points[i],points[j]) < min){
                list = []
                list.push(points[i])
                list.push(points[j])
                min = dist(points[i], points[j]);
            }
           }
    }
    if(list.length ==2){
        pointsToCheck = []
        pointsToCheck.push(list[0])
        pointsToCheck.push(list[1])
    }
    return min;
}

function Partition (array, low, high, type)
{
    var pivot = array[high];    // pivot
    var i = (low - 1);  // Index of smaller element
    var swapValues
    for (var j = low; j <= high- 1; j++)
    {
        if (type=='x'){
            swapValues = array[j].x <= pivot.x;
        }
        else if(type=='y'){
            swapValues = array[j].y <= pivot.y;
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

function clearCanvas(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}