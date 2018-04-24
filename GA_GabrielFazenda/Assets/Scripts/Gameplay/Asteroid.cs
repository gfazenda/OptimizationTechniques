using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Asteroid : MonoBehaviour {
	Rigidbody2D rb2d;
	public float speed = 5f, min = 3f, max = 8f;
	Vector2 movement = new Vector2(-1,0);
	// Use this for initialization
	void Start () {
		rb2d = this.GetComponent<Rigidbody2D>();
		movement *= speed;
	}

	private void OnEnable()
	{
		movement = new Vector2(-Random.Range(min,max),0);
	}
	
	// Update is called once per frame
	void FixedUpdate () {
		rb2d.MovePosition(rb2d.position + movement * Time.fixedDeltaTime);
	}
}
