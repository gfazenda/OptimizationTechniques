using UnityEngine;
using System.Collections.Generic;
public class PolygonTest : MonoBehaviour {

	PolygonCollider2D pc2d;

    void Start () {
		//pc2d = this.GetComponent<PolygonCollider2D>();
  //      // Create Vector2 vertices
  //      Vector2[] vertices2D = new Vector2[] {
		//	new Vector2 ( 0.5f,  -12),
		//	new Vector2 ( 7,  -10),
		//	new Vector2 ( 11.5f,  -4),
		//	new Vector2 ( 5,  11.5f),
		//	new Vector2 ( 2,  12.5f),
		//	new Vector2 ( -10,  9),
		//	new Vector2 ( -13,  0.5f),
		//	new Vector2 ( -10.5f,  -11.5f)
  //      };
		
  //      // Use the triangulator to get indices for creating triangles
  //      Triangulator tr = new Triangulator(vertices2D);
  //      int[] indices = tr.Triangulate();
 
  //      // Create the Vector3 vertices
  //      Vector3[] vertices = new Vector3[vertices2D.Length];
  //      for (int i=0; i<vertices.Length; i++) {
  //          vertices[i] = new Vector3(vertices2D[i].x, vertices2D[i].y, 0);
  //      }

  //       Vector2[] uvs = new Vector2[vertices.Length];

  //      for (int i = 0; i < uvs.Length; i++)
  //      {
  //          uvs[i] = new Vector2(vertices[i].x, vertices[i].y);
  //      }
       


 
  //      // Create the mesh
  //      Mesh msh = new Mesh();
  //      msh.vertices = vertices;
  //     // msh.uv = uvs;
		////msh.SetVertices(vertices);
  //      msh.triangles = indices;
  //      msh.RecalculateNormals();
  //      msh.RecalculateBounds();

		//pc2d.points = vertices2D;
  //      // Set up game object with mesh;
  //      gameObject.AddComponent(typeof(MeshRenderer));
  //      MeshFilter filter = gameObject.AddComponent(typeof(MeshFilter)) as MeshFilter;
  //      filter.mesh = msh;
    }

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

        GameObject newPolygon = ObjectPooler.SharedInstance.GetPooledObject("Asteroid");//new GameObject();
        newPolygon.transform.position = Vector2.zero;
		//newPolygon.AddComponent(typeof(MeshRenderer));
        MeshFilter filter = newPolygon.GetComponent<MeshFilter>();//newPolygon.AddComponent(typeof(MeshFilter)) as MeshFilter;
        pc2d = newPolygon.GetComponent<PolygonCollider2D>();//newPolygon.AddComponent(typeof(PolygonCollider2D)) as PolygonCollider2D;

        Vector2[] vertices2D = ConvertListToArray(pointList);

        Triangulator tr = new Triangulator(vertices2D);
        int[] indices = tr.Triangulate();

        // Create the Vector3 vertices
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