var show = false;
var movement : Movement;
var c : UnityEngine.GameObject;
var frozen;
var ImageComponent : UnityEngine.UI.Image;
var Image1 : Sprite;
var Image2 : Sprite;

Start();
TogglePopupClick();

function Start()
{
	c = GameObject.Find("Main Camera");
	movement = c.GetComponent(Movement);
	frozen = movement.frozen;
	gameObject.GetComponent(CanvasGroup).alpha = 0f;
}

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

function TogglePopupClick()
{
	show = !show;
	if(show)
	{
		gameObject.GetComponent(CanvasGroup).alpha = 1f;
		movement.frozen = true;
	}
    else
    {
    	movement.frozen = false;
        gameObject.GetComponent(CanvasGroup).alpha = 0f;
    }
}

function ClosePopupClick()
{
	if(show)
	{
		show = false;
		movement.frozen = false;
		gameObject.GetComponent(CanvasGroup).alpha = 0f;
	}
}

function ChangeRoom(i : int)
{
	SceneManagement.SceneManager.LoadScene(i);
}