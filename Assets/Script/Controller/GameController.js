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
var playerBoss:PlayerBoss;
var girl:Girl;

function LoadScene(_index:int){

	if(_index==0){
		CameraController.Instance().target=player.transform;
		CameraController.Instance().SetToTarget();
		player.gameObject.SetActive(true);
		playerBoss.gameObject.SetActive(false);
		player.transform.position=scenes[_index].bornTransform.position;
	}
	else if (_index==1){
		girl.anim.Play("Idle");
		girl.transform.position=scenes[_index].bornTransform.position+Vector3(-4,0,0);
		girl.SetDir(0);

		CameraController.Instance().target=player.transform;
		CameraController.Instance().SetToTarget();
		player.gameObject.SetActive(true);
		playerBoss.gameObject.SetActive(false);
		player.transform.position=scenes[_index].bornTransform.position;
	}
	else if (_index==2){
		CameraController.Instance().target=playerBoss.transform;
		CameraController.Instance().SetToTarget();
		player.gameObject.SetActive(false);
		playerBoss.gameObject.SetActive(true);
		playerBoss.transform.position=scenes[_index].bornTransform.position;
		playerBoss.SetDir(1);
	}
	else if (_index==3){
		CameraController.Instance().target=player.transform;
		CameraController.Instance().SetToTarget();
		player.gameObject.SetActive(true);
		playerBoss.gameObject.SetActive(false);
		player.transform.position=scenes[_index].bornTransform.position;
		player.withGirl=false;

		//AudioController.Instance().audio.clip=null;
	}

	LoadScene(scenes[_index]);
}

function LoadScene(_scene:Scene){

	CameraController.Instance().SetClamp(_scene.start,_scene.end);
	CameraController.Instance().SetLayers(_scene);
	
	CameraController.Instance().transform.position.y=_scene.transform.position.y+2;
}



function Start () {
	LoadScene(3);
}

function Update () {

}