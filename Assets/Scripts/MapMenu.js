#pragma strict
var isClicked: boolean;
var textureToDisplay : Texture2D;

function Start ()
{
	isClicked = false;
	if (gameObject.GetComponent(Collider) == null)
	{
		gameObject.AddComponent(typeof(BoxCollider));
	}
}

function OnMouseDown()
{
	isClicked = !isClicked;
}

// Make the contents of the window.
function DoWindow0 (windowID : int) 
{
	var Button = GUI.Button (Rect (10,30, 80,20), "Close");
	if(Button)
	{
		isClicked = false;
	}
}

function OnGUI () 
{
	// Make a toggle button for hiding and showing the window
	isClicked = GUI.Toggle (Rect (10,10,100,20), isClicked, "MENU");
	// Make sure we only call GUI.Window if doWindow0 is true.
	if (isClicked)
	{
		GUI.ModalWindow (0, Rect (110,10,200,60), DoWindow0, "Basic Window");
	}
}