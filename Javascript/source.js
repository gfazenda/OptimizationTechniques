
var canvas = document.getElementById("ccanvas"),
ctx = canvas.getContext("2d");
var L = [];


function DoTest(){
  
    fillL();
    var result = getLinesIntersections(L);
    console.log(result.length)

    DrawLines()

    for (var i = 0; i < result.length; i++) {
        DrawPoint(result[i].x,result[i].y);
    }
}

function fillL(){
    // for (var i = 0; i < 10; i++) {
    //     var p0 = {x:i,y:i+20}
    //     var p1 = {x:i+15,y:i+50}
    //    // var p = {p1,p2}
    //     L[i] = {p0,p1}
    //     console.log(L[i])
    // }
    var p0 = {x:10,y:10}
    var p1 = {x:100,y:10}
    L[0] = {p0,p1}

    var p0 = {x:50,y:0}
    var p1 = {x:50,y:20}
    L[1] = {p0,p1}

    var p0 = {x:160,y:0}
    var p1 = {x:260,y:280}
    L[2] = {p0,p1}

    var p0 = {x:110,y:20}
    var p1 = {x:310,y:210}
    L[3] = {p0,p1}
}

function DrawLines(){
    for (var i = 0; i < L.length; i++) {
        Draw(L[i].p0,L[i].p1)
    }
}

function DrawPoint(x,y){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x-2.5,y-2.5,5,5);
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

function linesIntersection(L1, L2) {
        var det = (L2.p1.x - L2.p0.x) * (L1.p1.y - L1.p0.y)
                    - (L2.p1.y - L2.p0.y) * (L1.p1.x - L1.p0.x);
        if (det === 0) {
             return null; // não há intersecção
        }
        var s = ((L2.p1.x - L2.p0.x) * (L2.p0.y - L1.p0.y)
                - (L2.p1.y - L2.p0.y) * (L2.p0.x - L1.p0.x)) / det;
        if((s > 1) || (s < 0)) {
            return null; // não há interseção
        }
        
        var x = L1.p0.x + (L1.p1.x-L1.p0.x)*s;
        var y = L1.p0.y + (L1.p1.y-L1.p0.y)*s;
        
        return {"x": x, "y": y}; // ponto de interseção!

}