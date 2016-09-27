#pragma strict
var isClicked: boolean;
var textureToDisplay : Texture2D;

// var movement : Movement;
// var c : UnityEngine.GameObject;

function Start ()
{
	isClicked = false;
	if (gameObject.GetComponent(Collider) == null)
	{
		gameObject.AddComponent(typeof(BoxCollider));
	}

	// c = GameObject.Find("Main Camera");
	// movement = c.GetComponent(Movement);
}

function OnMouseDown()
{
	isClicked = !isClicked;
	// movement.frozen = true;
}

//function OnMouseUp()
//{
//	isClicked = false;
//}

function DoWindow0 (windowID : int)
{
	var Button = GUI.Button (Rect (10,30, 80, 20), "Back");
	if(Button)
	{
		isClicked = false;
	}
}

function OnGUI()
{
	if (isClicked == true) {
		GUI.Label ( Rect (10,10,200,20), "The Hidden Dinosaur Skeleton!");
		GUI.Label ( Rect (10, 40, textureToDisplay.width, textureToDisplay.height), textureToDisplay);
	}

	// Make a toggle button for hiding and showing the window
	// isClicked = GUI.Toggle (Rect (10,10,100,20), isClicked, "MENU");
	// Make sure we only call GUI.Window if doWindow0 is true.
	if (isClicked)
	{
		GUI.ModalWindow (0, Rect (11,10,200,60), DoWindow0, "Basic Window");
	}
}
