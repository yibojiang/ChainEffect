#pragma strict
class GirlFallTrigger extends EventTrigger{
	var girl:Girl;
	var getTrigger:Transform;
		
	override function TriggerEvent():IEnumerator{
		//var tDialog:TextMesh=CameraController.Instance().tDialog;
		var player:Player=GameController.Instance().player;
		
		player.controlOn=false;
		player.vel.x=0;
		this.collider2D.enabled=false;
		girl.vel.x=0;
		//girl.anim.Play("Fall");
		girl.stage=2;
		//Debug.Log("SetLookLeft");
		girl.anim.Play("Sit2");
		girl.anim.SetBool("SitLookLeft",false);
		
		yield WaitForSeconds(1);

		
		player.SetDir(1);
		yield WaitForSeconds(0.5);

		girl.anim.Play("Fall");

		yield WaitForSeconds(1.0);
		player.controlOn=true;
		super.TriggerEvent();
		getTrigger.position=girl.transform.position;
		getTrigger.gameObject.SetActive(true);

	}
}