using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScreenLimit : MonoBehaviour {


		void OnTriggerExit2D(Collider2D other)
		{
			Debug.Log("here " + other.tag);

			if(other.tag=="Asteroid"){
				Destroy(other.gameObject);
			}
		}



}
