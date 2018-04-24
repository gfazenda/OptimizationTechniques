using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Parallax : MonoBehaviour {
   public float speed;
    Vector2 startPos;
	Renderer renderer;
 // Use this for initialization
 void Start () {
        renderer = this.GetComponent<Renderer>();
        startPos = transform.position;
 }

    private BoxCollider2D groundCollider;       //This stores a reference to the collider attached to the Ground.
    private float groundHorizontalLength;       //A float to store the x-axis length of the collider2D attached to the Ground GameObject.

    //Awake is called before Start.
    private void Awake()
    {
        //Get and store a reference to the collider2D attached to Ground.
        groundCollider = GetComponent<BoxCollider2D>();
        //Store the size of the collider along the x axis (its length in units).
        groundHorizontalLength = groundCollider.bounds.size.x - 10;
    }

    // Update is called once per frame
    void Update () {
        //Vector2 offset = new Vector2(Time.time * speed, 0);
        //renderer.material.mainTextureOffset = offset;

        float newPos = Mathf.Repeat(Time.time * speed, 50);
        transform.position = startPos + Vector2.right * newPos;
    }
}
