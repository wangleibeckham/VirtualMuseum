 enum Axes {MouseXandY, MouseX, MouseY}
    var Axis : Axes = Axes.MouseXandY;
 
    var sensitivityX = 15.0;
    var sensitivityY = 15.0;
 
    var minimumX = -360.0;
    var maximumX = 360.0;
 
    var minimumY = -60.0;
    var maximumY = 60.0;
 
    var rotationX = 0.0;
    var rotationY = 0.0;
 
    var lookSpeed = 2.0;
 
    var cameraReference : Camera;

    var frozen = false;

    function Update ()
    {
    	if (Input.GetMouseButtonDown(0))
    	{
    		Debug.Log("Pressed left click.");
    		var hit : RaycastHit;
			var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			Debug.DrawRay (ray.origin, ray.direction * 10, Color.yellow);
   
			if (Physics.Raycast (ray, hit))
			{  
    		//  Do whatever you want to detect what's been hit from the data stored in the "hit" variable - this should rotate it...
   				var transform : Transform = hit.collider.GetComponent(Transform);
 				if (hit.collider.name == 'Capsule')
 				{
 					SceneManagement.SceneManager.LoadScene(1);
 				}
  				if (transform && hit.collider.name == 'Cube')
  				{
  					Debug.Log(transform.localEulerAngles.x);
    				//Debug.Log(transform.localEulerAngles.y);
    				//Debug.Log(transform.localEulerAngles.z);
    				//transform.localEulerAngles.x += 90;
    				//transform.localEulerAngles.y += 180;
    				transform.Rotate(30,0,0,Space.Self);
    				Debug.Log(transform.localEulerAngles.x);
    				//Debug.Log(transform.localEulerAngles.y);
    				//Debug.Log(transform.localEulerAngles.z);
  				}
 
			}
    	}
    	if (Input.GetMouseButtonDown(1))
    	{
			// Debug.Log("Pressed right click.");
			if (frozen == false) 
			{
				frozen = true;
			}
			else // frozen == true
			{
				frozen = false;
			}
			// Debug.Log(frozen);

		}
		if(frozen == false) {
	        // Move toward and away from the camera
	        if (Input.GetAxis("Vertical"))
	        {
	            var translationZ = Input.GetAxis("Vertical");
	            transform.localPosition += cameraReference.transform.localRotation * Vector3(0,0,translationZ);
	        }
	 
	        // Strafe the camera
	        if (Input.GetAxis("Horizontal"))
	        {
	            var translationX = Input.GetAxis("Horizontal");
	            transform.localPosition += cameraReference.transform.localRotation * Vector3(translationX,0,0);
	        }       
	 
	        if (Axis == Axes.MouseXandY)
	        {
	            // Read the mouse input axis
	            rotationX += Input.GetAxis("Mouse X") * sensitivityX;
	            rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
	 
	            // Call our Adjust to 360 degrees and clamp function
	            Adjust360andClamp();
	 
	            // Most likely you wouldn't do this here unless you're controlling an object's rotation.
	            // Call our look left and right function.
	            KeyLookAround();
	 
	            // Call our look up and down function.
	            KeyLookUp();
	        }
	        else if (Axis == Axes.MouseX)
	        {
	            // Read the mouse input axis
	            rotationX += Input.GetAxis("Mouse X") * sensitivityX;
	 
	            // Call our Adjust to 360 degrees and clamp function
	            Adjust360andClamp();
	 
	            // if you're doing a standard X on object Y on camera control, you'll probably want to 
	            // delete the key control in MouseX. Also, take the transform out of the if statement.
	            // Call our look left and right function.
	            KeyLookAround();
	 
	            // Call our look up and down function.
	            KeyLookUp(); 
	        }
	        else
	        {
	            // Read the mouse input axis
	            rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
	 
	            // Call our Adjust to 360 degrees and clamp function
	            Adjust360andClamp();
	 
	            // Call our look left and right function.
	            KeyLookAround();
	 
	            // Call our look up and down function.
	            KeyLookUp();
	        }
	    }
    }
 
    function KeyLookAround ()
    {
//      If you're not using it, you can delete this whole function. 
//      Just be sure to delete where it's called in Update.
 
        // Call our Adjust to 360 degrees and clamp function
        Adjust360andClamp();
 
        // Transform our X angle
        transform.localRotation = Quaternion.AngleAxis (rotationX, Vector3.up);
    }
 
    function KeyLookUp ()
    {
        // Adjust for 360 degrees and clamp
        Adjust360andClamp();
 
        // Transform our Y angle, multiply so we don't loose our X transform
        transform.localRotation *= Quaternion.AngleAxis (rotationY, Vector3.left);
    }
 
    function Adjust360andClamp ()
    {
//      This prevents your rotation angle from going beyond 360 degrees and also 
//      clamps the angle to the min and max values set in the Inspector.
 
        // During in-editor play, the Inspector won't show your angle properly due to 
        // dealing with floating points. Uncomment this Debug line to see the angle in the console.
 
        // Debug.Log (rotationX);
 
        // Don't let our X go beyond 360 degrees + or -
        if (rotationX < -360)
        {
            rotationX += 360;
        }
        else if (rotationX > 360)
        {
            rotationX -= 360;
        }   
 
        // Don't let our Y go beyond 360 degrees + or -
        if (rotationY < -360)
        {
            rotationY += 360;
        }
        else if (rotationY > 360)
        {
            rotationY -= 360;
        }
 
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