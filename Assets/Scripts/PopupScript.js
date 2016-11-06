/**
Handles event-based behavior in the Popup <br>
Judy Chung, Zhenwei Wang, Kammy Liu
@class PopupScript
@extends MonoBehavior
**/

#pragma strict


/**
 * the function that is triggered when the + or - button is clicked.
 * the function will determine the button that is clicked and make text font change correspondingly.
 * for this version, the font size is hard coded to be >8 && <18, will make changes in later version.
 *
 * @method ChangeFont
 */
function ChangeFont(increase:boolean) 
{
	var description = GameObject.Find("Popup").transform.Find("Panel/Description Panel/Description").GetComponent(UI.Text);
	var currFontSize = description.fontSize;
	
	if(increase){		
		description.fontSize = (currFontSize<18) ? currFontSize+1 : currFontSize;
	} else {
		description.fontSize = (currFontSize>8) ? currFontSize-1 : currFontSize;
	}

	//Debug.Log("Font size: "+description.fontSize);
}

/**
 * Triggered when the cancel button is clicked. Closes the Popup and enables camera movement.
 *
 * @method ClosePopup
 */
function ClosePopup()
{
	Camera.main.GetComponent(Movement).enabled = true;
	this.gameObject.transform.Find("Panel").gameObject.SetActive(false);
}
