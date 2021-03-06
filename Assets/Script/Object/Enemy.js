﻿#pragma strict

class Enemy extends Entity{

	var anim:Animator;
	var target:Entity;

	var sightCheck:Transform;
	var attackCheck:Transform;

	var stage:int=0;
	
	var atakState :int= Animator.StringToHash("Base Layer.Attack");  
	var hurtState :int= Animator.StringToHash("Base Layer.Hurt");

	

	function SetTarget(_ent:Player){
		target=_ent;
	}

	function SearchTarget(){

	}

	function Start(){
		super.Start();
		atakState= Animator.StringToHash("Base Layer.Attack"); 
		hurtState=Animator.StringToHash("Base Layer.Hurt");  
		Wander();
	}

	function Wander(){
		//Debug.Log("wander");
		while(stage==0){
			yield WaitForSeconds(2);
			yield WaitForSeconds(Random.Range(1.0,3.0));
			anim.Play("Attack2");
			yield WaitForSeconds(Random.Range(2.0,3.0));
			Flip();

			vel.x=GetFlipDir();

			yield WaitForSeconds(4);
			vel.x=0;

			yield WaitForSeconds(Random.Range(2.0,3.0));
		}
		
	}

	function Update(){
		if (alive){
			var sightHit:RaycastHit2D;
			sightHit=Physics2D.Linecast(transform.position, sightCheck.position, 1 << LayerMask.NameToLayer("Player"));

			if (anim.GetCurrentAnimatorStateInfo(0).nameHash != atakState && anim.GetCurrentAnimatorStateInfo(0).nameHash != hurtState){
				if (sightHit){
					//Debug.Log("player in sight");
					target=sightHit.collider.gameObject.GetComponent(Entity) as Entity;
					//StopCoroutine("Wander");
					StopAllCoroutines();
					stage=1;
				}
				else{
					if (target!=null){
						vel.x=0;
						stage=0;
						target=null;
						Wander();
					}
				}
			}

			if (stage==0){
				//do some things search player.
			}
			else if (stage==1){
				//see player and chase player
				var attackHit:RaycastHit2D=Physics2D.Linecast(transform.position, attackCheck.position, 1 << LayerMask.NameToLayer("Player"));
				if (anim.GetCurrentAnimatorStateInfo(0).nameHash != atakState){
					if (attackHit){
							
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

	function OnTriggerEnter2D(_other:Collider2D){
		//Debug.Log("OnTriggerEnter");
		if (_other.CompareTag("PlayerAttack")){
			if (_other.gameObject.transform.position.x>transform.position.x){
				Hurt(1);
			}
			else{
				Hurt(-1);	
			}
		}
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
			

			//rigidbody2D.AddForce(Vector2(-hurtForce*_dir,hurtForce/3) );
			anim.SetTrigger("Hurt");
		}
		else{
			//Debug.Log("in state, not hurt");
		}


	}

	

	override function Die(){

		anim.Play("Die");

		super.Die();
	}
}