using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour {
	public Text distanceText, endGameText;
	public GameObject panel;

	public static GameManager instance {get; private set;}
	int distance = 0;
	float counter = 0;
	public float speed = 5;
	public int distanceGoal = 200;
	// Use this for initialization
	void Awake () {
		instance = this;
	}


	void LateUpdate (){
		counter += Time.deltaTime * speed;
		distance = (int)counter;
		distanceText.text = distance.ToString() + " M";
		if(distance >= distanceGoal){
			EndGame();
		}
	}

	public void EndGame(bool won = true){
		Time.timeScale = 0;
		endGameText.text = won ? "You Won!" : "You Lost";
		endGameText.color = won ? Color.green : Color.red;
		panel.SetActive(true);
	}

	 public void ReloadLevel()
    {
		Time.timeScale = 1;
        Debug.Log("reload");
        Scene scene = SceneManager.GetActiveScene();
        SceneManager.LoadScene(scene.name);
    }

	public void Quit(){
		Application.Quit();
	}


}
