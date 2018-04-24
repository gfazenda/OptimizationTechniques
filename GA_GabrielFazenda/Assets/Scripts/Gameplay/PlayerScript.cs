using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerScript : MonoBehaviour {
	public float speed = 10;
	Rigidbody2D rb2d;
	Bounds limits;
	// Use this for initialization
	void Start () {

		rb2d = this.GetComponent<Rigidbody2D>();
		limits = CameraBounds.OrthographicBounds(Camera.main);

		//Debug.Log(limits);
	//	Debug.Log(limits.Contains(Vector2.zero));
	}
	
	// Update is called once per frame
	void FixedUpdate () {
		//float moveHorizontal = Input.GetAxis ("Horizontal");

		//Store the current vertical input in the float moveVertical.
		float moveVertical = Input.GetAxis ("Vertical");
		float moveHorizontal = Input.GetAxis ("Horizontal");

		//Use the two store floats to create a new Vector2 variable movement.
		Vector2 movement = new Vector2 (0, moveVertical) * speed;

		//Call the AddForce function of our Rigidbody2D rb2d supplying movement multiplied by speed to move our player.
		//rb2d.AddForce (movement * speed);
		if(MoveIsValid(rb2d.position + movement * Time.fixedDeltaTime))
			rb2d.MovePosition(rb2d.position + movement * Time.fixedDeltaTime);
	}

 	private void OnCollisionEnter2D(Collision2D other)
	{
		if(other.gameObject.tag=="Asteroid"){
			GameManager.instance.EndGame(false);
		}
	}
	

	bool MoveIsValid(Vector2 position){
		return (position.y < limits.extents.y && position.y > -limits.extents.y && position.x > -limits.extents.x && position.x < -limits.extents.x+5);
	}
}
