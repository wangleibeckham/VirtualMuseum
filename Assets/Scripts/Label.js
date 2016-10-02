/**
Handles pop-up in Scene 1
Judy Chung
@class Label
@extends MonoBehavior
**/

#pragma strict

/**
* if mouse is clicked
*
* @property isClicked
* @type boolean
*/
var isClicked: boolean;

/**
* image holder for pop-up
*
* @property textureToDisplay
* @type Texture2D
*/
var textureToDisplay : Texture2D;

/**
* string used to display the title of the pop-up
*
* @property title
* @type string
*/
var title: String;

/**
* description of pop-up
*
* @property description
* @type String
*/
var description: String;

/**
* variable for "Back" button
*
* @property back
* @type String
*/
var back = "Back";

/**
* define the style of the content
*
* @property style
* @type GUIStyle
*/
var style : GUIStyle;

/**
 * box collider is created
 *
 * @method Start
 */
function Start ()
{
	;
	isClicked = false;
	if (gameObject.GetComponent(Collider) == null)
	{
		gameObject.AddComponent(typeof(BoxCollider));
	}

}

/**
 * if mouse is clicked changes variable isClicked to be true
 *
 * @method OnMouseDown
 */
function OnMouseDown()
{
	isClicked = !isClicked;
}

/**
 * makes the content of the window of pop-up display using GUI.Labels
 *
 * @method DoWindow0
 */
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

/**
 * is run when the GUI is called and disables background movement when pop-up is displayed
 *
 * @method OnGui
 */
function OnGUI()
{
	if (isClicked)
	{
		Camera.main.GetComponent(Movement).enabled = false;
		GUI.backgroundColor=Color.grey;
		GUI.ModalWindow (0, Rect (0,0,Screen.width,Screen.height), DoWindow0, title,style);
		style.fontSize = 20;
		style.alignment = TextAnchor.UpperCenter;
	}
	if (!isClicked){
		Camera.main.GetComponent(Movement).enabled = true;
	}
}
