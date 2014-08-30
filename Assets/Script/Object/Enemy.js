#pragma strict

class Enemy extends Entity{

	var anim:Animator;

	function Update(){
		var device:InputDevice=InputManager.ActiveDevice;

		
		if (Mathf.Abs(vel.x)>0){
			anim.Play("Walk");
		}
		else{
			anim.Play("Idle");
		}
		vel.x=device.Direction.X*10;

		super.Update();

	}
}