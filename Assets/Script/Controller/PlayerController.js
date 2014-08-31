#pragma strict
import InControl;
private static var instance : PlayerController;
 
public static function Instance() : PlayerController
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(PlayerController) as PlayerController;
    return instance;
}

var player:Player;

function Start () {

}

function Update () {
	//var device:InputDevice=InputManager.ActiveDevice;

	
	/*
	if (device.Direction.LeftStickX ){

	}
	*/
}