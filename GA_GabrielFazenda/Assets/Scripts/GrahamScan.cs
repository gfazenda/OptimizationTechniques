using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class GrahamScan : MonoBehaviour {
    
    public Vector2 initial { get; private set; }

    static GrahamScan instance;

    List<Vector2> hullPoints = new List<Vector2>();

    public delegate bool Compare(Point a, Point b); 

    private void Start()
    {
        instance = this;
    }

    public bool CompareX(Point a, Point b)
    {
        return a.position.x < b.position.x;
    }

    public bool CompareY(Point a, Point b)
    {
        return a.position.y < b.position.y;
    }

    public bool CompareAngle(Point a, Point b)
    {
        if (a.angle.CompareTo(b.angle) == 0)
        {
            //se angulos iguais, ordena por distancia
            //Debug.Log("p1 " + a.position + " p2 " + b.position);
            //Debug.Log(Vector2.Distance(GrahamScan.instance.initial, a.position) + " " + Vector2.Distance(GrahamScan.instance.initial, b.position));
            return Vector2.Distance(b.position, GrahamScan.instance.initial) > Vector2.Distance(a.position, GrahamScan.instance.initial) ? true : false;
        }
        return a.angle < b.angle;
    }


    public List<Vector2> PerformScan(List<Vector2> points)
    {
        List<Point> listOfPoints = new List<Point>();
        for (int i = 0; i < points.Count; i++)
        {
            listOfPoints.Add(new Point(points[i]));
        }
        hullPoints = new List<Vector2>();
        return DoGrahamScan(listOfPoints);
        //Draw();
    }
    //List<Vector2> aaa = new List<Vector2>();
    List<Vector2> DoGrahamScan(List<Point> points)
    {
      
        QuickSort(points, 0, points.Count - 1, CompareY);

        initial = points[0].position;
        
        points.RemoveAt(0);

        for (int i = 0; i < points.Count; i++)
        {
            var angle = MathFuncs.polarAngle(points[i].position, initial);
            points[i].angle = angle;
            // console.log(array[i].angle);

        }

        QuickSort(points, 0, points.Count - 1, CompareAngle);

        for (int i = 0; i < points.Count - 1; i++)
        {
            while (i < points.Count - 1 && MathFuncs.ccw(initial, points[i].position, points[i + 1].position) == 0)
            {
                points.RemoveAt(i+1);
                i++;
            }

        }

        if(points.Count < 3){
            Debug.Log("not valid hull");
            return null;
        }
            

        hullPoints.Add(initial);
        hullPoints.Add(points[0].position);
        hullPoints.Add(points[1].position);
       
        for (int i = 2; i < points.Count; i++)
        {
            while (MathFuncs.ccw(hullPoints.SecondToLast(), hullPoints.Last(), points[i].position) <= 0)
            {
                hullPoints.Pop();
            }
            hullPoints.Add(points[i].position);
       
        }

        return hullPoints;
    }

    void QuickSort(List<Point> array, int low, int high, Compare sortType)
    {
        if (low < high)
        {
            /* pi is partitioning index, arr[p] is now
               at right place */
            var pi = Partition(array, low, high, sortType);

            // Separately sort elements before
            // partition and after partition
            QuickSort(array, low, pi - 1, sortType);
            QuickSort(array, pi + 1, high, sortType);
        }
    }

    int Partition(List<Point> array, int low, int high, Compare sortType)
    {
        var pivot = array[high];    // pivot
        var i = (low - 1);  // Index of smaller element
        var swapValues = false;
         for (var j = low; j <= high - 1; j++)
        {
            // If current element is smaller than or
            // equal to pivot
            swapValues = sortType(array[j], pivot);
           
            if (swapValues)
            {
                i++;
                array.Swap(i, j);
            }
        }
        array.Swap(i + 1, high);
        return (i + 1);
    }

    void Draw()
    {
      
        for (int i = 0; i < hullPoints.Count-1; i++)
        {
           
            DrawLine(hullPoints[i], hullPoints[i + 1], Color.red);
        }
        DrawLine(hullPoints[0], hullPoints.Last(), Color.red);
       
    }


    void DrawLine(Vector2 start, Vector2 end, Color color, float duration = 0.2f)
    {
        GameObject myLine = new GameObject();
        myLine.transform.position = start;
        myLine.AddComponent<LineRenderer>();
        LineRenderer lr = myLine.GetComponent<LineRenderer>();
        lr.material = new Material(Shader.Find("Particles/Alpha Blended Premultiply"));
        lr.SetColors(color, color);
        lr.SetWidth(0.3f,0.3f);
        
        lr.SetPosition(0, start);
        lr.SetPosition(1, end);
       // GameObject.Destroy(myLine, duration);
    }

    static int SortByPolarAngle(Point p1, Point p2)
    {
        if (p1.angle.CompareTo(p2.angle) == 0)
        {
            Debug.Log("p1 " + p1.position + " p2 " + p2.position);
            Debug.Log(Vector2.Distance(GrahamScan.instance.initial, p2.position) + " " + Vector2.Distance(GrahamScan.instance.initial, p1.position));
            return Vector2.Distance(p2.position, GrahamScan.instance.initial) > Vector2.Distance(p1.position, GrahamScan.instance.initial) ? -1 : 1;
        }
        return p1.angle.CompareTo(p2.angle);
    }


}


public class Point
{
    public Vector2 position;
    public float angle;

    public Point(Vector2 v)
    {
        position = v;
    }
}