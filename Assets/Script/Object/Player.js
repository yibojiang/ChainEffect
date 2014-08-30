#pragma strict

class Player extends Entity{


	function Update(){
		var device:InputDevice=InputManager.ActiveDevice;

		
		
		vel.x=device.Direction.X*10;

		super.Update();

	}
}
