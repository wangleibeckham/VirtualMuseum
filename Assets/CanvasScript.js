var show = true;
var movement : Movement;
var c : UnityEngine.GameObject;

function Start()
{
	c = GameObject.Find("camera");
	movement = c.GetComponent(Movement);
	Debug.Log(movement.frozen);
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
	}
    else
    {
        gameObject.GetComponent(CanvasGroup).alpha = 0f;
    }
}

function TogglePopupClick()
{
	show = !show;
	if(show)
	{
		gameObject.GetComponent(CanvasGroup).alpha = 1f;
	}
    else
    {
        gameObject.GetComponent(CanvasGroup).alpha = 0f;
    }
}

function ClosePopupClick()
{
	if(show)
	{
		show = false;
		gameObject.GetComponent(CanvasGroup).alpha = 0f;
	}
}

function ChangeRoom(i : int)
{
	SceneManagement.SceneManager.LoadScene(i);
}