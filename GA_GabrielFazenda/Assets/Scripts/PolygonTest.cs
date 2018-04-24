using UnityEngine;
using System.Collections.Generic;
public class PolygonTest : MonoBehaviour {

	PolygonCollider2D pc2d;
    GameObject newPolygon;
    MeshFilter filter;
    Vector2[] ConvertListToArray(List<Vector2> list)
    {
        Vector2[] array = new Vector2[list.Count];
        for (int i = 0; i < list.Count; i++)
        {
            array[i] = list[i];
        }
        return array;
    }


	public GameObject CreatePolygon(List<Vector2> pointList){
        newPolygon = null;
        

        newPolygon = ObjectPooler.SharedInstance.GetPooledObject("Asteroid");//new GameObject();
        
        newPolygon.transform.position = Vector2.zero;
        filter = newPolygon.GetComponent<MeshFilter>();
        pc2d = newPolygon.GetComponent<PolygonCollider2D>();

        Vector2[] vertices2D = ConvertListToArray(pointList);

        Triangulator tr = new Triangulator(vertices2D);
        int[] indices = tr.Triangulate();

        Vector3[] vertices = new Vector3[vertices2D.Length];
        for (int i = 0; i < vertices.Length; i++)
        {
            vertices[i] = new Vector3(vertices2D[i].x, vertices2D[i].y, 0);
        }

        Vector2[] uvs = new Vector2[vertices.Length];

        for (int i = 0; i < uvs.Length; i++)
        {
            uvs[i] = new Vector2(vertices[i].x, vertices[i].y);
        }

        Mesh msh = new Mesh();
        msh.vertices = vertices;
        msh.triangles = indices;
        msh.RecalculateNormals();
        msh.RecalculateBounds();

        pc2d.points = vertices2D;

        filter.mesh = msh;
        newPolygon.SetActive(true);
        return newPolygon;
	}

}