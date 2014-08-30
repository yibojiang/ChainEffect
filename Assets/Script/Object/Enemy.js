#pragma strict

class Enemy extends Entity{

	var anim:Animator;
	var target:Entity;

	var sightCheck:Transform;
	var attackCheck:Transform;

	var stage:int=0;
	
	var atakState :int= Animator.StringToHash("Base Layer.Attack");  

	var attackArea:Transform;
	var attackRange:float=0.05;

	function SetTarget(_ent:Player){
		target=_ent;
	}

	function SearchTarget(){

	}

	function Start(){
		super.Start();
		atakState= Animator.StringToHash("Base Layer.Attack"); 
	}

	function Update(){
		if (alive){
			var sightHit:RaycastHit2D;
			sightHit=Physics2D.Linecast(transform.position, sightCheck.position, 1 << LayerMask.NameToLayer("Player"));
			if (sightHit){
				//Debug.Log("player in sight");
				target=sightHit.collider.gameObject.GetComponent(Entity) as Entity;
				
				stage=1;
			}
			else{
				stage=0;
				target=null;
			}

			if (stage==0){
				//do some things search player.
				
			}
			else if (stage==1){
				//see player and chase player
				var attackHit:RaycastHit2D=Physics2D.Linecast(transform.position, attackCheck.position, 1 << LayerMask.NameToLayer("Player"));
				if (anim.GetCurrentAnimatorStateInfo(0).nameHash != atakState){
					if (attackHit){
							
						//Debug.Log("ready to attack player");
						
						anim.SetTrigger("Attack");
						vel.x=0;
					}
					else{
						//Debug.Log("can't reach player");
						vel.x=target.transform.position.x-transform.position.x;
					}
					//Debug.Log("in attack state");
				}
				else{
					//Debug.Log("not in attack state");
					vel.x=0;
				}
			}
			//Debug.Log(vel.x);
			anim.SetFloat("Speed", Mathf.Abs(vel.x));
		}

		super.Update();

	}

	function Attack(){
		var hitCollider:Collider2D = Physics2D.OverlapCircle(attackArea.position, attackRange, 1 << LayerMask.NameToLayer("Player"));
		if (hitCollider!=null){
			hitCollider.gameObject.SendMessage("Hurt");	
		}
		
		
	}

	override function Die(){

		anim.Play("Die");

		super.Die();
	}
}