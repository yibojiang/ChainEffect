#pragma strict
class WolfAppearTrigger extends EventTrigger{
	var wolf:Enemy;
	override function TriggerEvent():IEnumerator{
		
		
		wolf.SetDir(1);
		/*
		wolf.vel.x=-3;
		this.collider2D.enabled=false;
		yield WaitForSeconds(1);
		wolf.vel.x=0;
		wolf.anim.Play("Attack2");

		yield WaitForSeconds(3);
		wolf.anim.Play("Idle");
		wolf.SearchTarget();
		*/

		super.TriggerEvent();
	}
}
