
    /**
 	 * Handles navigation in the Scene (rotation only) via mouse or arrow key input <br>
 	 * Kammy Liu <br>
 	 * Original code source: http://wiki.unity3d.com/index.php/MouseLookPlus2
 	 *
 	 * @class Movement
 	 * @extends MonoBehavior
 	 */

 	/**
 	* lowest allowed value for rotationX
 	*
 	* @property minimumX
 	* @type float
 	*/
    private var minimumX = -360.0;

    /**
 	* Highest allowed value for rotationX
 	*
 	* @property maximumX
 	* @type float
 	*/
    private var maximumX = 360.0;

	/**
 	* lowest allowed value for rotationY
 	*
 	* @property minimumY
 	* @type float
 	*/
    private var minimumY = -60.0;

    /**
 	* Highest allowed value for rotationY
 	*
 	* @property maximumY
 	* @type float
 	*/
    private var maximumY = 60.0;

    /**
 	* Value of current horizontal rotation
 	*
 	* @property rotationX
 	* @type float
 	*/
    private var rotationX;

    /**
 	* Value of current vertical rotation
 	*
 	* @property rotationY
 	* @type float
 	*/
    private var rotationY;

    /**
 	* Speed of motion when click-and-dragging
 	*
 	* @property dragSpeed
 	* @type float
 	*/
    var dragSpeed = 5.0;

    /**
 	* Speed of motion when pressing arrow keys
 	*
 	* @property keySpeed
 	* @type float
 	*/
 	var keySpeed = 8.0;

    /**
 	* If navigation is currently frozen
 	*
 	* @property frozen
 	* @type boolean
 	*/
 	var frozen = false;

 	/**
 	* X position last clicked on
 	*
 	* @property dragOriginX
 	* @type float
 	*/
    private var dragOriginX;

    /**
 	* Y position last clicked on
 	*
 	* @property dragOriginY
 	* @type float
 	*/
    private var dragOriginY;


    /**
 	 * Determines if a click targets a particular object and acts accordingly
 	 *
 	 * @method HandleClick
 	 */
    function HandleClick()
    {
        var hit : RaycastHit;
        var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
       // Debug.DrawRay (ray.origin, ray.direction * 10, Color.yellow);

        if (Physics.Raycast (ray, hit))
        {
            var transform : Transform = hit.collider.GetComponent(Transform);
            //Debug.Log(hit.collider.name);
            if (hit.collider.name == "Capsule")
            {
                SceneManagement.SceneManager.LoadScene(1);
            }
            if (transform && hit.collider.name == "Cube")
            {
                transform.Rotate(30,0,0,Space.Self);
            }

        }
	}

	/**
 	 * Unity-specified function. Is called every frame.
 	 * Checks for key and mouse input and rotates the camera accordingly.
	 *
 	 * @method Update
 	 */
    function Update ()
    {
    	//Debug.Log("Y: "+rotationY+", X: "+rotationX +", tY: "+transform.eulerAngles.y+", tX: "+transform.eulerAngles.x);

        //if left click
        if(Input.GetMouseButtonDown(0)){
            dragOriginX = Input.GetAxis("Mouse X");
            dragOriginY = Input.GetAxis("Mouse Y");
            HandleClick();
            return;
        }

        if (frozen) return;

        //if left mouse down and has moved since last frame
        /*Note: without checking for mouseMoved, holding the mouse still at the end of a drag
        	will cause the camera to drift towards the mouse forever */
        if(Input.GetMouseButton(0) && MouseMoved()){
            Drag();
        }

         //arrow controls
        if (Input.GetAxis("Horizontal"))	// right/left keys
        {
        	rotationX += Input.GetAxis("Horizontal") * keySpeed;
        	Turn();
        }
        if (Input.GetAxis("Vertical"))		// up/down keys
        {
        	rotationY += Input.GetAxis("Vertical") * keySpeed;
        	Turn();
        }

    }

    /**
 	 * Sets rotationX and rotationY before calling Turn()
 	 *
 	 * @method Drag
 	 */
    function Drag()
    {
        rotationX += (dragOriginX-Input.GetAxis("Mouse X")) * dragSpeed;
        rotationY += (dragOriginY-Input.GetAxis("Mouse Y")) * dragSpeed;

        Turn();
    }

	/**
 	 * Calls Adjust360andClamp() before performing the rotation of this game object
 	 *
 	 * @method Turn
 	 */
    function Turn()
    {
        Adjust360andClamp();

       	transform.localRotation = Quaternion.AngleAxis (rotationX, Vector3.up);

       	// multiply to retain X transform
    	transform.localRotation *= Quaternion.AngleAxis (rotationY, Vector3.left);

    }


    /**
 	 * Adjusts the raw rotationX and rotationY to be within allowed range
 	 *
 	 * @method Adjust360andClamp
 	 */
    function Adjust360andClamp ()
    {
        // Debug.Log (rotationX);

        // Don't let our X go beyond 360 degrees + or -
        if (rotationX <= -360) rotationX += 360;
        else if (rotationX >= 360) rotationX -= 360;

        // Don't let our Y go beyond 360 degrees + or -
        if (rotationY <= -360) rotationY += 360;
        else if (rotationY >= 360) rotationY -= 360;

        // Clamp our angles to the min and max
        rotationX = Mathf.Clamp (rotationX, minimumX, maximumX);
        rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
    }

    /**
 	 * Initialization method specified by Unity.
 	 * Sets rotationX and rotationY based on the "Transform" values set in the Unity GUI
 	 *
 	 * @method Start
 	 */
    function Start()
    {
    	rotationX = transform.eulerAngles.y;
    	rotationY = 360-transform.eulerAngles.x;
    }

	/**
	 * If the mouse has moved
	 *
	 * @method MouseMoved
	 * @return {boolean} returns whether the mouse has changed position since the last frame
	 */
	function MouseMoved()
    {
    	return (Input.GetAxis("Mouse X") != 0) || (Input.GetAxis("Mouse Y") != 0);
    }
