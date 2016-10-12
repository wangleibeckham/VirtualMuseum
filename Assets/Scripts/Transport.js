#pragma strict

public var sceneName : String;

function OnMouseOver(){
	if(Input.GetMouseButtonDown(0)){
    	SceneManagement.SceneManager.LoadScene(sceneName);
	}
}

function Start () {

}

function Update () {

}