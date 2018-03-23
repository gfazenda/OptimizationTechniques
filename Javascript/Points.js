
var canvas = document.getElementById("BrutePointCanvas"),
ctx = canvas.getContext("2d");

var canvas = document.getElementById("DividedPointCanvas"),
ctx2 = canvas.getContext("2d");

var Points = [];
var size = 16;
var height = 500, width = 500
var list = []
var thing = []

function DoTest(){
  
    FillList();
    InsertSort(Points);
    console.log(Points)
    var resultDivide = closestDivideAndConquer(Points)
    var resultBrute = BruteForce(Points,size);
    DrawPoints()
    DrawPoints2()
    console.log('resultBrute: ' + dist(resultBrute[0],resultBrute[1]))
    console.log('resultDivide: ' + resultDivide)
    console.log(resultBrute)
   DrawPoint(thing[0].x,thing[0].y, "#FF0000")
   DrawPoint(thing[1].x,thing[1].y, "#FF0000")

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
            list.push(P[0])
            list.push(P[1])
            return dist(P[0],P[1]);
        }

        var mid = (P.length+1)/2;
        console.log(mid)
        //var midPoint = P[mid];
        var P1 = [], P2 = [];
        for (var i = 0; i < P.length; i++) {
            if(i<mid)
                P1.push(P[i]);
            else
                P2.push(P[i]);
        }
        console.log('l1:'+P1.length)
        console.log('l2:'+P2.length)
        d1 = closestDivideAndConquer(P1);
        d2 = closestDivideAndConquer(P2);
        d3 = dist(P1[P1.length-1],P2[0]); 
        list.push(P1[P1.length-1])
        list.push(P2[0])

        var d = Math.min(d1,d2,d3)
        var result = d
        // var result = d2 < d1 ? d2 : d1;
        // result = result < d3 ? result : d3;
        thing = []
        if(result==d1){
            thing.push(list[0])
            thing.push(list[1])
        }
        else if (result ==d2){
            thing.push(list[2])
            thing.push(list[3])
        }
        else{
            thing.push(list[4])
            thing.push(list[5])
        }
        console.log(thing)
        return d







    // // If there are 2 or 3 points, then use brute force
    // if (n <= 3)
    //     return bruteForce(P, n);

    // // Find the middle point
    // var mid = n/2;
    // var midPoint = P;

    // // Consider the vertical line passing through the middle point
    // // calculate the smallest distance dl on left of middle point and
    // // dr on right side
    // var dl = closestUtil(P, mid);
    // var dr = closestUtil(P + mid, n-mid);

    // // Find the smaller of two distances
    // var d = min(dl, dr);

    // // Build an array strip[] that contains points close (closer than d)
    // // to the line passing through the middle point
    // var strip = [];
    // var j = 0;
    // for (var i = 0; i < n; i++)
    // if (Math.abs(P[i].x - midPoint.x) < d)
    //     strip[j] = P[i], j++;

    // // Find the closest points in strip.  Return the minimum of d and closest
    // // distance is strip[]
    // return min(d, stripClosest(strip, j, d) );
}

function closest(P, n)
{
    qsort(P, n, sizeof(Point), compareX);
 
    // Use recursive function closestUtil() to find the smallest distance
    return closestUtil(P, n);
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
		while (j >= 0 && array[j].x > key.x)
		{
			array[j + 1] = array[j];
			j = j - 1;
		}
		array[j + 1] = key;
	}
    }
}