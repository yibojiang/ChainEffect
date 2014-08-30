﻿#pragma strict
private static var instance : GameController;
 
public static function Instance() : GameController
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(GameController) as GameController;
    return instance;
}

var scenes:Scene[];
var player:Player;

function LoadScene(_scene:Scene){
	CameraController.Instance().SetClamp(_scene.start,_scene.end);
	CameraController.Instance().SetLayers(_scene);
	player.transform.position=_scene.bornTransform.position;
}

function Start () {
	LoadScene(scenes[0]);
}

function Update () {

}