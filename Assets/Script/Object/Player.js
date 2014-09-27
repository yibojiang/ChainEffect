#pragma strict

class Player extends Entity{
	var anim:Animator;

	var controlOn:boolean=true;
	private var hurtState :int= Animator.StringToHash("Base Layer.Hurt");
	private var atkState :int= Animator.StringToHash("Base Layer.Attack");
	private var walkState:int=Animator.StringToHash("Base Layer.Walk");
	private var runState:int=Animator.StringToHash("Base Layer.Run");
	private var idleState:int=Animator.StringToHash("Base Layer.Idle");
	private var readyAttackState:int=Animator.StringToHash("Base Layer.ReadyAttack");

	var withGirl:boolean;

	function Start(){
		super.Start();
		//hurtState=Animator.StringToHash("Base Layer.Hurt");  
		//atkState= Animator.StringToHash("Base Layer.Attack");
	}

	function Update(){
		var device:InputDevice=InputManager.ActiveDevice;
		if (anim.GetCurrentAnimatorStateInfo(0).nameHash == walkState 
			|| anim.GetCurrentAnimatorStateInfo(0).nameHash == runState 
			|| anim.GetCurrentAnimatorStateInfo(0).nameHash == idleState 
			|| anim.GetCurrentAnimatorStateInfo(0).nameHash == readyAttackState 
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

			
			
			if (controlOn && !withGirl ){
				if(device.Action4.WasPressed || Input.GetKeyDown(KeyCode.Z) ){
					Attack();
				}
			}	
		}

		if (Input.GetKeyDown(KeyCode.D)){
			anim.SetTrigger("Die");
		}

		if (Input.GetKeyDown(KeyCode.H)){
			Hurt();
		}

		

		super.Update();
		//Debug.Log(anim.GetCurrentAnimatorStateInfo(0).nameHash );

	}

	function Attack(){
		vel.x=0;
		anim.SetTrigger("Attack");
	}

	function Hurt(){
		
		if (anim.GetCurrentAnimatorStateInfo(0).nameHash != hurtState){
			//Debug.Log("Hurt");
			//vel.x=0;
			//Debug.Log(Time.time+": Hurt");
			
			/*
			if (_dir<0){
				SetDir(1);
			}
			else{
				SetDir(0);
			}
			*/
			

			//rigidbody2D.AddForce(Vector2(-hurtForce,hurtForce/3) );
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
			//Debug.Log("hit");
			if (_other.gameObject.transform.position.x>transform.position.x){
				Hurt();
			}
			else{
				Hurt();	
			}
			
		}
	}
}
