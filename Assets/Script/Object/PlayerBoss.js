#pragma strict
class PlayerBoss extends Entity{
	var anim:Animator;
	var controlOn:boolean=true;

	var fireballPrefab:GameObject;

	function Start(){
		super.Start();
	}

	function Update(){
		var device:InputDevice=InputManager.ActiveDevice;
		if (controlOn){
				if (device.LeftStickX.IsPressed){
					vel.x=device.Direction.X*maxWalkSpeed;
				}
				else{
					if (Input.GetKey(KeyCode.LeftArrow)){
						vel.x=-maxWalkSpeed;		
					}
					else if (Input.GetKey(KeyCode.RightArrow)){
						vel.x=maxWalkSpeed;		
					}
					else{
						vel.x=0;
					}
				}
			}

			
			anim.SetFloat("Speed", Mathf.Abs(vel.x));	

			
			
			if (controlOn  ){
				if(device.Action3.WasPressed || Input.GetKeyDown(KeyCode.Z) ){
					Attack();
				}
			}	
		super.Update();
	}

	function Attack(){
		vel.x=0;
		anim.SetTrigger("Attack");

		
	}
	var fireTransform:Transform;

	function Fire(){
		var fire:Fireball= Instantiate(fireballPrefab,fireTransform.position,Quaternion.identity).GetComponent(Fireball) as Fireball;
		fire.SetDir(flipDir);
		fire.vel.x=GetFlipDir()*fire.maxWalkSpeed;
		fire.alive=true;
		//fire.rigidbody2D.AddForce(Vector2(GetFlipDir()*fire.maxWalkSpeed,0) );

	}

}