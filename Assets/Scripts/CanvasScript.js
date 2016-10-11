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
* object representing the Movement.js script
*
* @property movement
* @type Movement
**/
var movement : Movement;

/**
* object representing the main camera GameObject
*
* @property c
* @type UnityEngine.GameObject
**/
var c : UnityEngine.GameObject;

/**
* if navigation is currently frozen; boolean var taken from Movement.js
*
* @property frozen
* @type boolean
**/
var frozen;

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

Start();
TogglePopupClick();

/**
* sets value of variables c, movement, frozen, and sets map menu to invisible
*
* @method Start
**/
function Start()
{
	c = GameObject.Find("Main Camera");
	movement = c.GetComponent(Movement);
	frozen = movement.frozen;
	ImageComponent.GetComponent(CanvasGroup).alpha = 0f;
}

/**
* for dropdown onValueChange function; changes map image displayed dependent on the integer index value received.
* 
* @method OnDropdown
* @param {Integer} i The index value of the dropdown option selected by the user
**/
function OnDropdown(i : int) 
{
	if(i == 0)
	{
		ImageComponent.sprite = Image1;
	}
	if(i == 1)
	{
		ImageComponent.sprite = Image2;
	}
}

/**
* toggles the visibility of the map menu and disable the Movement.js script; used by OpenPopup button
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
		movement.frozen = true;
	}
    else
    {
    	movement.frozen = false;
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
		movement.frozen = false;
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