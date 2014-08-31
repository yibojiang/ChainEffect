#pragma strict

class GirlAppearTrigger extends EventTrigger{
	var girl:Girl;
		
	override function TriggerEvent():IEnumerator{
		var tDialog:TextMesh=CameraController.Instance().tDialog;
		var player:Player=PlayerController.Instance().player;

		player.controlOn=false;
		player.vel.x=0;
		this.collider2D.enabled=false;
		tDialog.text="Hello ?";
		yield WaitForSeconds(2);
		tDialog.text="Are you ok ?";
		yield WaitForSeconds(2);
		tDialog.text="Fine, let me help you.";		
		yield WaitForSeconds(2);
		tDialog.text="...";
		yield WaitForSeconds(2);
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

		super.TriggerEvent();
	}
}