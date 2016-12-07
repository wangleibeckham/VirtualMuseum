/**
Handles opening popups when clicked <br>
Judy Chung, Zhenwei Wang, Kammy Liu
@class Label
@extends MonoBehavior
**/

#pragma strict

/**
* Image holder for popup
* 
* @property texture
* @type Texture2D
*/
var texture : Texture2D;

/**
* Title of the popup
*
* @property title
* @type string
*/
var title: String;

/**
* Description of popup
*
* @property description
* @type String
*/
var description: String;


/**
* Reference to the Panel within the Popup game object
*
* @property panel
* @type GameObject
*/
private var panel : GameObject;

/**
 * Inherited from MonoBehavior. Called once on initialization. Stores reference to Popup's Panel object.
 *
 * @method Start
 */
function Start ()
{	
	var popup = GameObject.Find("Popup");
	panel = popup.transform.Find("Panel").gameObject;
}


/**
 * Triggered when the object is clicked. Toggles whether the Popup Panel is active and whether camera movement is enabled.
 *
 * @method OnMouseDown
 */
function OnMouseDown()
{
	var isOpen:boolean = panel.activeInHierarchy;
	if (!isOpen)
	{
		RenderContent();
	}

	Camera.main.GetComponent(Movement).enabled = isOpen;
	panel.SetActive(!isOpen);
}


/**
 * The function to render the content of the Popup.
 *
 * @method RenderContent
 */
function RenderContent()
{
	// title of the popup
	panel.transform.Find("Title Panel").transform.Find("Title").GetComponent(UI.Text).text = title;

	// description of the popup
	panel.transform.Find("Description Panel/Description").GetComponent(UI.Text).text = description;

	// image of the popup
	panel.transform.Find("Image").GetComponent(UI.RawImage).texture = texture;
}



