#pragma strict

class Girl extends Entity{
	var anim:Animator;


	var sitState :int= Animator.StringToHash("Base Layer.Sit");
	var sitState2 :int= Animator.StringToHash("Base Layer.Sit2");
	var stage:int=0;

	var sightCheck:Transform;	

	var target:Entity;

	var getTrigger:GameObject;

	//var follCheck:Transform;
	var followDistance:float;

	function Start(){
		super.Start();
		sitState2 = Animator.StringToHash("Base Layer.Sit2");
		sitState = Animator.StringToHash("Base Layer.Sit");
	}

	function LookAround(){

		Debug.Log("lookAround");
		while(stage==0){
			yield WaitForSeconds(Random.Range(0.5,2.5));
			Flip();
		}
	}

	override function Update(){
		var sightHit:RaycastHit2D;
		sightHit=Physics2D.Linecast(transform.position, sightCheck.position, 1 << LayerMask.NameToLayer("Player"));
		//Debug.Log(sightHit.collider.gameObject.name);
		if (!sightHit){
			Flip();
		}

		if (stage!=2){
			if (sightHit){
				StopAllCoroutines();
				target=sightHit.collider.gameObject.GetComponent(Entity) as Entity;
				stage=1;
			}
			else{
				
				if (target!=null ){
					//
					vel.x=0;
					stage=0;
					target=null;
					LookAround();
				}
			}	
		}
		

		if (stage==0){
			//look around
		}
		else if (stage==1){
			var dist=Mathf.Abs(sightHit.transform.position.x-transform.position.x);
			//Debug.Log("dist: "+dist);
			if (dist>followDistance){
				vel.x=target.transform.position.x-transform.position.x;	
			}
			else{
				vel.x=0;	
			}
		}
		else if (stage==2){
			//Fall down
		}

		anim.SetFloat("Speed", Mathf.Abs(vel.x));


		super.Update();
	}
	
	function OnTriggerEnter2D(_other:Collider2D){
		if (_other.CompareTag("EventTrigger")){
			Debug.Log(_other.name);
			var e:EventTrigger=_other.GetComponent(EventTrigger) as EventTrigger;
			e.TriggerEvent();
		}
	}
}
