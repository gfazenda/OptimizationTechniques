using System.Collections;
using System.Collections.Generic;
using UnityEngine;



public class MousePoints : MonoBehaviour {
    public GameObject a;
    bool clicked = false, over = false;
    List<Vector2> listOfMousePoints = new List<Vector2>();
    List<Vector2> polygonPoints = new List<Vector2>();


    float delay = 0.05f, currDelay = 0;
    HashSet<Vector2> thepoints = new HashSet<Vector2>();
    private void Start()
    {
        currDelay = delay;
        
    }

    private void OnMouseEnter()
    {
        over = true;
    }


    private void OnMouseExit()
    {
        over = false;
    }


    private void OnMouseDown()
    {
        clicked = true;
        //AddPoint();
    }



    private void OnMouseUp()
    {
        clicked = false;
        listOfMousePoints = new List<Vector2>(thepoints);

        polygonPoints = this.GetComponent<GrahamScan>().PerformScan(listOfMousePoints);

        listOfMousePoints.Clear();

        //Instantiate(this.GetComponent<PolygonTest>().CreatePolygon(polygonPoints),Vector2.zero, Quaternion.identity);
        this.GetComponent<PolygonTest>().CreatePolygon(polygonPoints);
    }

    void AddPoint()
    {
        currDelay += Time.deltaTime;
        if(currDelay >= delay)
        {
            Vector2 pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            GameObject point = ObjectPooler.SharedInstance.GetPooledObject("Point");
            point.transform.position = pos;
            point.SetActive(true);
            //Instantiate(a, pos, transform.rotation);
            currDelay = 0;
           // if(!listOfMousePoints.Contains(pos))
            //    listOfMousePoints.Add(pos);

            thepoints.Add(pos);
           
        }
    }

    void Update()
    {
         if (Input.GetKeyDown(KeyCode.A))
        {
            listOfMousePoints = new List<Vector2>(thepoints);
            this.GetComponent<GrahamScan>().PerformScan(listOfMousePoints);
            listOfMousePoints.Clear();
        }
        if (clicked && over)
        {
            AddPoint();
        }
    }
}
