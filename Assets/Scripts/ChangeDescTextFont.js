#pragma strict

var action= 0;

function Start () 
{
	
	gameObject.GetComponent(UI.Button).onClick.AddListener(TaskOnClick);
}

function OnMouseDown()
{
	gameObject.GetComponent(UI.Button).onClick.AddListener(TaskOnClick);
}

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

