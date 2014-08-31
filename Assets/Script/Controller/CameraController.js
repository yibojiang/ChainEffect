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
var tDialog:TextMesh;
var rp:AlpacaSound.RetroPixel;


function Start () {

}

function PixelTo(_duration:float,_inFunc:Function,_afterFunc:Function){


	rp.enabled=true;
	var lerp:float=0;
	while (lerp<_duration){
		lerp+=Time.deltaTime;
		rp.horizontalResolution=Mathf.Lerp(100,10,lerp/_duration);
		rp.verticalResolution=Mathf.Lerp(100,10,lerp/_duration);
		yield WaitForEndOfFrame();
	}
	_inFunc();
	PixelOut(_duration,_afterFunc);
}

function PixelOut(_duration:float,_afterFunc:Function){
	var lerp:float=0;
	while (lerp<_duration){
		lerp+=Time.deltaTime;
		rp.horizontalResolution=Mathf.Lerp(10,100,lerp/_duration);
		rp.verticalResolution=Mathf.Lerp(10,100,lerp/_duration);
		yield WaitForEndOfFrame();
	}
	rp.enabled=false;
	_afterFunc();
}

function SetClamp(_start:float,_end:float){
	start=_start;
	end=_end;
}

function SetLayers(_scene:Scene){
	layers=_scene.gameObject.GetComponentsInChildren.<ScrollingLayer>(true);
}

function LateUpdate () {
	if (target!=null){
		var ent:Entity=target.GetComponent(Entity) as Entity;
		//transform.position.x+=(target.position.x+4*ent.GetFlipDir()-transform.position.x)*Time.deltaTime*moveSpeed;

		var targetOffset:float=2*ent.GetFlipDir();
		var targetPos:float=target.transform.position.x+targetOffset;
		var xOffset:float=(targetPos-transform.position.x)*moveSpeed;
		
		if (transform.position.x+xOffset*Time.deltaTime>start && transform.position.x+xOffset*Time.deltaTime<end){
			transform.position.x+=xOffset*Time.deltaTime;
			var i:int;
			for (i=0;i<layers.Length;i++){
				layers[i].transform.position.x+=xOffset*(1-layers[i].speedFactor)*Time.deltaTime;
				//layers[i].transform.position.x=Mathf.Clamp(transform.position.x,start,end);
			}	
		}
		
	}
	//transform.position.x=Mathf.Clamp(transform.position.x,start,end);
}
