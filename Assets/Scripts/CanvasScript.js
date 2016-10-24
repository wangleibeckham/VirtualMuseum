/**
* Handles responding to user interaction with the Canvas (Map Menu) and any OnClick or OnValueChange functions for buttons and dropdowns in it.<br>
* Megan DuPriest<br>
* Original code source: none
*
* @class CanvasScript
* @extends MonoBehavior
**/

/**
* is the map menu visible
*
* @property show
* @type boolean
**/
var show = false;

/**
* object representing the Image GameObject
*
* @property ImageComponent
* @type UnityEngine.UI.Image
**/

var ImageComponent : UnityEngine.UI.Image;

/**
* the first floor map of the museum
* 
* @property Image1
* @type Sprite
**/
var Image1 : Sprite;

/**
* the second floor map of the museum
* 
* @property Image2
* @type Sprite
**/
var Image2 : Sprite;

/**
* the third floor map of the museum
*
*@property Image3
* @type Sprite
**/
var Image3 : Sprite;

/**
* all buttons tagged with 'Floor3'
*
* @property Floor3
* @type GameObject[]
**/
var Floor3 : GameObject[];

Start();

/**
* sets value of variables c, movement, frozen, sets map menu to invisible, and sets interactivity of floor buttons to false
*
* @method Start
**/
function Start()
{
	ImageComponent.GetComponent(CanvasGroup).alpha = 0f;
	Floor3 = GameObject.FindGameObjectsWithTag("Floor3");
	for(button in Floor3)
		{
			(button.GetComponent("Button") as UnityEngine.UI.Button).interactable = false;
		}
}

/**
* for dropdown onValueChange function; changes map image displayed dependent on the integer index value received.
* 
* @method OnDropdown
* @param {Integer} i The index value of the dropdown option selected by the user; and toggles interactivity of floor buttons
**/
function OnDropdown(i : int) 
{
	if(i == 0)
	{
		ImageComponent.sprite = Image1;
		for(button in Floor3)
		{
			(button.GetComponent("Button") as UnityEngine.UI.Button).interactable = false;
		}
		//Button2.interactable = true;
	}
	if(i == 1)
	{
		ImageComponent.sprite = Image2;
		for(button in Floor3)
		{
			(button.GetComponent("Button") as UnityEngine.UI.Button).interactable = false;
		}
		//Button2.interactable = false;
	}
	if(i == 2)
	{
		ImageComponent.sprite = Image3;
		for(button in Floor3)
		{
			(button.GetComponent("Button") as UnityEngine.UI.Button).interactable = true;
		}
		//Button2.interactable = false;
	}
}

/**
* toggles the visibility of the map menu and disable the Movement.js script; used by Menu Button
*
* @method 
* @method TogglePopupClick
**/
function TogglePopupClick()
{
	show = !show;
	if(show)
	{
		ImageComponent.GetComponent(CanvasGroup).alpha = 1f;
		(Camera.main.GetComponent("Movement") as Movement).enabled = false;
	}
    else
    {
		(Camera.main.GetComponent("Movement") as Movement).enabled = true;
        ImageComponent.GetComponent(CanvasGroup).alpha = 0f;
    }
}

/**
* makes the map menu invisible and disables the Movement.js script; used by Close button
* 
* @method ClosePopupClick
**/
function ClosePopupClick()
{
	if(show)
	{
		show = false;
		(Camera.main.GetComponent(Movement) as Movement).enabled = true;
		ImageComponent.GetComponent(CanvasGroup).alpha = 0f;
	}
}

/**
* loads scene i
*
* @method ChangeRoom
@ @param {Integer} i The index of the scene from the build settings of the project
**/
function ChangeRoom(i : int)
{
	SceneManagement.SceneManager.LoadScene(i);
}