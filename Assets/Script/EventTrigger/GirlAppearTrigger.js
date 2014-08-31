#pragma strict

class GirlAppearTrigger extends EventTrigger{
	var girl:Girl;
		
	override function TriggerEvent():IEnumerator{
		var tDialog:TextMesh=CameraController.Instance().tDialog;
		var player:Player=GameController.Instance().player;
		
		player.controlOn=false;
		player.vel.x=0;
		this.collider2D.enabled=false;

		
		tDialog.text="Warrior: Hello ?";
		yield WaitForSeconds(1);
		girl.anim.SetBool("SitLookLeft",true);
		yield WaitForSeconds(2);
		tDialog.text="Warrior: Are you ok ?";
		yield WaitForSeconds(2);
		tDialog.text="Girl: ...";
		yield WaitForSeconds(2);
		tDialog.text="Warrior: This place is bad, let me help you.";		
		yield WaitForSeconds(2);
		tDialog.text="Girl: ...";
		yield WaitForSeconds(1);
		tDialog.text="";
		

		var wait:boolean=true;
		while (wait){
			var device:InputDevice=InputManager.ActiveDevice;
			if(device.Action3.WasPressed || Input.GetKeyDown(KeyCode.Z) ){
				wait=false;
			}
			yield;
		}
		
		girl.anim.Play("Idle");
		girl.SetDir(1);
		player.controlOn=true;

		girl.target=player;
		super.TriggerEvent();
	}
}