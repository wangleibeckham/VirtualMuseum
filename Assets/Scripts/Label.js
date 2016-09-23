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

//function OnMouseUp()
//{
//	isClicked = false;
//}

function OnGUI()
{
	if (isClicked == true) {
		GUI.Label ( Rect (10,10,200,20), "The Hidden Dinosaur Skeleton!");
		GUI.Label ( Rect (10, 40, textureToDisplay.width, textureToDisplay.height), textureToDisplay);
	}
}