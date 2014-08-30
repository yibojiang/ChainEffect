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
var layers:ScrollingLayer[];

function Start () {

}

function SetClamp(_start:float,_end:float){
	start=_start;
	end=_end;
}

function LateUpdate () {
	if (target!=null){
		var ent:Entity=target.GetComponent(Entity) as Entity;
		//transform.position.x+=(target.position.x+4*ent.GetFlipDir()-transform.position.x)*Time.deltaTime*moveSpeed;

		var targetOffset:float=4*ent.GetFlipDir();
		var targetPos:float=target.transform.position.x+targetOffset;
		var xOffset:float=(targetPos-transform.position.x)*moveSpeed;
		
		transform.position.x+=xOffset*Time.deltaTime;
		
		var i:int;
		for (i=0;i<layers.Length;i++){
			layers[i].transform.position.x+=xOffset*(1-layers[i].speedFactor)*Time.deltaTime;
			//layers[i].transform.position.x=Mathf.Clamp(transform.position.x,start,end);
		}
	}

	transform.position.x=Mathf.Clamp(transform.position.x,start,end);
}