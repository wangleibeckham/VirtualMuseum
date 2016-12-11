/**
Handles event-based behavior in the Popup <br>
Judy Chung, Zhenwei Wang, Kammy Liu
@class PopupScript
@extends MonoBehavior
**/

#pragma strict

/**
* Minimum allowed font size
*
* @property minFontSize
* @type float
*/
public var minFontSize : float;

/**
* Maximum allowed font size
*
* @property maxFontSize
* @type float
*/
public var maxFontSize : float;

/**
 * Triggered when the + or - button is clicked.
 * Determines which button was clicked and makes text font size change correspondingly.
 *
 * @method ChangeFont
 * @param increase {boolean} True when triggered from the + button, false when triggered from the - button
 */
function ChangeFont(increase : boolean) 
{
	var description = GameObject.Find("Popup").transform.Find("Panel/Description Panel/Description/Text").GetComponent(UI.Text);
	var currFontSize = description.fontSize;
	
	if(increase){		
		description.fontSize = (currFontSize<maxFontSize) ? currFontSize+1 : currFontSize;
	} else {
		description.fontSize = (currFontSize>minFontSize) ? currFontSize-1 : currFontSize;
	}

	//Debug.Log("Font size: "+description.fontSize);
}

/**
 * Triggered when the Close Button is clicked. Closes the Popup and enables camera movement.
 *
 * @method ClosePopup
 */
function ClosePopup()
{
	Camera.main.GetComponent(Movement).enabled = true;
	this.gameObject.transform.Find("Panel").gameObject.SetActive(false);
}
