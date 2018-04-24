using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour {
	public Text distanceText;
	int distance = 0;
	float counter = 0;
	public float speed = 5;
	// Use this for initialization
	void Start () {

	}


	void LateUpdate (){
		counter += Time.deltaTime * speed;
		distance = (int)counter;
		distanceText.text = distance.ToString() + " M";
	}



}
