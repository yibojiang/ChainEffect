#pragma strict
private static var instance : GameController;
 
public static function Instance() : GameController
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(GameController) as GameController;
    return instance;
}

var scenes:Scene[];
var player:Player;
var girl:Girl;

function LoadScene(_index:int){

	if(_index==0){

	}
	else if (_index==1){
		girl.anim.Play("Idle");
		girl.transform.position=scenes[_index].bornTransform.position+Vector3(-4,0,0);
		girl.SetDir(0);
	}
	else if (_index==2){
		
	}
	LoadScene(scenes[_index]);
}

function LoadScene(_scene:Scene){

	CameraController.Instance().SetClamp(_scene.start,_scene.end);
	CameraController.Instance().SetLayers(_scene);
	player.transform.position=_scene.bornTransform.position;
	CameraController.Instance().transform.position.y=_scene.transform.position.y+2;
}



function Start () {
	LoadScene(1);
}

function Update () {

}