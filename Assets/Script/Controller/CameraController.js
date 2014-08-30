#pragma strict

private static var instance : CameraController;
 
public static function Instance() : CameraController
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(CameraController) as CameraController;
    return instance;
}


var target:Transform;
private var start:float;
private var end:float;

var moveSpeed:float=5;
function Start () {

}

function SetClamp(_start:float,_end:float){
	start=_start;
	end=_end;
}

function Update () {
	if (target!=null){
		var ent:Entity=target.GetComponent(Entity) as Entity;
		transform.position.x+=(target.position.x+4*ent.GetFlipDir()-transform.position.x)*Time.deltaTime*moveSpeed;
	}

	transform.position.x=Mathf.Clamp(transform.position.x,start,end);
}