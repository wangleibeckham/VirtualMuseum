
    private var minimumX = -360.0;
    private var maximumX = 360.0;
    private var minimumY = -60.0;
    private var maximumY = 60.0;

    private var rotationX = 0.0;
    private var rotationY = 0.0;
 
    var dragSpeed = 5.0;
    var keySpeed = 8.0;
 
    var cameraReference : Camera;
    var frozen = false;

    private var dragOriginX;
    private var dragOriginY;

    function handleClick(){
        var hit : RaycastHit;
        var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
       // Debug.DrawRay (ray.origin, ray.direction * 10, Color.yellow);

        if (Physics.Raycast (ray, hit))
        {  
        //  Do whatever you want to detect what's been hit from the data stored in the "hit" variable - this should rotate it...
            var transform : Transform = hit.collider.GetComponent(Transform);
            //Debug.Log(hit.collider.name);
            if (hit.collider.name == 'Capsule')
            {
                SceneManagement.SceneManager.LoadScene(1);
            }
            if (transform && hit.collider.name == 'Cube')
            {
                transform.Rotate(30,0,0,Space.Self);
            }

        }
	}

    function Update ()
    {
        //if left click
        if(Input.GetMouseButtonDown(0)){
            dragOriginX = Input.GetAxis("Mouse X");
            dragOriginY = Input.GetAxis("Mouse Y");
            handleClick();
            return;
        }

        // if right click
        if (Input.GetMouseButtonDown(1)){
        	frozen = !frozen;
        }


        if (frozen) return;

        //if left mouse down and has moved since last frame 
        /*Note: without checking for mouseMoved, holding the mouse still at the end of a drag
        	will cause the camera to drift towards the mouse forever */ 
        if(Input.GetMouseButton(0) && mouseMoved()){
            drag();
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

     function drag(){     
        rotationX += (dragOriginX-Input.GetAxis("Mouse X")) * dragSpeed;
        rotationY += (dragOriginY-Input.GetAxis("Mouse Y")) * dragSpeed;

        Turn();
    }

    function Turn ()
    {
        Adjust360andClamp();
     
       	transform.localRotation = Quaternion.AngleAxis (rotationX, Vector3.up);

       	// multiply to retain X transform
    	transform.localRotation *= Quaternion.AngleAxis (rotationY, Vector3.left);
    }


    /* Adjust rotations to 360 degrees and clamp */
    function Adjust360andClamp ()
    {
//      This prevents your rotation angle from going beyond 360 degrees and also 
//      clamps the angle to the min and max values set in the Inspector.
 
        // During in-editor play, the Inspector won't show your angle properly due to 
        // dealing with floating points. Uncomment this Debug line to see the angle in the console.
 
        // Debug.Log (rotationX);
 
        // Don't let our X go beyond 360 degrees + or -
        if (rotationX < -360) rotationX += 360;
        else if (rotationX > 360) rotationX -= 360;
 
        // Don't let our Y go beyond 360 degrees + or -
        if (rotationY < -360) rotationY += 360;
        else if (rotationY > 360) rotationY -= 360;
 
        // Clamp our angles to the min and max set in the Inspector
        rotationX = Mathf.Clamp (rotationX, minimumX, maximumX);
        rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
    }
 
    function Start ()
    {
        // Make the rigid body not change rotation
        cameraReference = Camera.main;
        if (GetComponent.<Rigidbody>())
        {
            GetComponent.<Rigidbody>().freezeRotation = true;
        }
    }

	function mouseMoved()
    {
    	return (Input.GetAxis("Mouse X") != 0) || (Input.GetAxis("Mouse Y") != 0);
    }
