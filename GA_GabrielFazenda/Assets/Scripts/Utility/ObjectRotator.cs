using UnityEngine;
using System.Collections;

public class ObjectRotator : MonoBehaviour {
	public float rotationAngle = 45;
	//Update is called every frame
	void Update () 
	{
		//Rotate thet transform of the game object this is attached to by 45 degrees, taking into account the time elapsed since last frame.
		transform.Rotate (new Vector3 (0, 0, rotationAngle) * Time.deltaTime, Space.Self);
	//	transform.Rotate(Vector3.back * rotationAngle * Time.deltaTime);

		//transform.eulerAngles = new Vector3 (0, 0, rotationAngle);
		//transform.rotation =  new Quaternion(0, 0, rotationAngle * Time.deltaTime, 0);
	}
}
