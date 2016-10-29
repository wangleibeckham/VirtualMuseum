/**
Handles opening popups when clicked <br>
Judy Chung, Zhenwei Wang, Kammy Liu
@class Label
@extends MonoBehavior
**/

#pragma strict

/**
* image holder for pop-up
* 
* @property texture
* @type Texture2D
*/
var texture : Texture2D;

/**
* Title of the pop-up
*
* @property title
* @type string
*/
var title: String;

/**
* Description of pop-up
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
* Reference to the Panel within the Popup game object
*
* @property panel
* @type GameObject
*/
private var panel : GameObject;

/**
 * Called on initialization. Stores reference to Popup's Panel object
 *
 * @method Start
 */
function Start ()
{	
	var popup = GameObject.Find("Popup");
	panel = popup.transform.Find("Panel").gameObject;
}


/**
 * If mouse is clicked toggles whether the Popup Panel is active and whether camera movement is enabled 
 *
 * @method OnMouseDown
 */
function OnMouseDown()
{
	var isOpen:boolean = panel.activeInHierarchy;
	if (!isOpen){
		renderContent();
	}

	Camera.main.GetComponent(Movement).enabled = isOpen;
	panel.SetActive(!isOpen);
}


/**
 * the function to render the content of the Popup 
 *
 * @method renderContent
 */
function renderContent()
{
	// title of the popup
	panel.transform.Find("Title").GetComponent(UI.Text).text = title;

	// description of the popup
	panel.transform.Find("Description Panel/Description").GetComponent(UI.Text).text = description;

	// image of the popup
	panel.transform.Find("Image").GetComponent(UI.RawImage).texture = texture;
}



