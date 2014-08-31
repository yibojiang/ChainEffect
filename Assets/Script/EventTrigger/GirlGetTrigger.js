#pragma strict
class GirlGetTrigger extends EventTrigger{
	var girl:Girl;
	override function TriggerEvent():IEnumerator{
		var player:Player=GameController.Instance().player;
		player.controlOn=false;
		player.anim.Play("Knee");
		player.vel.x=0;
		yield WaitForSeconds(2);
		player.anim.Play("StandWithGirl");
		player.withGirl=true;
		girl.gameObject.SetActive(false);
		player.controlOn=true;
		super.TriggerEvent();
	}

}