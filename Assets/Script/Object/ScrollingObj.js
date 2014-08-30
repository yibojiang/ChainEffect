#pragma strict
var layer:ScrollingLayer;
var speed:float;
function Awake(){
	layer=this.gameObject.GetComponentInParent(ScrollingLayer) as ScrollingLayer;
}

function Start () {

}

function Update () {
	transform.position.x+=speed*Time.deltaTime;
	if (transform.position.x>layer.scene.loopRight){
		transform.position.x-=(layer.scene.loopRight-layer.scene.loopLeft);
	}

	if (transform.position.x<layer.scene.loopLeft){
		transform.position.x+=(layer.scene.loopRight-layer.scene.loopLeft);
	}
	
}