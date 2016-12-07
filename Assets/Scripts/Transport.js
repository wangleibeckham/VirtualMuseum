/**
 * Handles scene changes when attached to a game object<br>
 * Kammy Liu
 *
 * @class Transport
 * @extends MonoBehavior
 */

#pragma strict

/**
* Name of the scene to change to
*
* @property sceneName
* @type String
*/
public var sceneName : String;

/**
 * Inherited from MonoBehavior. Called on each frame the mouse is over the object.
 * If the left mouse is down, changes the scene to the one specified by "sceneName". 
 *
 * @method OnMouseOver
 */
function OnMouseOver()
{
	if(Input.GetMouseButtonDown(0))
	{
    	SceneManagement.SceneManager.LoadScene(sceneName);
	}
}
