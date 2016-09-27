#pragma strict

var isClicked: boolean;
var textureToDisplay : Texture2D;
var title: String;
var description: String;
var back = "Back";
var style : GUIStyle;
// var c : UnityEngine.GameObject;

function Start ()
{
	;
	isClicked = false;
	if (gameObject.GetComponent(Collider) == null)
	{
		gameObject.AddComponent(typeof(BoxCollider));
	}

}

function OnMouseDown()
{
	isClicked = !isClicked;
//	 movement.frozen = true;
}

//function OnMouseUp()
//{
//	isClicked = false;
//}

function DoWindow0 (windowID : int)
{
	
	GUI.Label ( 
	Rect (10, 30, 
				(textureToDisplay.width >Screen.width*2/3)? Screen.width*2/3:textureToDisplay.width, 
				textureToDisplay.height
		 ), textureToDisplay);

	GUI.Label ( Rect (
	(textureToDisplay.width >Screen.width*2/3)? Screen.width*2/3+30:textureToDisplay.width+30,
	30,
	Screen.width/3,
	textureToDisplay.height), description);
	var Button = GUI.Button (Rect (10,textureToDisplay.height+50, 100, 50), back);
	if(Button)
	{
		
		isClicked = !isClicked;
	}
}

function OnGUI()
{
//	if (isClicked == true) {
//		GUI.Label ( Rect (10,10,200,20), "The Hidden Dinosaur Skeleton!");
//		GUI.Label ( Rect (10, 40, textureToDisplay.width, textureToDisplay.height), textureToDisplay);
//	}

	// Make a toggle button for hiding and showing the window
	// isClicked = GUI.Toggle (Rect (10,10,100,20), isClicked, "MENU");
	// Make sure we only call GUI.Window if doWindow0 is true.
	if (isClicked)
	{
		GUI.backgroundColor=Color.grey;
		GUI.ModalWindow (0, Rect (0,0,Screen.width,Screen.height), DoWindow0, title,style);
		style.fontSize = 20;
		style.alignment = TextAnchor.UpperCenter;
	}
}
