//using System.Collections;
//using System.Collections.Generic;
//using UnityEngine;

//public class MeshCreator : MonoBehaviour {

//	Vector3[] newVertices;
//	public List<Vector3> vertices;
//    Vector2[] newUV;
//    int[] newTriangles;

//    void Start()
//    {
//		Vector2 a = Vector2.zero;
//		vertices.Add(a);

//        newUV = new Vector2[4];

//        newUV[0] = new Vector2(0, 0);
//        newUV[1] = new Vector2(1, 0);
//        newUV[2] = new Vector2(0, 1);
//        newUV[3] = new Vector2(1, 1);


//		// newVertices = new Vector3[vertices.Count];
//		// for(int i=0;i<vertices.Count;i++){
//		// 	newVertices[i] = vertices[i];
//		// }
//        Mesh mesh = GetComponent<MeshFilter>().mesh;

//        mesh.Clear();

//        // Do some calculations...
//      //  mesh.vertices = newVertices;
//		mesh.SetVertices(vertices);
//        mesh.uv = newUV;
        
//        mesh.triangles = newTriangles;
//    }

//	private static Mesh PolygonMesh(Vector2[] vertices, Color fillColor)
//    {
//        // Find all the triangles in the shape
//       // var triangles = new Triangulator(vertices).Triangulate();
		
//        // Assign each vertex the fill color
//       // var colors = Enumerable.Repeat(fillColor, vertices.Length).ToArray();

//        Mesh mesh = new Mesh {
//            name = "Triangle",
//            vertices = vertices.ToVector3(),
//        };
		
//        mesh.RecalculateNormals();
//        mesh.RecalculateBounds();

//        return mesh;
//    }

	
//}
////https://medium.com/@hyperparticle/draw-2d-physics-shapes-in-unity3d-2e0ec634381c
////https://www.h3xed.com/programming/automatically-create-polygon-collider-2d-from-2d-mesh-in-unity