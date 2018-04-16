using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GrahamScan : MonoBehaviour {
    Vector2 initial;
    Queue<Vector2> hullPoints = new Queue<Vector2>();

    DoGrahamScan(List<Vector2> points)
    {
        initial = points[0];


        points.RemoveAt(0);
        //console.log('2222222')
        // console.log(initial)

        //for (var i = 0; i < array.length; i++)
        //{
        //    var angle = polarAngle(array[i], initial);
        //     array[i].angle = angle;
        //    // console.log(array[i].angle);

        //}
        //// console.log('dklsfdkl')
        //// console.log(array)


        //InsertSortByAngle(array);


    // hullPoints.push(array[0])
    // hullPoints.push(array[1])
    // //hullPoints.push(array[2])
    // return;

        hullPoints.Enqueue(initial);
        hullPoints.Enqueue(points[0]);
        hullPoints.Enqueue(points[1]);

    for (int i = 2; i < points.Count; i++)
        {
            // while (ccw(hullPoints, hullPoints.(), points[i]) < 0)
            {
                hullPoints.Dequeue();
            }
            hullPoints.Enqueue(points[i])
       
        }
    }
}
