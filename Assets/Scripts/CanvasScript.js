/**
* Handles responding to user interaction with the Canvas (map Menu) and any OnClick or OnValueChange functions for buttons and dropdowns in it.<br>
* Megan DuPriest<br>
* Original code source: none
*
* @class CanvasScript
* @extends MonoBehavior
**/

/**
* how many floors/images
*
* @property numFloors
* @type int
**/

var numFloors : int;

/**
* is the map menu visible
*
* @property show
* @type boolean
**/
private var show = false;

/**
* object representing the Image GameObject
*
* @property imageComponent
* @type UnityEngine.UI.Image
**/

var imageComponent : UnityEngine.UI.Image;

/**
* object representing the dark layer over the rest of the scene while the map is open
*
* @property background
* @type GameObject
**/
private var background : GameObject;

/**
* object representing the Dropdown GameObject
*
* @property dropdown
* @type UnityEngine.UI.Dropdown
**/

var dropdown : UnityEngine.UI.Dropdown;

/**
* the first floor map of the museum
* 
* @property image1
* @type Sprite
**/
var image1 : Sprite;

/**
* the second floor map of the museum
* 
* @property image2
* @type Sprite
**/
var image2 : Sprite;

/**
* the third floor map of the museum
*
* @property image3
* @type Sprite
**/
var image3 : Sprite;

/**
* an array of image1, image2, and image3
*
* @property images
* @type Sprite[]
**/
var images : Sprite[];

/**
* array of floors' buttons
*
* @property floors
* @type GameObject[][]
**/

private var floors = new Array();

/**
* array of floor3's buttons
*
* @property floor3
* @type GameObject[]
**/

private var floor3 : GameObject[];

/**
* the numbers on all the corresponding buttons in the map menu
* 
* @property buttonNumbers
* @type String[]
**/

private var buttonNumbers = new Array();

/**
* Name of the active scene
*
* @property sceneName
* @type String
**/

private var sceneName : String;

/**
* Reference to the Image part of the map menu
*
* @property map
* @type GameObject
*/
private var map : GameObject;

//Start(); unnecessary code

/**
* sets value of variables c, movement, sceneName, images; sets map menu to invisible, and sets interactivity of floor buttons to false
*
* @method Start
**/
private var dropval : int = 2;

function Start()
{
	sceneName = UnityEngine.SceneManagement.SceneManager.GetActiveScene().name;
	map = GameObject.Find("Canvas").transform.Find("Image").gameObject;
	images = [image1, image2, image3];
	background = GameObject.Find("Canvas").transform.Find("Background").gameObject;
	map.SetActive(true);
	background.SetActive(true);
	for( var i = 1; i <= numFloors; i++) {
		var floor : GameObject[] = GameObject.FindGameObjectsWithTag("Floor" + i.ToString());
		floors[floors.length] = floor;
	}

	for(floor in floors) 
	{
		var subButtonNumbers = new Array();
		for(button in floor)
			{
				var sceneNum = '';
				for(var v = 5; v < sceneName.length; v++) {
					sceneNum = sceneNum + sceneName[v];
				}
				var number = ((button.GetComponent("Button") as UnityEngine.UI.Button).transform.GetChild(0).gameObject.GetComponent("Text") as UnityEngine.UI.Text).text;
				subButtonNumbers.push(number);
				if (number == sceneNum) // fix this, should be not just the last number
				{
					(button.GetComponent("Button") as UnityEngine.UI.Button).colors.normalColor = Color.black;

				}

				((button.GetComponent("Button") as UnityEngine.UI.Button).transform.GetChild(0).gameObject.GetComponent("Text") as UnityEngine.UI.Text).text = " ";
				(button.GetComponent("Button") as UnityEngine.UI.Button).interactable = false;
			}
		buttonNumbers.push(subButtonNumbers);
	}
	map.SetActive(false);
	background.SetActive(false);
}

/**
* for Dropdown onValueChange function; changes map image displayed dependent on the integer index value received.
* 
* @method OnDropdown
* @param {Integer} i The index value of the dropdown option selected by the user; and toggles interactivity of floor buttons
**/
function OnDropdown(i : int) 
{
	imageComponent.sprite = images[i];
	var floor : GameObject[] = floors[i];
	var prev_floor : GameObject[] = floors[dropval];

	for(var j = 0; j < floor.length; j++)
		{
			var subButtonNumbers : String[] = buttonNumbers[i];
			var num = subButtonNumbers[j];
			(floor[j].GetComponent("Button") as UnityEngine.UI.Button).interactable = true;
			((floor[j].GetComponent("Button") as UnityEngine.UI.Button).transform.GetChild(0).gameObject.GetComponent("Text") as UnityEngine.UI.Text).text = num;
		}
	if(i != dropval) 
	{
	for(var k = 0; k < prev_floor.length; k++)
		{
			(prev_floor[k].GetComponent("Button") as UnityEngine.UI.Button).interactable = false;
			((prev_floor[k].GetComponent("Button") as UnityEngine.UI.Button).transform.GetChild(0).gameObject.GetComponent("Text") as UnityEngine.UI.Text).text = " ";

		}
	}
	dropval = i;
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
		map.SetActive(true);
		background.SetActive(true);
		(Camera.main.GetComponent("Movement") as Movement).enabled = false;
		dropdown.value = 2; 
		dropval = 2;
		// hard coded to open to floor you're on... which is Floor 3 right now, but should eventually be based on actual floor number denoted in the sceneName perhaps?
	}
    else
    {
		(Camera.main.GetComponent("Movement") as Movement).enabled = true;
        map.SetActive(false);
        background.SetActive(false);
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
		map.SetActive(false);
		background.SetActive(false);
	}
}

/**
* loads scene i
*
* @method ChangeRoom
@ @param {String} scene The name of the scene from the build settings of the project
**/
function ChangeRoom(scene : String)
{
	SceneManagement.SceneManager.LoadScene(scene);
}