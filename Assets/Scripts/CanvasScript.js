var show = false;
var movement : Movement;
var c : UnityEngine.GameObject;
var frozen;

TogglePopupClick();

function Start()
{
	c = GameObject.Find("Main Camera");
	movement = c.GetComponent(Movement);
	frozen = movement.frozen;
	gameObject.GetComponent(CanvasGroup).alpha = 0f;
}

function Update() 
{
	if(Input.GetKeyDown('space'))
	{
		show = !show;
	}
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

function TogglePopupClick()
{
	Debug.Log(show);
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