using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class MathFuncs
{
    public static float polarAngle(Vector2 p, Vector2 p0)
    {
        return Mathf.Atan2(p.y - p0.y, p.x - p0.x);
    }

    public static float dotProduct(Vector2 v1, Vector2 v2)
    {
        return (v1.x * v2.x + v1.y * v2.y);
    }

    public static int ccw(Vector2 p1, Vector2 p2, Vector2 p3)
    {
        // ccw > 0: counter-clockwise; ccw < 0: clockwise; ccw = 0: collinear
        return (int) ((p2.x - p1.x) * (p3.y - p1.y)
        - (p2.y - p1.y) * (p3.x - p1.x));
    }

}
