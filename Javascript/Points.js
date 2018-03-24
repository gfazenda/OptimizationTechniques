
var canvas = document.getElementById("BrutePointCanvas"),
ctx = canvas.getContext("2d");

var canvas = document.getElementById("DividedPointCanvas"),
ctx2 = canvas.getContext("2d");

var PointsX = [], PointsY = [], Points = [];
var size = 16;
var height = 500, width = 500
var list = []
var thing = []

function DoTest(){
  
    FillList();
    InsertSort(Points);
    console.log(Points)
    var resultDivide = closestDivideAndConquer(Points)
    console.log('tttt')
    console.log(thing);
    var resultBrute = BruteForce(Points,size);
    DrawPoints()
    DrawPoints2()
    console.log('resultBrute: ' + dist(resultBrute[0],resultBrute[1]))
    console.log('resultDivide: ' + resultDivide)
    console.log(resultBrute)
   
//     DrawPoint(thing[0].x,thing[0].y, "#FF0000")
//    DrawPoint(thing[1].x,thing[1].y, "#FF0000")

}

function FillList(){
    Points[0] = {x:-13,y:0.5}
    Points[1] = {x:-10.5,y:-11.5}
    Points[2] = {x:-10,y:9}
    Points[3] = {x:-4.5,y:-2}
    Points[4] = {x:-1,y:8.5}
    Points[5] = {x:0.5,y:6}
    Points[6] = {x:0.5,y:-12}
    Points[7] = {x:2,y:12.5}
    Points[8] = {x:3.5,y:11}
    Points[9] = {x:5.5,y:3}
    Points[10] = {x:5.5,y:-7}
    Points[11] = {x:5,y:11.5}
    Points[12] = {x:6.5,y:3.2}
    Points[13] = {x:7,y:-10}
    Points[14] = {x:9,y:-5}
    Points[15] = {x:11.5,y:-4} 
}

function BruteForce(P, n){
        var minDist = Infinity;
        var closest = [];
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
    ctx.fillRect(mW+(x*multiplier)-(pointSize/2),mH+(y*multiplier)-(pointSize/2),pointSize,pointSize);
}

function DrawPoint2(x,y, color){
    ctx2.fillStyle = color;
    ctx2.fillRect(mW+(x*multiplier)-(pointSize/2),mH+(y*multiplier)-(pointSize/2),pointSize,pointSize);
}


function closestDivideAndConquer(P){
    // console.log('a')    
    
        if(P.length==1)
            return Infinity
        if(P.length==2){
            return dist(P[0],P[1]);
        }

        var mid = (P.length)/2;
        console.log(mid)
        var midPoint = P[mid]
        //var midPoint = P[mid];
        var P1 = [], P2 = [];
        for (var i = 0; i < P.length; i++) {
            if(i<mid)
                P1.push(P[i]);
            else
                P2.push(P[i]);
        }
        console.log('L1: '+P1.length)
        console.log('L2: '+P2.length)
        d1 = closestDivideAndConquer(P1);
        d2 = closestDivideAndConquer(P2);

        var strip = []
        for (var i = 0; i < P.length; i++){
            if (Math.abs(P[i].x - midPoint.x) < d)
                strip.push(P[i])
        }
        var d = Math.min(d1,d2)
        // var result = d
        console.log('oowowo')
        return Math.min(d,CheckClosest(strip,d))
    }

function CheckClosest(points,minDist){
    InsertSort(points,false)
    var min = minDist
    for (var i = 0; i < points.length; i++) {
        for (var j = 0; j < points.length && (points[j].y-points[y].y)<min; j++) {
            if (dist(points[i],points[j]) < min)
                min = dist(points[i], points[j]);
           }
    }
    return min;
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