#pragma strict

class Player extends Entity{
	var anim:Animator;

	var controlOn:boolean=true;
	var hurtForce:float=150;

	var hurtState :int= Animator.StringToHash("Base Layer.Hurt");  

	function Start(){
		super.Start();
		hurtState=Animator.StringToHash("Base Layer.Hurt");  
	}

	function Update(){
		var device:InputDevice=InputManager.ActiveDevice;



		anim.SetFloat("Speed", Mathf.Abs(vel.x));

		if (controlOn){
			vel.x=device.Direction.X*10;	
		}

		super.Update();
		//Debug.Log(anim.GetCurrentAnimatorStateInfo(0).nameHash );

	}

	function Hurt(_dir:int){
		
		if (anim.GetCurrentAnimatorStateInfo(0).nameHash != hurtState && !anim.IsInTransition(0) && anim.GetCurrentAnimatorStateInfo(0).normalizedTime>1){
			vel.x=0;
			Debug.Log(Time.time+": Hurt");
			
			if (_dir<0){
				SetDir(1);
			}
			else{
				SetDir(0);
			}
			

			rigidbody2D.AddForce(Vector2(-hurtForce*_dir,0) );
			anim.SetTrigger("Hurt");
		}
		else{
			Debug.Log("in state, not hurt");
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
