/**
Handles pop-up in Scenes <br>
Judy Chung, Zhenwei Wang
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
* object holder for clickable canvas
*
* @property clickableCanvas
* @type GameObject
*/
var clickableCanvas: GameObject;

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
* define the style of the content
*
* @property style
* @type GUIStyle
*/
var style : GUIStyle;
/**
 * canvas is created, add listener to cancel button so the movement script can be enable when the cancel button is clicked
 *
 * @method Start
 */
function Start ()
{
	
	isClicked = false;
	clickableCanvas.SetActive(isClicked);
	Camera.main.GetComponent(Movement).enabled = true;

	var cancelButton= clickableCanvas.transform.Find("clickablePanel").Find("cancelButton").GetComponent(UI.Button);
	cancelButton.onClick.AddListener(TaskOnClick);

}

/**
 * the function that is triggered when the cancel button is clicked.
 *
 * @method TaskOnClick
 */
function TaskOnClick()
{
	Camera.main.GetComponent(Movement).enabled = true;
	isClicked = false;
}


/**
 * if mouse is clicked changes variable isClicked to be true, 
 * and disable movement script if isClicked or enable it if !isClicked.
 *
 * @method OnMouseDown
 */
function OnMouseDown()
{
	isClicked = !isClicked;
	if (isClicked){
		renderContent();
		Camera.main.GetComponent(Movement).enabled = false;
	}
	else{
		Camera.main.GetComponent(Movement).enabled = true;
	}
	clickableCanvas.SetActive(isClicked);

}


/**
 * the function to render the content of the clickablecanvas. 
 *
 * @method renderContent
 */
function renderContent()
{
// title of the clickable
	var clickableTitle = clickableCanvas.transform.Find("clickablePanel").Find("title").GetComponent(UI.Text);
	clickableTitle.text = title; 

	// description of the clickable
	var clickableDescription = clickableCanvas.transform.Find("clickablePanel").Find("descriptionPanel").Find("description").GetComponent(UI.Text);
	clickableDescription.text = description; 

	// image of the popup
	var clickableImage = clickableCanvas.transform.Find("clickablePanel").Find("image").GetComponent(UI.RawImage);
	clickableImage.texture = textureToDisplay; 
}



