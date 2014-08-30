﻿#pragma strict

class Player extends Entity{
	var playerAnim:Animator;

	function Update(){
		var device:InputDevice=InputManager.ActiveDevice;

		
		if (Mathf.Abs(vel.x)>0){
			playerAnim.Play("Player_Walk");
		}
		else{
			playerAnim.Play("Player_Idle");
		}
		vel.x=device.Direction.X*10;

		super.Update();

	}
}
