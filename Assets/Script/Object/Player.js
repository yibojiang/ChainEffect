#pragma strict

class Player extends Entity{
	var anim:Animator;

	var controlOn:boolean=true;
	

	var hurtState :int= Animator.StringToHash("Base Layer.Hurt");
	var atkState :int= Animator.StringToHash("Base Layer.Attack");



	function Start(){
		super.Start();
		hurtState=Animator.StringToHash("Base Layer.Hurt");  
		atkState= Animator.StringToHash("Base Layer.Attack");
	}

	function Update(){
		var device:InputDevice=InputManager.ActiveDevice;

		

		
		if (anim.GetCurrentAnimatorStateInfo(0).nameHash != hurtState 
			&& anim.GetCurrentAnimatorStateInfo(0).nameHash != atkState 
			&& !anim.IsInTransition(0) 
			){

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
			
			
				
			
			if (controlOn){
				if(device.Action3.WasPressed || Input.GetKeyDown(KeyCode.Z) ){
					Attack();
				}
			}	
		}

		

		super.Update();
		//Debug.Log(anim.GetCurrentAnimatorStateInfo(0).nameHash );

	}

	function Attack(){
		vel.x=0;
		anim.SetTrigger("Attack");
	}

	function Hurt(_dir:int){
		
		if (anim.GetCurrentAnimatorStateInfo(0).nameHash != hurtState && !anim.IsInTransition(0) ){
			vel.x=0;
			//Debug.Log(Time.time+": Hurt");
			
			if (_dir<0){
				SetDir(1);
			}
			else{
				SetDir(0);
			}
			

			rigidbody2D.AddForce(Vector2(-hurtForce*_dir,hurtForce/3) );
			anim.SetTrigger("Hurt");
		}
		else{
			//Debug.Log("in state, not hurt");
		}


	}


	function OnTriggerEnter2D(_other:Collider2D){
		//Debug.Log("OnTriggerEnter");
		if (_other.CompareTag("EventTrigger")){
			Debug.Log(_other.name);
			var e:EventTrigger=_other.GetComponent(EventTrigger) as EventTrigger;
			e.TriggerEvent();

		}

		if (_other.CompareTag("Hurt")){
			if (_other.gameObject.transform.position.x>transform.position.x){
				Hurt(1);
			}
			else{
				Hurt(-1);	
			}
			
		}
	}
}
