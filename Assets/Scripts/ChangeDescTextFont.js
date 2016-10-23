/**
Handles text font changes
Judy Chung, Zhenwei Wang
@class ChangeDescTextFont
@extends MonoBehavior
**/

#pragma strict



/**
* define if the + or - button is clicked 
*
* @property action
* @type float
*/

var action= 0;

/**
 * capture the UI.button within the gameobject, add listener to it
 *
 * @method Start
 */
function Start () 
{
	
	gameObject.GetComponent(UI.Button).onClick.AddListener(TaskOnClick);
}


/**
 * call the UI.button within the gameobject when the mouse is clicked, to make sure the UI.button is properly selected
 * and add listener to it
 *
 * @method OnMouseDown
 */
function OnMouseDown()
{
	gameObject.GetComponent(UI.Button).onClick.AddListener(TaskOnClick);
}

/**
 * the function that is triggered when the + or - button is clicked.
 * the function will determine the button that is clicked and make text font change correspondingly.
 * for this version, the font size is hard coded to be >8 && <18, will make changes in later version.
 *
 * @method TaskOnClick
 */
function TaskOnClick() 
{
	
	// size up
	if(this.name =='incrementFontSize'){		
		action = 1;
	}

	// size down
	else
	{
		action = -1;
	}
	// get description
	var description = gameObject.transform.parent.parent.Find("descriptionPanel").Find('description').GetComponent(UI.Text);
	var currFontSize = description.fontSize;

	if (action==1)
	{
		description.fontSize = (currFontSize<18)? currFontSize + action : currFontSize;
	}
	else if (action==-1)
	{
		description.fontSize = (currFontSize>8)? currFontSize + action : currFontSize;
	}

	Debug.Log(description.fontSize);

}

