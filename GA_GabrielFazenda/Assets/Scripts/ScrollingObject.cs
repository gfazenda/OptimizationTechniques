using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScrollingObject : MonoBehaviour {
	private BoxCollider2D groundCollider;       //This stores a reference to the collider attached to the Ground.
    private float objectHorizontalLength;       //A float to store the x-axis length of the collider2D attached to the Ground GameObject.
    public float speed = 5f;
    //Awake is called before Start.
    private void Awake ()
    {
        //Get and store a reference to the collider2D attached to Ground.
        groundCollider = GetComponent<BoxCollider2D> ();
        //Store the size of the collider along the x axis (its length in units).
        objectHorizontalLength = groundCollider.bounds.size.x - 10;
    }

    private Rigidbody2D rb2d;

    // Use this for initialization
    void Start () 
    {
        //Get and store a reference to the Rigidbody2D attached to this GameObject.
        rb2d = GetComponent<Rigidbody2D>();

        //Start the object moving.
        rb2d.velocity = new Vector2 (speed, 0);
    }

    //Update runs once per frame
    private void Update()
    {
        //Check if the difference along the x axis between the main Camera and the position of the object this is attached to is greater than groundHorizontalLength.
        if (Mathf.Abs(transform.position.x) > objectHorizontalLength)
        {
            //If true, this means this object is no longer visible and we can safely move it forward to be re-used.
            RepositionBackground ();
        }
    }

    //Moves the object this script is attached to right in order to create our looping background effect.
    private void RepositionBackground()
    {
        //This is how far to the right we will move our background object, in this case, twice its length. This will position it directly to the right of the currently visible background object.
        transform.position = new Vector3(objectHorizontalLength, transform.position.y,10);
    }


}
